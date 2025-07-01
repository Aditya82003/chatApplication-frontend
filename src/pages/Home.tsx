import type { FC } from "react"
import SideBar from "../components/SideBar"
import Welcome from "../components/Welcome"

const Home: FC = () => {
  return (
    <div className=" h-screen bg-base-200">
      <div className="flex items-center justify-center pt-18 px-4">
        <div className="bg-base-100 rounded-lg  w-full max-w-6xl h-[calc(100vh-6rem)]">
            <div className="flex h-full overflow-hidden rounded-lg">
              <SideBar/>
              <Welcome/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home