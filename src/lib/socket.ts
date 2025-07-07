import {io,Socket} from 'socket.io-client'

let socket :Socket | null =null

export const connectSocket = (userId:string)=>{
    if(!socket){
        socket = io("http://localhost:3001",{
            query :{userId},
            transports :['websocket'],
            withCredentials:true
        })
    }
    if(!socket.connected) socket.connect()
}

export const getSocket = ():Socket |null=>socket

export const disconnectSocket = ()=>{
    if(socket){
        socket.disconnect();
        socket=null
    }
}