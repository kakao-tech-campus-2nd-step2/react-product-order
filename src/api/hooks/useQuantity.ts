import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';

type UseQuantityParams = {
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
};

export const useQuantity = ({ watch, setValue }: UseQuantityParams) => {
  const quantity = watch('quantity');

  const handleIncrement = () => {
    setValue('quantity', quantity + 1);
  };

  const handleDecrement = () => {
    setValue('quantity', quantity > 1 ? quantity - 1 : 1);
  };

  return {
    quantity,
    handleIncrement,
    handleDecrement,
  };
};
