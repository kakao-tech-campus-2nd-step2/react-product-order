import { useLocation } from "react-router-dom";

export const useProductId = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  return Number(productId);
};