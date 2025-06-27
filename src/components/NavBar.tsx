import type { FC } from "react"
import { FiMessageSquare } from "react-icons/fi"
import { LuSettings } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { Link } from "react-router"


const NavBar: FC = () => {
    return (
        <header className="fixed w-full bg-base-100 border-b border-base-300 backdrop-blur-lg top-0 z-40 ">
            <div className="container mx-auto px-6 h-12 ">
                <div className="flex items-center justify-between h-full ">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex  items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex  items-center justify-center  ">
                                <FiMessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="font-bold text-lg">TALKSY</h1>
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Link to="/setting" className="flex gap-2 items-center btn btn-sm  ">
                            <LuSettings className="w-4 h-4" />
                            <span className="hidden sm:inline">Setting</span>
                        </Link>
                        <Link to="/profile" className="flex gap-2 items-center btn btn-sm">
                            <FaRegUser className="w-4 h-4"/>
                            <span className="hidden sm:inline">Profile</span>
                        </Link>
                        <Link to="/" className="flex gap-2 items-center btn btn-sm">
                            <LuLogOut className="w-4 h-4"/>
                            <span className="hidden sm:inline">Logout</span>
                        </Link>
                        
                    </div>


                </div>

            </div>
        </header>
    )
}

export default NavBar