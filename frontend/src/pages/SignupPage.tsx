import { SignUpComponent } from "@/components/Auth/SignUpComponent"
import { Quote } from "@/components/Quote"

export const Signup = () => {
  return <div className="h-screen grid lg:grid-cols-2">
    <div>
      <SignUpComponent />
    </div>
    <div className="hidden lg:block absolute right-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />

    <div className="hidden lg:block">
      <Quote />
    </div>
  </div>
}
