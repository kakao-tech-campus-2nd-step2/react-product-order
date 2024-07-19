import { Button } from '@chakra-ui/react';

export interface IPreReceiptButton {
  onClick: () => void;
}

export const PreReceiptButton = ({ onClick }: IPreReceiptButton) => (
  <Button
    padding={'0'}
    width="100%"
    backgroundColor="rgb(17, 17, 17)"
    colorScheme="blackAlpha"
    size="lg"
    onClick={onClick}
  >
    나에게 선물하기
  </Button>
);
