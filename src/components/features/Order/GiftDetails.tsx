import { HStack, Image, Text, VStack } from '@chakra-ui/react';

interface GiftDetailsProps {
  imageURL: string;
  name: string;
  brandName: string;
}

export const GiftDetails = ({ imageURL, name, brandName }: GiftDetailsProps) => (
  <>
    <Text w="100%" fontSize="15px" fontWeight="bold">
      선물내역
    </Text>
    <VStack
      w="100%"
      align="flex-start"
      border="1px"
      borderColor="gray.100"
      borderRadius="12px"
      p="20px"
    >
      <HStack align="top">
        <Image
          src={imageURL}
          alt="test"
          boxSize="100px"
          border="1px"
          borderColor="gray.100"
          borderRadius="12px"
        />
        <VStack w="100%" textAlign="left">
          <Text w="100%" fontSize="13px" fontWeight="bold" color="gray.500">
            {brandName}
          </Text>
          <Text fontSize="14px">{name}</Text>
        </VStack>
      </HStack>
    </VStack>
  </>
);
