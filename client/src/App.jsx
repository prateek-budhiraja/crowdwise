import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import CampaignPage from "./components/CampaignPage";
import StartACampaign from "./components/StartACampaign";
import axios from "axios";
import config from "./utils/constants.js";

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
	return (
		<>
			<BrowserRouter>
				<GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/start-a-campaign" element={<StartACampaign />} />
						<Route path="/c/:category" element={<CategoryPage />} />
						<Route path="/browse/:campaign_slug" element={<CampaignPage />} />
					</Routes>
				</GoogleOAuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
