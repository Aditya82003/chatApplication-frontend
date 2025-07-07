import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { useEffect } from "react"
import { getSocket } from "../lib/socket"
import { setOnlineUsers } from "../store/features/auth/authSlice"

export const useSocketEvent = () =>{
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        const socket = getSocket()
        if(!socket) return

        const handleOnlineUsers = (users:string[])=>{
            console.log(users)
            dispatch(setOnlineUsers(users))
        }
        socket.on('getOnlineUsers',handleOnlineUsers)

        return ()=>{
            socket.off("getOnlineUsers",handleOnlineUsers)
        }
    },[])
}