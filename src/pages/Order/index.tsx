import { Navigate, useLocation } from "react-router-dom";

import { RouterPath } from "@/routes/path";

export const OrderPage = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) return <Navigate to={RouterPath.notFound} />;
  return <>주문 페이지</>;
};
