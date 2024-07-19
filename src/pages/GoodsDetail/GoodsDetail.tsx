
import { Container } from "@chakra-ui/react";

import GoodsInfo from "@/components/features/GoodsDetail/GoodsInfo";
import SideBar from "@/components/features/GoodsDetail/SideBar/SideBar";

export default function GoodsDetail() {
  return (
    <Container display="flex" flexDirection="row" justifyContent="center">
      <GoodsInfo/>
      <SideBar/>
    </Container>
  )
}
