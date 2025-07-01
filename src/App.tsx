import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import NavBar from "./components/NavBar"
import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "./store/store"
import { useEffect } from "react"
import { checkAuthThunk } from "./store/features/auth/authSlice"
import { useSelector } from "react-redux"
import Login from "./pages/LogIn"
import { Toaster } from "react-hot-toast"

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isCheckAuth } = useSelector((state: RootState) => state.auth)
  const {theme} = useSelector((state:RootState)=>state.theme)

  useEffect(() => {
    dispatch(checkAuthThunk())
  }, [])
  if (isCheckAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Checking authentication...
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login' />} />
        </Routes>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App
