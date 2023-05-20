import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import CampaignPage from "./components/CampaignPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_clientId}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/c/:category" element={<CategoryPage />} />
						<Route path="/browse/:campaign_slug" element={<CampaignPage />} />
					</Routes>
				</GoogleOAuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
