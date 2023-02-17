import { useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

const ShoppingCart = () => {
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const { cartIsOpen, closeCart, cartItems } = useShoppingCartContext();

	useEffect(() => {
		const closeShoppingCart = (e: any) => {
			if (!cartIsOpen) return;
			// const buttonCartEl = e.target.closest("#button-cart");
			if (sidebarRef?.current && !sidebarRef.current.contains(e.target))
				closeCart();

			// const sidebarEl = e.target.closest("#sidebar");
			// if (!sidebarEl && !buttonCart) closeCart()
		};

		document.addEventListener("click", closeShoppingCart);

		return () => document.removeEventListener("click", closeShoppingCart);
	}, [cartIsOpen]);

	// useEffect(() => {
	// 	const closeShoppingCart = (e: MouseEvent) => {
	// 		if (!cartIsOpen) return;
	// 		if (
	// 			sidebarRef?.current &&
	// 			!sidebarRef.current.contains(e.target as Element)
	// 		)
	// 			closeCart();
	// 	};

	// 	document.addEventListener("click", closeShoppingCart);

	// 	return () => document.removeEventListener("click", closeShoppingCart);
	// }, [cartIsOpen]);

	return (
		<aside
			ref={sidebarRef}
			id="sidebar"
			className={`eas fixed top-0 h-screen w-2/3 bg-gray-200 bg-opacity-90 backdrop-blur-md transition-all ease-out
			 ${cartIsOpen && cartItems.length > 0 ? "right-0 " : "-right-full"}`}
		>
			<div
				className="sticky top-0 flex h-[4.5rem] items-center justify-between  p-4
			"
			>
				<h2 className="text-xl font-semibold text-gray-800">Cart</h2>
				<button onClick={closeCart} className="text-2xl text-gray-600">
					<GrClose />
				</button>
			</div>
			<div className="flex flex-col gap-4">
				{cartItems.map(item => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			<p className="mt-4 mr-4 text-right text-xl font-semibold text-gray-800">
				{formatCurrency(
					cartItems.reduce((total, cartItem) => {
						const item = storeItems.find(i => i.id === cartItem.id);
						return total + (item?.price || 0) * cartItem.quantity;
					}, 0)
				)}
			</p>
		</aside>
	);
};
export default ShoppingCart;
