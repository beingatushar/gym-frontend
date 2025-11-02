import React from 'react';
import { AddressFormState } from '../types/addressForm.types';

interface AddressFormProps {
  formState: AddressFormState;
  updateField: (field: keyof AddressFormState, value: string) => void;
  errors: Record<string, string>;
  isFetchingPincode: boolean;
  pincodeError: string;
}

const InputField: React.FC<{
  id: keyof AddressFormState;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
  readOnly?: boolean;
}> = ({ id, label, error, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      className={`w-full border px-4 py-2 rounded-md shadow-sm transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 ${
        error
          ? 'border-red-500 ring-1 ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary'
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const AddressForm: React.FC<AddressFormProps> = ({
  formState,
  updateField,
  errors,
  isFetchingPincode,
  pincodeError,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'mobile' || name === 'pincode') {
      processedValue = value.replace(/\D/g, ''); // Allow only digits
    }
    updateField(name as keyof AddressFormState, processedValue);
  };

  return (
    <div className="bg-white dark:bg-brand-dark-secondary shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-4">
        Shipping Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <InputField
            id="name"
            label="Full Name"
            value={formState.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            id="mobile"
            label="Mobile Number"
            value={formState.mobile}
            onChange={handleChange}
            error={errors.mobile}
            type="tel"
            maxLength={10}
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            id="houseNumber"
            label="House No., Building Name"
            value={formState.houseNumber}
            onChange={handleChange}
            error={errors.houseNumber}
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            id="area"
            label="Road Name, Area, Colony"
            value={formState.area}
            onChange={handleChange}
            error={errors.area}
          />
        </div>
        <div>
          <InputField
            id="pincode"
            label="Pincode"
            value={formState.pincode}
            onChange={handleChange}
            error={errors.pincode}
            maxLength={6}
          />
          {pincodeError && (
            <p className="text-red-500 text-xs mt-1">{pincodeError}</p>
          )}
          {isFetchingPincode && (
            <p className="text-gray-500 text-xs mt-1">Fetching details...</p>
          )}
        </div>
        <div>
          <InputField
            id="city"
            label="City"
            value={formState.city}
            onChange={handleChange}
            error={errors.city}
            readOnly={isFetchingPincode || !!formState.city}
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            id="state"
            label="State"
            value={formState.state}
            onChange={handleChange}
            error={errors.state}
            readOnly={isFetchingPincode || !!formState.state}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
