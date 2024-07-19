import { useFormContext } from 'react-hook-form';

import type { FormData } from '@/types';

export const useOrderFormContext = useFormContext<FormData>;
