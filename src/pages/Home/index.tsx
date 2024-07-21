import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchInstance } from '@/api/instance';
import { Spacing } from '@/components/common/layouts/Spacing';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner';
import { GoodsRankingSection } from '@/components/features/Home/GoodsRankingSection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner';
import { ThemeCategorySection } from '@/components/features/Home/ThemeCategorySection';

import { getDynamicPath } from '../../routes/path';
import type { GoodsData } from '../../types';

export const HomePage = () => {
  const [products, setProducts] = useState<GoodsData[]>([]);

  useEffect(() => {
    fetchInstance.get('/products')
      .then(response => {
        console.log('Fetched products:', response.data.products);
        setProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <SelectFriendsBanner />
      <ThemeCategorySection />
      <AiDiscoveryBanner />
      <Spacing
        height={{
          initial: 40,
          sm: 80,
          md: 120,
        }}
      />
      <GoodsRankingSection />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {products.map((product) => (
          <Link key={product.id} to={getDynamicPath.productDetail(product.id.toString())}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              _hover={{ cursor: 'pointer' }}
            >
              <Image src={product.imageURL} alt={product.name} />
              <Box p="6">
                <Text fontWeight="bold" as="h4" lineHeight="tight">
                  {product.name}
                </Text>
                <Text>{product.price.sellingPrice}원</Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default HomePage;
