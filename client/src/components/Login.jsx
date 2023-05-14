import { GoogleLogin } from "@react-oauth/google";

function Login() {
	return (
		<div className="text-center mt-14 p-2">
			<a href="#">
				<img
					src="/assets/logo.png"
					alt="logo"
					className="w-[180px] mx-auto mb-8"
				/>
			</a>
			<h2 className="text-white font-semibold text-2xl">
				Sign In To Your Account
			</h2>
			<div className="mt-8 flex flex-col gap-5 items-center">
				<div className="mx-auto">
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
						}}
						onError={() => {
							console.log("Login Failed");
						}}
						useOneTap
						auto_select
					/>
				</div>
				<button
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
