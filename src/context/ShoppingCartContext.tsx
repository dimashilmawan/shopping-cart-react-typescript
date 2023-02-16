import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type CartItem = {
	id: number;
	quantity: number;
};

type ShoppingCartContextObj = {
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	openCart: () => void;
	closeCart: () => void;
	cartIsOpen: boolean;
	cartItems: CartItem[];
	cartQuantity: number;
};

type ShoppingCartProviderProps = {
	children: ReactNode;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextObj);

export const useShoppingCartContext = () => {
	return useContext(ShoppingCartContext);
};

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);

	const cartQuantity = cartItems.reduce((quantity, items) => {
		return items.quantity + quantity;
	}, 0);

	const openCart = () => setCartIsOpen(true);
	const closeCart = () => setCartIsOpen(false);

	const getItemQuantity = (id: number) => {
		return cartItems.find(item => item.id === id)?.quantity || 0;
	};

	const increaseCartQuantity = (id: number) => {
		setCartItems(currCartItems => {
			if (currCartItems.find(item => item.id === id) == null) {
				return [...currCartItems, { id, quantity: 1 }];
			} else {
				return currCartItems.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseCartQuantity = (id: number) => {
		setCartItems(currCartItems => {
			if (currCartItems.find(item => item.id === id)?.quantity === 1) {
				return currCartItems.filter(item => item.id !== id);
			} else {
				return currCartItems.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems(currCartItems => {
			return currCartItems.filter(item => item.id !== id);
		});
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				cartItems,
				cartQuantity,
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				openCart,
				closeCart,
				cartIsOpen,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};

export default ShoppingCartProvider;
