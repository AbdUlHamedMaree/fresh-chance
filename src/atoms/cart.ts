import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai/vanilla';

export type CartItem = {
  id: string;
  quantity: number;
};

export const cartAtom = atomWithStorage<CartItem[]>('cart', []);
export const cartItemsCountAtom = atom(get => {
  const items = get(cartAtom);
  return items.reduce((acc, item) => acc + item.quantity, 0);
});

export const insertProductIdToCartAtom = atom(null, (get, set, productId: string) => {
  const items = get(cartAtom);
  const existingItem = items.find(item => item.id === productId);
  if (existingItem) {
    set(
      cartAtom,
      items.map(item => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  } else {
    set(cartAtom, [...items, { id: productId, quantity: 1 }]);
  }
});

export const setProductQuantityInCartAtom = atom(null, (get, set, productId: string, quantity: number) => {
  const items = get(cartAtom);
  const existingItem = items.find(item => item.id === productId);
  if (existingItem) {
    set(
      cartAtom,
      items.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  } else {
    set(cartAtom, [...items, { id: productId, quantity: quantity }]);
  }
});

export const increaseProductQuantityInCartAtom = atom(null, (get, set, productId: string, by: number = 1) => {
  const items = get(cartAtom);
  const existingItem = items.find(item => item.id === productId);
  if (existingItem) {
    set(
      cartAtom,
      items.map(item => (item.id === productId ? { ...item, quantity: item.quantity + by } : item))
    );
  } else {
    set(cartAtom, [...items, { id: productId, quantity: by }]);
  }
});
export const decreaseProductQuantityInCartAtom = atom(null, (get, set, productId: string, by: number = 1) => {
  const items = get(cartAtom);
  const existingItem = items.find(item => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity - by <= 0) {
      set(
        cartAtom,
        items.filter(item => item.id !== productId)
      );
    } else {
      set(
        cartAtom,
        items.map(item => (item.id === productId ? { ...item, quantity: item.quantity - by } : item))
      );
    }
  }
});

export const removeProductFromCartAtom = atom(null, (get, set, productId: string) => {
  const items = get(cartAtom);
  const existingItem = items.find(item => item.id === productId);
  if (existingItem) {
    set(
      cartAtom,
      items.filter(item => item.id !== productId)
    );
  }
});
