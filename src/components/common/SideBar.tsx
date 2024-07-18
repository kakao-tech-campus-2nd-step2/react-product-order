import { Box } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import { HEADER_HEIGHT } from '@/components/features/Layout/Header';

export interface IAside {
  children: ReactElement;
}

export const Sidebar = ({ children }: IAside) => (
  <Box
    as="aside"
    display={{ base: 'none', sm: 'block' }}
    position="sticky"
    top={HEADER_HEIGHT}
    width="100%"
    maxWidth="360px"
    height={`calc(100vh - ${HEADER_HEIGHT})`}
  >
    {children}
  </Box>
);
