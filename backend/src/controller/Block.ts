import { Request, Response } from 'express'
import Constants from '../util/Constans'
import { Room, TemperatureSensor } from '../util/Interfaces'
import RoomService from '../services/RoomService'
import client from '../client/ResourceClient'
class BlockController {
  async getOne(request: Request, response: Response): Promise<unknown> {
    const { id } = request.params
    if (!id)
      return response
        .status(400)
        .json({ message: 'message with bad formatted' })
    try {
      const responseData = await client.get(`${Constants.baseEntities}/${id}`, {
        headers: Constants.headers.fetch
      })
      return response.status(responseData.status).json(await responseData.data)
    } catch (error) {
      return response.status(500).json({ message: 'An error happed' })
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const responseData = await client.get(`${Constants.baseEntities}`, {
        headers: Constants.headers.fetch,
        params: {
          type: 'Block',
          options: 'keyValues'
        }
      })

      //Fetch All rooms and fetchAll devices

      const roomsDataPromisesRequest = responseData.data.map(
        async (item: any) => {
          const rooms = await RoomService.fetchAllRoomsByBlockId(item.id)

          return { ...item, rooms: rooms }
        }
      )

      const roomsData = await Promise.all(roomsDataPromisesRequest)
      return response.status(responseData.status).json(roomsData)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'An error happed' })
    }
  }

  async getAllRoomsByBlockId(
    request: Request,
    response: Response
  ): Promise<unknown> {
    try {
      const { id } = request.params
      console.log('Hi there')
      console.log(id)
      const responseData = await client.get(`${Constants.baseEntities}`, {
        headers: Constants.headers.fetch,
        params: {
          type: 'Room',
          q: `refBlock==${id}`,
          options: 'keyValues'
        }
      })

      const roomsDataPromisesRequest = responseData.data.map(
        async (room: Room) => {
          const temperatureSensorData = await client.get(
            `${Constants.baseEntities}`,
            {
              headers: Constants.headers.fetch,
              params: {
                type: 'TemperatureSensor',
                q: `refRoom==${room.id}`
              }
            }
          )
          const roomDevices = await RoomService.getAllDevicesById(room.id)

          return { ...room, devices: roomDevices }
        }
      )

      const roomsData = await Promise.all(roomsDataPromisesRequest)
      return response.status(responseData.status).json([...roomsData])
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'An error happed' })
    }
  }
}

export default new BlockController()
