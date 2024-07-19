const API_BASE = '/api/v1';

export const PRODUCTS_PATHS = {
  PRODUCTS_DETAIL: (productId: string) => `${API_BASE}/products/${productId}/detail`,
};
