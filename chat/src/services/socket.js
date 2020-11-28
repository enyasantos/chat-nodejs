import io from "socket.io-client";

const options = {
    rememberUpgrade:true,
    transports: ['websocket'],
    secure:true, 
    rejectUnauthorized: false
}
const socket = io('http://localhost:3001', options);

socket.on('connect', () => console.log('[IO] Connect => New connection has been established.'));

export default socket;