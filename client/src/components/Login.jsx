import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleGoogleLogin = async (credentialResponse) => {
		console.log("in handle google login", credentialResponse);
		const res = await axios.post("/api/auth/login-google", {
			credential: credentialResponse.credential,
		});
		if (res?.data?.success) {
			navigate("/");
			setUser(res.data.user);
			toast.success("Logged in successfully");
		}
	};

	const handleAnomymousLogin = async () => {
		const res = await axios.post("/api/auth/login-anonymous");
		if (res.data.success) {
			navigate("/");
			setUser(res.data.user);
			toast.success("Logged in anonymously");
		}
	};

	return (
		<div className="text-center mt-14 p-2">
			<Link to="/">
				<img
					src="/assets/logo.png"
					alt="logo"
					className="w-[180px] lg:w-[250px] mx-auto mb-8 lg:mb-12"
				/>
			</Link>
			<h2 className="text-white font-semibold text-2xl lg:text-4xl">
				Sign In To Your Account
			</h2>
			<div className="mt-8 lg:mt-[80px] flex flex-col gap-5 items-center">
				<div className="mx-auto">
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
				<button
					onClick={handleAnomymousLogin}
					className="rounded bg-white p-2 font-medium text-gray-700
        "
				>
					👤Continue As Guest
				</button>
			</div>
		</div>
	);
}

export default Login;
