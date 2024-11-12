import { SignInComponent } from "@/components/Auth/SignInComponent"
import { Quote } from "@/components/Quote"

export const Signin = () => {
  return <div className="h-screen grid lg:grid-cols-2">
    <div>
      <SignInComponent />
    </div>
    <div className="hidden lg:block">
      <Quote />
    </div>
  </div>
}
