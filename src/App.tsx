import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import NavBar from "./components/NavBar"
import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "./store/store"
import { useEffect } from "react"
import { checkAuth } from "./store/features/auth/authSlice"
import { useSelector } from "react-redux"
import Login from "./pages/LogIn"

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isCheckAuth, error } = useSelector((state: RootState) => state.auth)
  console.log(user)
  console.log(isCheckAuth)
  console.log(error)

  useEffect(() => {
    dispatch(checkAuth())
  }, [])
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login' />} />
        </Routes>
      </main>
    </>
  )
}

export default App
