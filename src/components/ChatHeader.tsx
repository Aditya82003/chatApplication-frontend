import type { FC } from "react"
import { CgClose } from "react-icons/cg"
import defaultProfile from '../assets/OIP.jpeg'
import type { AppDispatch, RootState } from "../store/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setSelectedUser } from "../store/features/chat/chatSlice"

const ChatHeader: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { selectedUser } = useSelector((state: RootState) => state.chat)
    const {onlineUser} =useSelector((state:RootState)=>state.auth)
    if (!selectedUser) return null;

    return (
        <div className="w-full  border-b border-base-300 ">
            <div className="flex items-center justify-between py-1.5 ">
                <div className="flex gap-3 items-center pl-4">
                    <img
                        src={selectedUser?.profilePic || defaultProfile}
                        alt={selectedUser?.fullName}
                        className="size-12 rounded-full object-cover" />
                    <div className="">
                        <h1 className="text-lg font-semibold">{selectedUser?.fullName}</h1>
                        <span className="text-xs">{onlineUser?.includes(selectedUser?._id) ?"Online":"Offline"}</span>
                    </div>
                </div>
                <div className="flex w-8 h-8 items-center justify-center hover:bg-base-300 rounded-full mr-4">
                    <CgClose className="size-5" onClick={() => dispatch(setSelectedUser(null))} />
                </div>
            </div>
        </div>
    )
}

export default ChatHeader