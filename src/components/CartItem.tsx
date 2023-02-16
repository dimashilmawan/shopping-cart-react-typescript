import { GrClose } from "react-icons/gr";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

type CartItemProps = {
	id: number;
	quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
	const { removeFromCart } = useShoppingCartContext();
	const item = storeItems.find(item => item.id === id);
	if (item == null) return null;
	return (
		<div className="flex items-center gap-3  px-4">
			<div>
				<img
					src={item.imgUrl}
					alt={item.name}
					className="h-20 w-36 rounded-md object-cover"
				/>
			</div>
			<div>
				<div className="flex items-baseline gap-1">
					<h3
						className="text-lg font-semibold text-gray-800
				"
					>
						{item.name}
					</h3>
					<span className="text-sm font-normal text-gray-600">x{quantity}</span>
				</div>
				<p className="text-sm text-gray-700">{formatCurrency(item.price)}</p>
			</div>
			<div className="flex flex-1 items-center justify-end gap-2">
				<p>{formatCurrency(quantity * item.price)}</p>
				<button
					className="grid h-6 w-6 place-items-center rounded-sm ring-1 ring-gray-500"
					onClick={e => {
						e.stopPropagation();
						removeFromCart(id);
					}}
				>
					<GrClose />
				</button>
			</div>
		</div>
	);
};
export default CartItem;
