import axios from "axios";
import { Input } from "../../components/Input"
import { Button } from "../../components/ui/Button"
import { useRef } from "react";
import { BackendUrl } from "../../config/config";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  
  const signInHandler = async () => {
    const username = usernameRef.current?.value
    const password = usernameRef.current?.value
    const response = await axios.post(BackendUrl+"/api/v1/auth/signin",{
        username,
        password
    })
    console.log(response)
    const jwt = response.data.token
    console.log(jwt)
    localStorage.setItem("token",jwt)
    navigate('/dashboard')
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4" >
              <Button size="md" variant="primary" text="Signin" fullWidth="true" onClick={signInHandler} loading="true" />
            </div>
            <div className="py-2 ">
              <h2 className="flex justify-center" >
                New user? <span className="mx-2 px-2 rounded bg-purple-200 cursor-pointer" onClick={()=>{
                  navigate('/signup')
                }} >Sign up</span>
              </h2>
            </div>
        </div>
    </div>
  )
}

export default SignIn