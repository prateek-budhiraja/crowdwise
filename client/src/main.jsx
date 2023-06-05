import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Toaster
			position="top-right"
			toastOptions={{
				className:
					"bg-gray-300 text-black p-2 border-1 border-gray-400 rounded-full",
			}}
		/>
		<App />
	</>
);
