import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
	return (
		<>
			<BrowserRouter>
				{/* <Nav /> */}
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_clientId}>
					<Routes>
						<Route path="/login" element={<Login />} />
					</Routes>
				</GoogleOAuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
