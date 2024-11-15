import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/SignupPage"
import { Signin } from "./pages/SigninPage"
import { Blog } from "./pages/Blog"
import { ThemeProvider } from "./components/theme-provider"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/publish' element={<Publish />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App
