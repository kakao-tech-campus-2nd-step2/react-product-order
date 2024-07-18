import { Flex } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { HEADER_HEIGHT } from '@/components/features/Layout/Header';
import { Sidebar } from '@/components/features/Products/SideBar';

export interface IProductOrderTemplate {
  leftMain: ReactElement;
  rightSide: ReactElement;
}

export const ProductTemplate = ({ leftMain, rightSide }: IProductOrderTemplate) => {
  return (
    <Container maxWidth="1280px" flexDirection="row">
      <Flex maxWidth="900px" width="100%" height={`calc(100vh - ${HEADER_HEIGHT})`}>
        {leftMain}
      </Flex>
      <Sidebar>{rightSide}</Sidebar>
    </Container>
  );
};
