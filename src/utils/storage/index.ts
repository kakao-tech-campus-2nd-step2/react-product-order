import type { ProductDetail, ProductOption } from '@/types';

interface StorageKey {
  authToken?: string | null;
  order?: OrderInfo | null;
}

interface OrderInfo {
  product: ProductDetail & { selectedOption: ProductOption | null; quantity: number };
}

const isStorageAvailable = (storage: Storage) => {
  try {
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;
  const isAvailable = isStorageAvailable(storage);

  const get = (): StorageKey[T] | null => {
    if (!isAvailable) {
      console.warn(`Storage is not available. Returning default value for key: ${storageKey}`);
      return null;
    }

    const value = storage.getItem(storageKey);
    if (value) {
      try {
        return JSON.parse(value) as StorageKey[T];
      } catch (e) {
        console.error(`Error parsing JSON for key: ${storageKey}`, e);
        return null;
      }
    }
    return null;
  };

  const set = (value: StorageKey[T] | null) => {
    if (!isAvailable) {
      console.warn(`Storage is not available. Cannot set value for key: ${storageKey}`);
      return;
    }

    if (value === null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);
    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderLocalStorage = initStorage('order', localStorage);
