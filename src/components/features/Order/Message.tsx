import { Box, Text, Textarea } from '@chakra-ui/react';
import React from 'react';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageArea: React.FC<Props> = ({ value, onChange }) => {
    return (
        <Box>
            <Text fontSize="lg" mb={2} textAlign="center" margin="30px" width="100%">
                나에게 주는 선물
            </Text>
            <Textarea
                value={value}
                onChange={onChange}
                borderRadius="10px"
                bgColor="skyblue"
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
            />
        </Box>
    );
};

export default MessageArea;
