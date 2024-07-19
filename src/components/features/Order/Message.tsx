// import { forwardRef, ForwardedRef } from 'react';
// import { Box, Text, Textarea } from '@chakra-ui/react';

// const MessageArea = forwardRef(( ref: ForwardedRef<HTMLTextAreaElement>)=> {
//     return (
//         <Box>
//             <Text fontSize="lg" mb={2} textAlign="center" margin="30px" width="100%">
//                 나에게 주는 선물
//             </Text>
//             <Textarea ref={ref} borderRadius="10px" bgColor="skyblue" placeholder="선물과 함께 보낼 메시지를 적어보세요" />
//         </Box>
//     );
// });

// export default MessageArea;

import type { TextareaProps } from '@chakra-ui/react';
import { Box, Text, Textarea } from '@chakra-ui/react';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

const MessageArea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <Box>
            <Text fontSize="lg" mb={2} textAlign="center" margin="30px" width="100%">
                나에게 주는 선물
            </Text>
            <Textarea ref={ref} borderRadius="10px" bgColor="skyblue" placeholder="선물과 함께 보낼 메시지를 적어보세요" {...props} />
        </Box>
    );
});

export default MessageArea;
