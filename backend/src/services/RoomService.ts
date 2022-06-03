import Constants from '../util/Constans'
import client from '../client/ResourceClient'
import { Room } from '../util/Interfaces'
class RoomService {
  async fetchAllRoomsByBlockId(blockId: string) {
    try {
      const response = await client.get(`${Constants.baseEntities}`, {
        headers: Constants.headers.fetch,
        params: {
          q: `refBlock==${blockId}`,
          options: 'keyValues'
        }
      })

      if (response.data.length === 0) {
        //TODO: Throw an error
      }
      const roomsDataPromisesRequest = response.data.map(async (room: Room) => {
        const roomDevices = await this.getAllDevicesById(room.id)

        return { ...room, devices: roomDevices }
      })

      const roomsData = await Promise.all(roomsDataPromisesRequest)
      return roomsData
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  async getAllDevicesById(id: string): Promise<unknown> {
    if (!id) throw new Error('Missing room id!')
    try {
      const devices = await client.get(`${Constants.baseEntities}`, {
        headers: Constants.headers.fetch,
        params: {
          q: `refRoom==${id}`,
          options: 'keyValues'
        }
      })
      return devices.data
    } catch (error) {
      console.log(error)
      throw new Error('An error happened')
    }
  }
}

export default new RoomService()

//Search for block's room
