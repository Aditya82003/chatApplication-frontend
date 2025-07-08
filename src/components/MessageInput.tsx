import { useRef, useState, type FC } from "react"
import { BiSend } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { sendMessageThunk } from "../store/features/chat/chatSlice"
import { useSelector } from "react-redux"
import { FaFileImage } from "react-icons/fa"


const MessageInput: FC = () => {
    const [text, setText] = useState<string>("")
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const {selectedUser} =useSelector((state:RootState)=>state.chat)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const file = e.target.files?.[0]
        if(!file) return

        const reader = new FileReader()
        reader.onloadend=()=>{
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }
    const handleRemoveImage = ():void=>{
        setImagePreview(null)

    }

    const handleSendMessage = async(e: React.FormEvent)=>{
        e.preventDefault()
        if(!selectedUser?._id) return
        if(!text?.trim() && !imagePreview) return
    

        dispatch(sendMessageThunk({
            id:selectedUser?._id,
            text,
            image:imagePreview || ""
        }))
         
        setText("")
        setImagePreview(null)
    }
    return (
        <div className="w-full p-4">
            {imagePreview && <div className="mb-3 flex items-center gap-2">
                <div className="relative">
                    <img src={imagePreview}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-lg border border-base-200" />
                    <button className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300 flex items-center justify-center"
                        type="button"
                        onClick={handleRemoveImage}>
                        <CgClose className="size-4" />
                    </button>
                </div>
            </div>}
            <form  onSubmit={handleSendMessage} className="flex  items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input type="text"
                        className="w-full input input-border rounded-lg input-sm sm:input-md "
                        placeholder="Type a Message"
                        value={text}
                        onChange={handleChange} />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}>
                        <FaFileImage className="size-5 text-primary" />
                    </button>
                </div>
                <button type="submit" className="btn btn-circle btn-md"
                    disabled={!text?.trim() && !imagePreview}>
                    <BiSend size={22} className="text-primary" />
                </button>
            </form>
        </div>
    )
}

export default MessageInput