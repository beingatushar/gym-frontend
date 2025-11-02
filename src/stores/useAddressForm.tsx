import { useState, useCallback, useEffect } from 'react';
import { AddressFormState } from '../types/addressForm.types';

export const useAddressForm = () => {
  const [formState, setFormState] = useState<AddressFormState>({
    name: '',
    mobile: '',
    houseNumber: '',
    area: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const updateField = useCallback(
    (field: keyof AddressFormState, value: string) => {
      setFormState((prevState) => ({ ...prevState, [field]: value }));
      if (errors[field]) {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
      }
    },
    [errors]
  );

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required.';
    if (!/^\d{10}$/.test(formState.mobile))
      newErrors.mobile = 'Enter a valid 10-digit number.';
    if (!formState.houseNumber.trim())
      newErrors.houseNumber = 'House number is required.';
    if (!formState.area.trim()) newErrors.area = 'Area is required.';
    if (!/^\d{6}$/.test(formState.pincode))
      newErrors.pincode = 'Pincode must be 6 digits.';
    if (!formState.city.trim()) newErrors.city = 'City is required.';
    if (!formState.state.trim()) newErrors.state = 'State is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (formState.pincode.length !== 6) {
        if (formState.city || formState.state) {
          updateField('city', '');
          updateField('state', '');
        }
        return;
      }

      setIsFetchingPincode(true);
      setPincodeError('');

      try {
        const response = await fetch(
          `${import.meta.env.VITE_PINCODE_API_URL}/${formState.pincode}`
        );
        const data = await response.json();

        if (data[0].Status === 'Success' && data[0].PostOffice) {
          const firstPostOffice = data[0].PostOffice[0];
          updateField(
            'city',
            firstPostOffice.Block || firstPostOffice.District
          );
          updateField('state', firstPostOffice.State);
        } else {
          setPincodeError('Invalid pincode or no data found');
          updateField('city', '');
          updateField('state', '');
        }
      } catch (error) {
        console.error('Error fetching pincode details:', error);
        setPincodeError('Failed to fetch pincode details');
        updateField('city', '');
        updateField('state', '');
      } finally {
        setIsFetchingPincode(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchPincodeDetails();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [formState.pincode, updateField]);

  return {
    formState,
    errors,
    updateField,
    validate,
    isFetchingPincode,
    pincodeError,
  };
};
