import { useRef, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/ui/Button";
import axios from "axios";
import { BackendUrl } from "../../config/config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const signUpHandler = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        BackendUrl + "/api/v1/auth/signup",
        { username, password }
      );

      if (response.data.status === "error") {
        toast.error("User already exists");
        return;
      }

      toast.success("Signup successful 🎉 Redirecting...");
      setTimeout(() => navigate("/signin"), 1500);

    } catch (err) {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center items-center">
      
      <div className="bg-white shadow-xl rounded-2xl w-[380px] p-8 space-y-6">
        
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create account 🚀</h1>
          <p className="text-gray-500 text-sm mt-1">
            Start your journey with us
          </p>
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
          text={loading ? "Creating..." : "Sign Up"}
          fullWidth
          loading={loading}
          onClick={signUpHandler}
        />

        {/* Signin redirect */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;