import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const handleGoogleLogin = async (credentialResponse) => {
		try {
			const res = await axios.post("/api/auth/login-google", {
				credential: credentialResponse.credential,
			});
			if (res?.data?.success) {
				navigate("/");
				setUser(res.data.user);
				toast.success("Logged in successfully");
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Login with your Admin account 👇</h1>
			<GoogleLogin
				onSuccess={(credentialResponse) =>
					handleGoogleLogin(credentialResponse)
				}
				onError={() => {
					toast.error("Something went wrong");
				}}
				useOneTap
			/>
		</div>
	);
};

export default Login;
