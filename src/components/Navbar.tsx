import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useShoppingCartContext } from "../context/ShoppingCartContext";

const Navbar = () => {
	const { cartQuantity, openCart } = useShoppingCartContext();
	return (
		<header className="sticky top-0">
			<nav className="flex h-[4.5rem] items-center bg-gray-100 px-4 py-2 shadow-md">
				<ul className="flex flex-1 items-center gap-4">
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/store">Store</NavLink>
					</li>
					<li>
						<NavLink to="/about">About</NavLink>
					</li>
				</ul>
				{cartQuantity > 0 && (
					<button
						id="button-cart"
						onClick={e => {
							e.stopPropagation();
							openCart();
						}}
						className="group relative flex h-11 w-11 items-center justify-center rounded-full outline-none ring-1 ring-indigo-500 transition-all hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-300"
					>
						<BsCart4 className="text-xl text-indigo-500 group-hover:text-gray-100" />
						<span className="absolute bottom-0 right-0 flex h-[1.125rem] w-[1.125rem] translate-y-1 translate-x-1 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-gray-100 ring-1 ring-gray-100">
							{cartQuantity}
						</span>
					</button>
				)}
			</nav>
		</header>
	);
};
export default Navbar;
