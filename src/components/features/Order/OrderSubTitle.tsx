import { Box } from '@chakra-ui/react';

export interface IOrderSubTitle {
  subtitle: string;
}

export const OrderSubTitle = ({ subtitle }: IOrderSubTitle) => (
  <Box
    as="span"
    fontSize="18px"
    lineHeight="21px"
    color="#222"
    fontWeight="700"
    display="block"
    textAlign="center"
  >
    {subtitle}
  </Box>
);
