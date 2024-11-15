import { SignInComponent } from "@/components/Auth/SignInComponent"
import { Quote } from "@/components/Quote"

export const Signin = () => {
  return (
    <div className="h-screen grid lg:grid-cols-2 relative">
      <div>
        <SignInComponent />
      </div>
      <div className="hidden lg:block absolute right-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export default Signin;
