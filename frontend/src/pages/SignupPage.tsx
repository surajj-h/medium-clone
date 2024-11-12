import { SignUpComponent } from "@/components/Auth/SignUpComponent"
import { Quote } from "@/components/Quote"

export const Signup = () => {
  return <div className="h-screen grid lg:grid-cols-2">
    <div>
      <SignUpComponent />
    </div>
    <div className="hidden lg:block">
      <Quote />
    </div>
  </div>
}
