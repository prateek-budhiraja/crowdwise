import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const App = () => {
	const [user, setUser] = useState(null);
	const authValue = useMemo(() => ({ user, setUser }), [user, setUser]);

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
		<BrowserRouter>
			<UserContext.Provider value={authValue}>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_clientId}>
					<Routes>
						<Route path="/" element={<Login />} />
					</Routes>
				</GoogleOAuthProvider>
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
