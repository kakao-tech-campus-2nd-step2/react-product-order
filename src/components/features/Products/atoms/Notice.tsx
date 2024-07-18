import { Text } from '@chakra-ui/react';

export interface INotice {
  notice: string;
}

export const Notice = ({ notice }: INotice) => (
  <Text p="24px 12px" fontSize="14px" fontWeight="700" color="#111">
    {notice}
  </Text>
);
