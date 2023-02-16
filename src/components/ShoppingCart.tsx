import { GrClose } from "react-icons/gr";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";

const ShoppingCart = () => {
	const { cartIsOpen, closeCart, cartItems } = useShoppingCartContext();
	return (
		<div
			className={`fixed top-0 h-screen w-2/3 bg-gray-200 bg-opacity-95 transition-all
			 ${cartIsOpen ? "right-0" : "-right-full"}`}
		>
			<header
				className="sticky top-0 flex h-[4.5rem] items-center justify-between  p-4
			"
			>
				<h2 className="text-xl font-semibold text-gray-800">Cart</h2>
				<button onClick={closeCart} className="text-2xl text-gray-600">
					<GrClose />
				</button>
			</header>
			<main>
				{cartItems.map(item => {
					return <CartItem key={item.id} />;
				})}
			</main>
		</div>
	);
};
export default ShoppingCart;
