import axios from "axios";
import { Input } from "../../components/Input";
import { Button } from "../../components/ui/Button";
import { useRef, useState } from "react";
import { BackendUrl } from "../../config/config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const signInHandler = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        BackendUrl + "/api/v1/auth/signin",
        { username, password }
      );

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Signin failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(
        BackendUrl + "/api/v1/auth/google",
        {
          token: credentialResponse.credential,
        }
      );

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl w-[380px] p-8 space-y-6">
        
        {/* 🔥 Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* 🔐 Google */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="flex-1 h-[1px] bg-gray-300" />
          OR
          <div className="flex-1 h-[1px] bg-gray-300" />
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <Input
            reference={usernameRef}
            placeholder="Email or Username"
          />
          <Input
            reference={passwordRef}
            placeholder="Password"
            type="password"
          />
        </div>

        {/* Button */}
        <Button
          size="md"
          variant="primary"
          text={loading ? "Signing in..." : "Sign In"}
          fullWidth={true}
          onClick={signInHandler}
          loading={loading}
        />

        {/* Signup */}
        <p className="text-center text-sm text-gray-600">
          New user?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;