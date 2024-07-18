import { Flex } from '@chakra-ui/react';

import ItemCount from './section2/ItemCount';
import Price from './section2/Price';

export default function Section2() {
  return (
    <Flex p="30px 12px 30px 30px" h="100%" flexDirection="column" justifyContent="space-between">
      <ItemCount />
      <Price />
    </Flex>
  );
}
