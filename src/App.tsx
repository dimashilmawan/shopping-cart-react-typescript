import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import About from "./pages/About";
import Home from "./pages/Home";
import Store from "./pages/Store";

const App = () => {
	return (
		<ShoppingCartProvider>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route path="/about" element={<About />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</Routes>
			</main>
			<ShoppingCart />
		</ShoppingCartProvider>
	);
};
export default App;
