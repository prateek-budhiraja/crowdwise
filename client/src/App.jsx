import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";

function App() {
	return (
		<>
			<BrowserRouter>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_clientId}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</GoogleOAuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
