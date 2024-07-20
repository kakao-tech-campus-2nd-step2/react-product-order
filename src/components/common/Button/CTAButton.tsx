import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

interface Props extends ButtonProps {
  text: string;
  textColor: string;
  background: string;
}

export const CTAButton = ({ text, textColor, background, type = 'button', ...rest }: Props) => {
  return (
    <Button w="100%" bg={background} color={textColor} type={type} {...rest}>
      {text}
    </Button>
  );
};
