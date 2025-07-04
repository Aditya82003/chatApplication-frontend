import type { FC } from "react"
import SideBar from "../components/SideBar"
import Welcome from "../components/Welcome"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import ChatCointainer from "../components/ChatCointainer"

const Home: FC = () => {
  const { selectedUser } = useSelector((state: RootState) => state.chat)
  return (
    <div className=" h-screen bg-base-200">
      <div className="flex items-center justify-center pt-18 px-4">
        <div className="bg-base-100 rounded-lg  w-full max-w-6xl h-[calc(100vh-6rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <SideBar />
            {selectedUser?<ChatCointainer/>:<Welcome />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home