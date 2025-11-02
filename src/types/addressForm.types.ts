export interface AddressFormState {
  name: string;
  mobile: string;
  houseNumber: string;
  area: string;
  pincode: string;
  city: string;
  state: string;
}

export interface AddressFormProps {
  formState: AddressFormState;
  updateField: (field: keyof AddressFormState, value: string) => void;
  errors: Record<string, string>;
}
