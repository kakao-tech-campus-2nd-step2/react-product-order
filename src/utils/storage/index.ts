const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string);
  };
  const set = (value: StorageKey[T]) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  const remove = () => {
    storage.removeItem(storageKey);
  };
  return { get, set, remove };
};

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderLocalStorage = initStorage('order', localStorage);

interface StorageKey {
  authToken?: string;
  order?: Order;
}

type Order = {
  productId: string;
  count: number;
};
