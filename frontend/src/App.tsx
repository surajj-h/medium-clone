import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/SignupPage"
import { Signin } from "./pages/SigninPage"
import { Blog } from "./pages/Blog"
import { ThemeProvider } from "./components/theme-provider"

function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blog' element={<Blog />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
