import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleGoogleLogin = async (credentialResponse) => {
		try {
			const res = await axios.post("/api/auth/login-google", {
				credential: credentialResponse.credential,
			});
			if (res?.data?.success) {
				if (res?.data?.user?.role === "ADMIN") {
					setUser(res.data.user);
					toast.success("Logged in successfully");
					navigate("/dashboard");
				} else {
					await axios.get("/api/auth/logout");
					toast.error("You are not an admin");
				}
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			toast.error(error.message || "Something went wrong");
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col gap-5 h-[100vh] items-center justify-center">
			<h1 className="text-2xl uppercase font-semibold">
				Login with your Admin account 👇
			</h1>
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
