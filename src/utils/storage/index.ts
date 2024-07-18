import type { ProductDetail, ProductOption } from '@/types';

interface StorageKey {
  authToken?: string;
  order?: OrderInfo | null;
}

interface OrderInfo {
  product: ProductDetail & { selectedOption: ProductOption | null; quantity: number };
}

export const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);
    return value ? JSON.parse(value) : null;
  };

  const set = (value: StorageKey[T]) => {
    if (value === undefined || value === null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderLocalStorage = initStorage('order', localStorage);
