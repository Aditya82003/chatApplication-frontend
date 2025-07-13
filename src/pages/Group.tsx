import { useEffect, useState, type FC } from "react"
import { AiOutlineGroup } from "react-icons/ai"
import { BiGroup } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import { getSocket } from "../lib/socket";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


const Group: FC = () => {
    const {user}=useSelector((state:RootState)=>state.auth)
    const [joined, setJoined] = useState<boolean>(false)
    const [roomId, setRoomId] = useState<string>("")
    useEffect(() => {
        const socket = getSocket()
        if (!socket) return

        const handleUserJoined = (msg: string) => {
            console.log("user Joined",msg)
            toast.success(msg)
        }
        const handleUSerLeft = (msg:string)=>{
            console.log("user left",msg)
            toast.error(msg)
        }
        socket.on("user-joined", handleUserJoined)
        socket.on('user-left',handleUSerLeft
        )

        return () => {
            socket.off("user-joined", handleUserJoined)
            socket.off('user-left',handleUSerLeft)
        }
    }, [])

    const handleCreateRoom = () => {
        const newRoomId = uuidv4().slice(0, 6)
        const name=user?.fullName
         const socket = getSocket()
         setRoomId(newRoomId)
        if (roomId.trim()) {
            socket?.emit('join-room', {roomId:newRoomId,name})
        }
        setJoined(true)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const socket = getSocket()
        const name=user?.fullName
        if (roomId.trim()) {
            socket?.emit('join-room', {roomId,name})
            setJoined(true)
        }
    }
    const handleLeaveRoom = () => {
        const name=user?.fullName
        const socket = getSocket()
        socket?.emit('leave-room', {roomId,name})
        setJoined(false)

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.target.value)
    }

    if (joined) {
        return (
            <div className=" h-screen bg-base-100">
                <div className="flex justify-center items-center h-full w-full ">
                    <div className="flex items-center justify-center max-w-2xl w-full h-[500px] bg-base-300 rounded-xl">
                        <h1>Group id {roomId}</h1>
                        <button className="btn btn-md" onClick={handleLeaveRoom}>Leave Group</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="h-screen bg-base-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <button
                    onClick={handleCreateRoom}
                    className="flex items-center gap-2 btn btn-md bg-primary hover:bg-primary/85"
                >
                    <AiOutlineGroup className="w-5 h-5" />
                    <span className="text-sm text-primary-content">Create Group</span>
                </button>

                {/* Join Group */}
                <form onSubmit={handleSubmit} className="flex flex-col w-[400px]  items-center gap-4 bg-base-300 p-6 rounded-xl shadow-md">
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-medium">Group ID</span>
                        </label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
                                <BiGroup className="size-5 text-base-content/50" />
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10"
                                placeholder="Enter Group ID"
                                value={roomId}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-md btn-primary w-full">
                        Join Group
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Group