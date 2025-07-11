import { createContext, useReducer, ReactNode } from "react";

import { CartItemInterface } from "../types/models";

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItemInterface, "quantity"> }
  | { type: "REMOVE_ITEM"; id: string };

type CartState = {
  items: CartItemInterface[];
};

type CartContextType = {
  items: CartItemInterface[];
  addItem: (item: Omit<CartItemInterface, "quantity">) => void;
  removeItem: (id: string) => void;
};

const defaultContext: CartContextType = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
};

export const CartContext = createContext<CartContextType>(defaultContext);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItems = [...state.items];

      if (existingCartItemIndex > -1) {
        const existingItem = updatedItems[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        if (existingItem.quantity > 1) {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          const updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
          return { ...state, items: updatedItems };
        } else {
          const updatedItems = state.items.filter(
            (item) => item.id !== action.id
          );
          return { ...state, items: updatedItems };
        }
      }

      return state;
    }

    default:
      return state;
  }
}


type Props = {
  children: ReactNode;
};

export function CartContextProvider({ children }: Props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item: Omit<CartItemInterface, "quantity">) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItem = (id: string) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const contextValue: CartContextType = {
    items: cartState.items,
    addItem,
    removeItem,
  };


  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
