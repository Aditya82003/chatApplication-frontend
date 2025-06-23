import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import NavBar from "./components/NavBar"

function App() {
  return (
    <> 
    <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
