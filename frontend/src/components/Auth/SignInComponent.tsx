import { Link } from "react-router-dom"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { SigninInput } from "@suraj_h/medium-common"

export const SignInComponent = () => {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: ""
  })

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

        <Button className="mt-4 w-80">Login</Button>

      </div>
    </div>
  </div>
}
