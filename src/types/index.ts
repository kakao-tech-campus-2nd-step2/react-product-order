import type { UseFormReturn } from 'react-hook-form';

export type ThemeData = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
  imageURL: string;
};

export type RankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GoodsData = {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export type ProductParams = {
  id: string;
};

export type DetailData = {
  brandInfo: { name: string };
  name: string;
  imageURL: string;
  price: { sellingPrice: number };
};

export type goodsDetailData = {
  price: number;
  imageURL?: string;
  name?: string;
  brandName?: string;
  amount?: number;
  limit?: number;
};

export type productInfoProps = {
  productInfo?: goodsDetailData;
};

export type FormValues = {
  message: string;
  isReceiptChecked: boolean;
  receiptType: 'personal' | 'business';
  receiptNumber: string;
};

export type formProps = {
  methods: UseFormReturn<FormValues>;
};