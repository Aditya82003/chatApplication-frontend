import React, { useEffect, useState, type FC } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useSelector } from "react-redux"
import { getUsersThunk, setSelectedUser } from "../store/features/chat/chatSlice"
import { FaUsers } from "react-icons/fa"
import userDefaultProfile from '../assets/OIP.jpeg'

const SideBar: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { chatUsers, selectedUser } = useSelector((state: RootState) => state.chat)
    const { onlineUser } = useSelector((state: RootState) => state.auth)
    const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowOnlineOnly(e.target.checked)
    }

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [getUsersThunk])

    const filteredUsers = showOnlineOnly ? chatUsers.filter((user) => onlineUser?.includes(user._id)) : chatUsers

    return (
        <aside className=" h-full w-20 lg:w-72 rouded-lg border-r border-base-200 flex flex-col transition-all duration-200">
            <div className="border-b boter-base-300 w-full p-5">
                <div className="flex gap-2 items-center">
                    <FaUsers className="size-6" />
                    <h1 className="font-medium hidden lg:block">Contact us</h1>
                </div>
                <div className="mt-3 hidden lg:flex gap-2 items-center">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={handleChange}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">{Math.max((onlineUser?.length ?? 1) - 1, 0)}</span>
                </div>
            </div>
            <div className=" py-2 overflow-y-auto w-full ">
                {
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            className={`w-full p-3 flex gap-2 items-center  transition-colors border-b border-base-200 ${selectedUser === user ? "bg-base-300 ring-1 ring-base-300" : "hover:bg-base-300"}`}
                            onClick={() => dispatch(setSelectedUser(user))}
                        >
                            <div className="relative ">
                                <img src={user.profilePic || userDefaultProfile}
                                    alt={user.fullName}
                                    className=" size-12 object-cover rounded-full"
                                />
                                {
                                    onlineUser?.includes(user._id) && (
                                        <span className="relative bottom-0 right-0 size-5 rounded-full bg-emerald-500 ring-2 ring-zinc-900" />
                                    )
                                }
                            </div>
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="text-medium truncate">
                                    {user.fullName}
                                </div>
                                <div className="text-sm tracking-wider text-zinc-400">
                                    {onlineUser?.includes(user._id)?"Online":"Offline"}
                                </div>
                            </div>
                        </button>
                    ))}
                {(filteredUsers.length === 0) && (
                    <div className="text-center text-zinc-500 py-4">No online User</div>
                )
                }
            </div>
        </aside>
    )
}

export default SideBar