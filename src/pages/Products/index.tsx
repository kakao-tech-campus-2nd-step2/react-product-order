import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { RouterPath } from "@/routes/path";

export const ProductsPage =() => {
  const navigate = useNavigate();

  const handleGiftMe = () => {
    const authtoken = sessionStorage.getItem('authToken');

    if (!authtoken) navigate(RouterPath.login);
  };
  return (
    <Box>
      <Button onClick={handleGiftMe}>나에게 선물하기</Button>
    </Box>
  )
}