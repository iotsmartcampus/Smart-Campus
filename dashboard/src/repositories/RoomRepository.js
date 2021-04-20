import repository from './Repository.js'

const {RESOURCE_SERVER} = process.env

export default {
    getRoomById(roomId) {
        return repository.get(`${RESOURCE_SERVER}v2/entities/${roomId}`)
    },
    getAllRoomFromBlockID(blockId){
        const params = {
            q:`refStore==${blockId}`,
            options: "count",
            type: 'Room'
        }
        console.log("before request")
        return repository.get(`/entities/block/${blockId}/rooms`)
    },
}