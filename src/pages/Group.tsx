import { useState, type FC } from "react"
import { AiOutlineGroup } from "react-icons/ai"
import { BiGroup } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';


const Group: FC = () => {
    const [joined, setJoined] = useState<boolean>(false)
    const [roomId, setRoomId] = useState<string>("")

    const handleCreateRoom = () => {
        const newRoomId = uuidv4().slice(0, 6) // short ID
        setJoined(true)
        setRoomId(newRoomId)
        console.log(roomId)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setJoined(true)
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
                        <button className="btn btn-md" onClick={()=>setJoined(false)}>Leave Group</button>
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