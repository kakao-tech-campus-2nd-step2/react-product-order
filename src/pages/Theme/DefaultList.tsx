import { useNavigate } from 'react-router-dom';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import type { ProductData } from '@/entities/Product';

export default ({ items }: { items: ProductData[] }) => {
    const navigate = useNavigate();
    return (
        <Container>
            <Grid columns={{ initial: 2, xs: 3, sm: 3, md: 4 }} gap={20}>
                {items.map((item) => (
                    <DefaultGoodsItems
                        key={item.id}
                        imageSrc={item.imageURL}
                        subtitle={item.brandInfo.name}
                        title={item.name}
                        amount={item.price.sellingPrice}
                        onClick={() => navigate(`/products/${item.id}`)}
                    />
                ))}
            </Grid>
        </Container>
    );
};
