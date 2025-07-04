import type { FC } from "react"
import { FiMessageSquare } from "react-icons/fi"

const Welcome: FC = () => {
  return (
    <div className="flex flex-1  flex-col gap-6  items-center justify-center h-full w-full p-16 bg-base-100/50">
      <div className="w-16 h-16 bg-primary/10  rounded-xl flex justify-center items-center hover:bg-primary/20 transition-colors">
        <FiMessageSquare className="size-8 text-primary/80" />
      </div>
      <div className="text-center w-full max-w-md ">
      <h1 className="font-semibold  text-2xl lg:text-3xl">Welcome to Talksy!</h1>
      <p className="mt-6 text-lg  md:text-xl  text-base-content/60">Select a converstation from the sidebar to start chatting</p>
      </div>
    </div>
  )
}

export default Welcome