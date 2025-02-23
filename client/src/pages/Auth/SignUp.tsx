import { useRef } from "react"
import { Input } from "../../components/Input"
import { Button } from "../../components/ui/Button"
import axios from "axios";
import { BackendUrl } from "../../config/config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const signUpHandler = async () => {
    const username = usernameRef.current?.value
    const password = usernameRef.current?.value
    const response = await axios.post(BackendUrl+"/api/v1/auth/signup",{
        username,
        password
    })
    alert("Signed up")
    console.log(response)
    setTimeout(() => {
      navigate("/signin")
    }, 3000);
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4" >
              <Button size="md" onClick={signUpHandler} variant="primary" text="Signup" fullWidth="true" loading="true" />
            </div>

            <div className="py-2 ">
              <h2 className="flex justify-center" >
                Existing user? <span className="mx-2 px-2 rounded bg-purple-200 cursor-pointer" onClick={()=>{
                  navigate('/signin')
                }} >Sign In</span>
              </h2>
            </div>

        </div>
    </div>
  )
}

export default SignUp