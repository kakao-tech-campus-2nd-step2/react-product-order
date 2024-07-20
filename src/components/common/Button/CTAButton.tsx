import { Button } from '@chakra-ui/react';

interface Props {
  onClick: () => void;
  text: string;
  textColor: string;
  background: string;
}

export const CTAButton = ({ onClick, text, textColor, background }: Props) => {
  return (
    <Button w="100%" bg={background} color={textColor} onClick={onClick}>
      {text}
    </Button>
  );
};
