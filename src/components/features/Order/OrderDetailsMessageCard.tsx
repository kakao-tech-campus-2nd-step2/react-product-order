import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

type Props = {
  formData: {
    message: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
};

export const OrderDetailsMessageCard = ({ formData, onChange }: Props) => {
  return (
    <Wrapper>
      <Title>나에게 주는 선물</Title>
      <TextWrapper>
        <StyledTextarea
          name="message"
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          value={formData.message}
          onChange={onChange}
        />
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 14px 30px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-left: 280px;
`;
const TextWrapper = styled.div`
  width: 100%;
  padding: 12px 30px 16px;
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 100px;
  padding: 20px;
  resize: none;
  variant: filled;
  colorscheme: gray;
  border-radius: 20px;
  background-color: #edf2f7;
`;

export default OrderDetailsMessageCard;
