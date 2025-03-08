import { create } from 'zustand';
import { Address } from '@/interfaces';

type FormStore = {
  submitForm: (() => void) | null;
  setSubmitForm: (submitFn: () => void) => void;
  isFormValid: boolean;
  setIsFormValid: (isValid: boolean) => void;
  address: Address | null;
  setAddress: (address: Address) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  setSubmitForm: (submitFn) => set({ submitForm: submitFn }),
  setIsFormValid: (isValid) => set({ isFormValid: isValid }),
  submitForm: null,
  isFormValid: false,
  address: null,
  setAddress: (address) => set({ address }),
}));
