import { Heading } from '@chakra-ui/react';

export interface ITitle {
  title: string;
}

export const Name = ({ title }: ITitle) => (
  <Heading
    as="h2"
    pt="24px"
    fontSize="24px"
    lineHeight="33px"
    color="#111"
    fontWeight="400"
    wordBreak="break-all"
  >
    {title}
  </Heading>
);
