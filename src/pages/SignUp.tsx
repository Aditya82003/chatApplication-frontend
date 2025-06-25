import { useState, type FC } from "react"
import type { formDataState, showPasswordState } from "../types/types"
import { FiMessageSquare } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { TbPassword } from 'react-icons/tb';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { Link } from "react-router";
import AuthPattern from "../components/AuthPattern";
import toast from "react-hot-toast";
const SignUp: FC = () => {

  const [showPassword, setShowPassword] = useState<showPasswordState>(false)
  const [formData, setFormData] = useState<formDataState>({
    fullName: "",
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const formValidation = (): boolean => {
    if (!formData.fullName.trim()) {
       toast.error("Full name is required")
       return false
    }
    if (!formData.email.trim()) {
       toast.error("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)){
      toast.error("Invalid email")
      return false
    } 
    if (!formData.password){
      toast.error("Password is required")
      return false
    } 
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/.test(formData.password)){
      toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
      return false
    } 
    return true

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = formValidation()
    if (success) 
      console.log(formData)

  }
  return (
    <div className="container mx-auto min-h-[calc(100vh-4rem)] grid  lg:grid-cols-2  ">
      {/* left side*/}
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12">
        {/*left top */}
        <div className="w-full max-w-md mb-18">
          <div className="flex flex-col items-center gap-2 group">

            <div className=" size-12  rounded-xl bg-primary/10 flex justify-center items-center hover:bg-primary/20 transition-colors">
              <FiMessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>
        {/*form*/}
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md ">
          <div className="form-control">
            <label className="label pb-1">
              <span className="label label-text font-medium">Full Name</span>
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 z-30 pl-3 flex items-center pointer-events-none ">
                <FaUser className="size-5 text-base-content/50" />
              </div>
              <input
                type="text"
                name="fullName"
                className='input input-bordered w-full pl-10 outline-none focus:outline-none focus:ring-0'
                placeholder="User Name"
                value={formData.fullName}
                autoComplete="off"
                onChange={handleChange} />
            </div>
          </div>
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
                type={showPassword ? "text" : "password"}
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
          <button type="submit" className="bg-primary w-full py-4 rounded-lg mt-4 hover:bg-primary/50 ">Create Account</button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60 mt-4">Alreadt have an account?{" "}
            <Link to="/login" className="link link-primary no-underline">Sign in</Link>
          </p>
        </div>
      </div>
      <AuthPattern
        title="Join our community"
        subtitle="Connect with friend,share moments,and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUp