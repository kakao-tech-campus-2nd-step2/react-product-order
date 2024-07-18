import { Flex } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { Sidebar } from '@/components/features/Products/SideBar';

export interface IProductOrderTemplate {
  leftMain: ReactElement;
  rightSide: ReactElement;
}

export const ProductOrderTemplate = ({ leftMain, rightSide }: IProductOrderTemplate) => {
  return (
    <Container maxWidth="1280px" flexDirection="row">
      <Flex maxWidth="900px">{leftMain}</Flex>
      <Sidebar>{rightSide}</Sidebar>
    </Container>
  );
};
