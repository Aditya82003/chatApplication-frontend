import { FiMessageSquare } from "react-icons/fi"
import AuthPattern from "../components/AuthPattern"
import { HiOutlineMail } from "react-icons/hi"
import { TbLoaderQuarter, TbPassword } from "react-icons/tb"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import type { SignInState } from "../types/types"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useSelector } from "react-redux"
import { signInThunk } from "../store/features/auth/authSlice"

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggingiN } = useSelector((state: RootState) => state.auth)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<SignInState>({
    email: "",
    password: ""
  })
  const navigate= useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const formValidation = (): boolean => {
    if (!formData.email) {
      toast.error("Please enter email")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter valid email")
      return false
    }
    if (!formData.password) {
      toast.error("Please enter Password")
      return false
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/.test(formData.password)) {
      toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
      return false
    }
    return true

  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = formValidation()
    if (!isValid) return
    const result = await dispatch(signInThunk(formData))
    if (signInThunk.fulfilled.match(result)) {
      toast.success("Sign in successful")
      navigate('/')

    } else {
      toast.error(result.payload || "Sign in failed")
    }

  }
  return (
    <div className="container mx-auto grid min-h-screen lg:grid-cols-2 ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8 ">
          <div className="flex flex-col items-center gap-4 group ">
            <div className="w-12 h-12 bg-primary/10  rounded-xl flex justify-center items-center hover:bg-primary/20 transition-colors">
              <FiMessageSquare className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl  font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md ">
            <div className="form-control">
              <label className="label pb-1" >
                <span className="label label-text font-medium">Email</span>
              </label>
              <div className="relative w-full ">
                <div className="absolute inset-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
                  <HiOutlineMail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  name="email"
                  className="input input-bordered w-full pl-10 outline-none focus:outline-none focus:ring-0"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label pb-1" >
                <span className="label label-text font-medium">Password</span>
              </label>
              <div className="relative w-full ">
                <div className="absolute inset-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
                  <TbPassword className="size-5 text-base-content/50" />
                </div>
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  className="  input input-bordered w-full pl-10 outline-none focus:outline-none focus:ring-0"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 pr-5 z-10 flex items-center cursor-pointer" onClick={() => { setShowPassword((prevState) => !prevState) }}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </div>
            <button type="submit" className="bg-primary w-full py-4 rounded-lg mt-4 hover:bg-primary/50 ">
              {isLoggingiN?(<TbLoaderQuarter className="size-6 animate-spin"/>):("Sign in")}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60 mt-4">Don't have an account? <Link to="/signup" className="text-primary hover:text-primary/60">Create Account</Link></p>
          </div>
        </div>
      </div>
      <AuthPattern
        title="Join our community"
        subtitle="Connect with friend,share moments,and stay in touch with your loved ones."
      />

    </div>
  )
}

export default Login