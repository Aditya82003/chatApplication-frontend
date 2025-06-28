import { useState, type FC } from "react"
import { FaCamera, FaUser } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import userLogo from '../assets/OIP.jpeg'

const Profile: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  function getTimestampFromObjectId(objectId: string): string {
    const timestamp = parseInt(objectId.substring(0, 8), 16);
    return new Date(timestamp * 1000).toISOString();
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result as string
      setProfilePhoto(base64Image)
    }

    reader.onerror = (err) => {
      console.log("Error reading file", err)
    }
  };


  return (
    <div className="container mx-auto pt-20 h-screen ">
      <div className="max-w-2xl mx-auto  p-6 py-8">
        <div className="bg-base-200 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Profile</h1>
            <p className="mt-2 font-light ">Your profile information</p>
          </div>
          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={profilePhoto || user?.profile || userLogo}
                alt="profile"
                className="size-32 rounded-full border-2 object-cover " />
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-base-content hover:scale-125 p-2 rounded-full cursor-pointer transition-all duration-200">
                <FaCamera className="w-4 h-4 text-base-200" />
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                >
                </input>
              </label>
            </div>
            <p className="text-sm text-zinc-400">Click the camera icron to update your photo</p>
          </div>
          <div className="space-y-6 " >
            <div className="space-y-3">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <FaUser className="size-4" /><span className="font-semibold text-sm">Full Name</span>
              </div>
              <p className="border rounded-lg px-4 py-2.5 bg-base-200 border-primary">{user?.fullName}</p>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <AiOutlineMail className="size-4" /><span className="font-semibold text-sm">Email</span>
              </div>
              <p className="border rounded-lg px-4 py-2.5 bg-base-200 border-primary">{user?.email}</p>
            </div>

          </div>


        </div>
        <div className="bg-base-200 rounded-xl p-6 mt-6">
          <h1 className="font-semibold text-lg mb-4">Account Information</h1>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-3 border-b-1 border-zinc-700">
              <span>Member Since</span><span>{getTimestampFromObjectId(user?._id as string).split("T")[0]}</span>
            </div>
            <div className="flex items justify-between ">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile