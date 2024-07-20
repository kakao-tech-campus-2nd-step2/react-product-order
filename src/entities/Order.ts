export interface OrderReq {
    productId: number;
    productOptionId: number;    
    productQuantity: number;
    messageCardTemplateId: number;
    messageCardMessage: string;
    senderId: number
    receiverId: number;
    hasCashReceipt: boolean;
    cashReceiptType?: string;
    cashReceiptNumber?: string;
}
export interface OrderHistory {
    productId: number;
    productQuantity: number;
}