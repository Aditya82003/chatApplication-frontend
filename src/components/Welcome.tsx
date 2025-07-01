import type { FC } from "react"
import { FiMessageSquare } from "react-icons/fi"

const Welcome: FC = () => {
  return (
    <div className="flex flex-col gap-8  items-center justify-center h-full w-full">
      <div className="w-16 h-16 bg-primary/10  rounded-xl flex justify-center items-center hover:bg-primary/20 transition-colors">
        <FiMessageSquare className="size-8 text-primary/80" />
      </div>
      <div className="text-center w-full max-w-md ">
      <h1 className="font-semibold tracking-wider text-3xl">Welcome to Talksy!</h1>
      <p className="mt-6 text-xl tracking-widest font-light text-base-content/50">Select a converstation from the sidebar to start chatting</p>
      </div>
    </div>
  )
}

export default Welcome