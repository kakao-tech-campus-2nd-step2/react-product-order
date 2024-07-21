import { fetchInstance } from '../instance';
import API from '../path';

export interface OrderRequestBody {
  productId: string;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber: string;
}

export const postOrder = async (body: OrderRequestBody) => {
  const response = await fetchInstance.post(API.ORDER.POST_ORDER, body);
  return response.data;
};
