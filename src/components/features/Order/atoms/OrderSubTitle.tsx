import { Box } from '@chakra-ui/react';
import type { Property } from 'csstype';

export interface IOrderSubTitle {
  subtitle: string;
  textAlign?: Property.TextAlign;
}

export const OrderSubTitle = ({ subtitle, textAlign = 'center' }: IOrderSubTitle) => (
  <Box
    as="span"
    fontSize="18px"
    lineHeight="21px"
    color="#222"
    fontWeight="700"
    display="block"
    width="100%"
    textAlign={textAlign}
  >
    {subtitle}
  </Box>
);
