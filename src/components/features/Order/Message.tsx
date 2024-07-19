import { Box, Text, Textarea } from '@chakra-ui/react';
import { useRef } from 'react';

const MessageArea = () => {
    const messageRef = useRef(null);

    return (
        <Box>
            <Text fontSize="lg" 
            mb={2} 
            textAlign="center"
            margin="30px"
            width="100%"
            >나에게 주는 선물</Text>
            <Textarea ref={messageRef} borderRadius="10px" bgColor="skyblue" placeholder="선물과 함께 보낼 메시지를 적어보세요" />
        </Box>
    );
};

export default MessageArea;
