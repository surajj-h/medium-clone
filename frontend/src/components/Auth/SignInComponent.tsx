import { Link, useNavigate } from "react-router-dom"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { SigninInput } from "@suraj_h/medium-common"

export const SignInComponent = () => {
  const navigate = useNavigate()

  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: ""
  })

  const [login, setLogin] = useState("Login")

  async function sendRequest() {
    const BACKEND_URL = await import.meta.env.VITE_API_BACKEND_URL;
    try {
      setLogin("Logging in...")
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
      setLogin("Login")
      const jwt = response.data.jwt;
      if (jwt) {
        localStorage.setItem('userName', response.data.name)
        localStorage.setItem("jwtToken", jwt)
        navigate("/blogs")
      } else {
        alert(response.data.message)
      }
    } catch (e) {
      setLogin("Login")
      alert("Error Signing in")
    }

  }

  return <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div className="max-w-lg">
        <div className="pl-4 text-4xl font-bold">
          Login to Medium
        </div>
        <div className="text-md font-light text-center text-slate-400">
          Dont have an account? <Link className="underline" to={"/signup"}>Signup</Link>
        </div>

        <div className="text-sm font-semibold mt-2 mb-2">
          Email
        </div>
        <Input type="email" onChange={(e) => {
          setPostInputs(c => ({
            ...c,
            email: e.target.value
          }))
        }} placeholder="johndoe@gmail.com" />

        <div className="text-sm font-semibold mt-2 mb-2">
          Password
        </div>
        <Input type="password" onChange={(e) => {
          setPostInputs(c => ({
            ...c,
            password: e.target.value
          }))
        }} placeholder="Enter your password" />

        <Button className="mt-4 w-80" onClick={sendRequest}>{login}</Button>

      </div>
    </div>
  </div>
}
