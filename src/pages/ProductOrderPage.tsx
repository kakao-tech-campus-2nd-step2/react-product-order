import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Paths from '@constants/Paths';

function ProductOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [location.state, navigate]);

  return <div />;
}

export default ProductOrderPage;
