import { Link, useNavigate } from "react-router-dom"
import { Input } from "../ui/input"
import { useState } from "react"
import { SignupInput } from "@suraj_h/medium-common"
import { Button } from "../ui/button"
import axios from "axios"

export const SignUpComponent = () => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  })
  const [signup, setSignup] = useState("Signup")

  async function sendRequest() {
    const BACKEND_URL = await import.meta.env.VITE_API_BACKEND_URL;
    try {
      setSignup("Signing up...")
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
      setSignup("Signup")
      const jwt = response.data.jwt;
      localStorage.setItem('userName', response.data.name)
      localStorage.setItem("jwtToken", jwt)
      navigate('/blogs')
    } catch (e) {
      setSignup("Signup")
      alert("Error signing up")
    }
  }

  return <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div className="max-w-lg">
        <div className="text-4xl font-bold">
          Create an account
        </div>
        <div className="text-md font-light text-center text-slate-400">
          Already have an account? <Link className="underline" to={"/signin"}>Login</Link>
        </div>

        <div className="text-sm font-semibold mt-4 mb-2">
          Username
        </div>
        <Input type="text" onChange={(e) => {
          setPostInputs(c => ({
            ...c,
            name: e.target.value
          }))
        }}
          placeholder="This is your public display name"
        />

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
        }} placeholder="Enter password" />

        <Button className="mt-4 w-80" onClick={sendRequest}>{signup}</Button>

      </div>
    </div>
  </div>
}
