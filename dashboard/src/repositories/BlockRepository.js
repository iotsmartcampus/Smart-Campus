import repository from './Repository.js'
import roomRepository from './RoomRepository'
import store from '../data/index'
import socket from '../events/index'

const {VUE_APP_RESOURCE_SERVER} = process.env


export default {
    getBlockById(blockId) {
        return repository.get(`${RESOURCE_SERVER}v2/entities/${blockId}`)
    },
    getAllBlock(){
        const params = {
            type: 'Block'
        }
        return repository.get(`${RESOURCE_SERVER}v2/entities`,{params})
    },
    getAllRoomsByBlockId(blockId){
        return roomRepository.getAllRoomFromBlockID(blockId)
  }
}

