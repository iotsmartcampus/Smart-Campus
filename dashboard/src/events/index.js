import io from "socket.io-client"
var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000, //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};
const socket = io(process.env.VUE_APP_RESOURCE_SERVER,{ transports: ["websocket"] })
export default socket;