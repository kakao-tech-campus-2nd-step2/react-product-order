import { useParams } from 'react-router-dom';

export const ProductsPage = () => {
  const { productsId = '' } = useParams<{ productsId: string }>();

  return (
    <div>
      <h1>Products {productsId}</h1>
    </div>
  );
};
