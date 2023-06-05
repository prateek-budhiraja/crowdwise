import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
	<div>
		<Toaster
			position="top-right"
			reverseOrder={false}
			toastOptions={{
				className:
					"bg-gray-300 text-black p-2 border-1 border-gray-400 rounded-full",
			}}
		/>
		<App />
	</div>
);
