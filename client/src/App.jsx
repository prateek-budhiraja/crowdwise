import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import CampaignPage from "./components/CampaignPage";
import StartACampaign from "./components/StartACampaign";
import axios from "axios";
import config from "./utils/constants.js";
import { UserContext } from "./context/UserContext";
import { CampaignContext } from "./context/CampaignContext";
import { useEffect, useMemo, useState } from "react";
import Browse from "./components/Browse";
import PaymentSuccessful from "./components/PaymentSuccessful";
import CampaignSuccessful from "./components/CampaignSuccessful";
import Profile from "./components/Profile";
import Verification from "./components/Verification";

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
	const [user, setUser] = useState(null);
	const [campaigns, setCampaigns] = useState([]);

	const authValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	const campaignValue = useMemo(
		() => ({ campaigns, setCampaigns }),
		[campaigns, setCampaigns]
	);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axios.post("/api/auth/validate");
				if (data?.success) {
					setUser(data?.user);
				}
			} catch (error) {
				console.log("Not Logged in!");
			}
		};

		fetchUser();
	}, []);

	return (
		<>
			<BrowserRouter>
				<CampaignContext.Provider value={campaignValue}>
					<UserContext.Provider value={authValue}>
						<GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/start-a-campaign" element={<StartACampaign />} />
								<Route path="/browse" element={<Browse />} />
								<Route path="/verification" element={<Verification />} />
								<Route path="/paymentsuccess" element={<PaymentSuccessful />} />
								<Route
									path="/start-a-campaign/sucess"
									element={<CampaignSuccessful />}
								/>
								<Route path="/c/:category" element={<CategoryPage />} />
								<Route
									path="/browse/:campaign_slug"
									element={<CampaignPage />}
								/>
							</Routes>
						</GoogleOAuthProvider>
					</UserContext.Provider>
				</CampaignContext.Provider>
			</BrowserRouter>
		</>
	);
}

export default App;
