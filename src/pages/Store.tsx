import StoreItem from "../components/StoreItem";
import storeItems from "../data/items.json";

const Store = () => {
	return (
		<div className="p-4 pb-10  text-2xl font-semibold">
			<h1>Store</h1>
			<div className="mt-2 grid grid-cols-1  gap-5 sm:grid-cols-2">
				{storeItems.map(item => {
					return <StoreItem {...item} key={item.id} />;
				})}
			</div>
		</div>
	);
};
export default Store;
