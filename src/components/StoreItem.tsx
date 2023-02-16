import { BsTrash } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCartContext } from "../context/ShoppingCartContext";

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCartContext();
	const quantity = getItemQuantity(id);
	return (
		<div className="overflow-hidden rounded-md bg-gray-200 bg-opacity-5 shadow-md ">
			<img
				src={imgUrl}
				alt={name}
				className="aspect-video w-full object-cover"
			/>
			<div className=" p-2 pt-1">
				<div className="flex items-baseline justify-between ">
					<h3 className="text-lg text-gray-800">{name}</h3>
					<p className="text-sm text-gray-600">{formatCurrency(price)}</p>
				</div>
				<div className="mt-3">
					{quantity === 0 ? (
						<button
							onClick={() => increaseCartQuantity(id)}
							className="w-full rounded-md bg-indigo-500 p-1 text-base font-semibold text-gray-100 hover:bg-opacity-90"
						>
							+ Add to Cart
						</button>
					) : (
						<div className="flex flex-col items-center justify-center gap-3 text-lg">
							<div className="flex items-center gap-3 ">
								<button
									onClick={() => increaseCartQuantity(id)}
									className="rounded-sm bg-indigo-500 p-[0.375rem] text-base text-gray-100 ring-2 ring-indigo-500 "
								>
									<AiOutlinePlus />
								</button>
								<span>{quantity} in the Cart </span>
								<button
									onClick={() => decreaseCartQuantity(id)}
									className="rounded-sm p-[0.375rem]  ring-2 ring-gray-400 "
								>
									<AiOutlineMinus />
								</button>
							</div>
							<button
								onClick={() => removeFromCart(id)}
								className=" flex items-center gap-2 rounded-sm bg-red-500 p-[0.375rem] py-1 text-gray-200 ring-2 ring-red-500"
							>
								<BsTrash /> <span className="text-sm">Remove</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default StoreItem;
