import { useEffect, type FC } from "react"
import { useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useDispatch } from "react-redux"
import { getMessagethunk } from "../store/features/chat/chatSlice"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import defaultImage from '../assets/OIP.jpeg'

const ChatCointainer: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { messages, isMessageLoading } = useSelector((state: RootState) => state.chat)
    const { selectedUser } = useSelector((state: RootState) => state.chat)
    const { user } = useSelector((state: RootState) => state.auth)

    function messageTime(objectId: string): string {
    const timestamp = parseInt(objectId.substring(0, 8), 16);
    return new Date(timestamp * 1000).toISOString();
  }

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessagethunk(selectedUser._id))
        }
    }, [getMessagethunk, selectedUser?._id])

    if (isMessageLoading) {
        <h1>Loading.....</h1>
    }
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === user?._id ? "chat-end" : "chat-start"}`}>
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img src={message.senderId === user?._id ? user.profilePic || defaultImage : selectedUser?.profilePic || defaultImage}
                                    alt="profile pic" />
                            </div>
                        </div>
                        <div className="text-xs">
                            {messageTime(message._id).split("T")[0]}
                        </div>
                        <div className="chat-bubble bg-primary flex flex-col">
                            {message.image &&(
                                <img src={message.image} alt="attachment" className="max-w-[200px] rounded-md mb-2"/>
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    )
}

export default ChatCointainer