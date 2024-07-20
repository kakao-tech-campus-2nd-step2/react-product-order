import { Box, Text, Textarea } from '@chakra-ui/react';
import type React from 'react';

type Props = {
    message: string;
    setMessage: (value: string) => void;
}

const MessageArea: React.FC<Props> = ({message, setMessage}) => {
    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };
    return (
        <Box>
            <Text fontSize="lg" mb={2} textAlign="center" margin="30px" width="100%">
                나에게 주는 선물
            </Text>
            <Textarea value={message} onChange={handleChange} borderRadius="10px" bgColor="skyblue" placeholder="선물과 함께 보낼 메시지를 적어보세요"/>
        </Box>
    );
};

export default MessageArea;
