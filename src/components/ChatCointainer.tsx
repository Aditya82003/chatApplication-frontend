import type { FC } from "react"
import { useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { CgClose } from "react-icons/cg"
import defaultProfile from '../assets/OIP.jpeg'
import { useDispatch } from "react-redux"
import { setSelectedUser } from "../store/features/chat/chatSlice"

const ChatCointainer: FC = () => {
    const dispatch=useDispatch<AppDispatch>()
    // const {messages}= useSelector((state:RootState)=>state.chat)
    const { selectedUser } = useSelector((state: RootState) => state.chat)
    return (
        <div className="h-full w-full flex flex-col   rounded-lg ">
            <div className="w-full rounded-lg border-b border-base-300 ">
                <div className="flex items-center justify-between py-1.5 ">
                    <div className="flex gap-3 items-center pl-4">
                        <img
                        src={selectedUser?.profilePic || defaultProfile}
                        alt={selectedUser?.fullName}
                        className="size-12 rounded-full object-cover"/>
                        <div className="">
                            <h1 className="text-lg font-semibold">{selectedUser?.fullName}</h1>
                            <span className="text-xs">Online</span>
                        </div>
                    </div>
                    <div className="flex w-8 h-8 items-center justify-center hover:bg-base-300 rounded-full mr-4">
                        <CgClose className="size-5" onClick={()=>dispatch(setSelectedUser(null))} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between h-full w-full p-2 ">
                <div className="overflow-y-auto h-full border-b border-base-300">messages</div>
                <div className="flex items-center h-12 w-full">text feild</div>
                
            </div>
        </div>
    )
}

export default ChatCointainer