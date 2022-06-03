import { Request, Response } from 'express'
import Constants from '../util/Constans'
import client from '../client/ResourceClient'
class RoomController {
  /// notification/room/:id/temperatureSensor
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
      return response.status(500).json({ message: 'An error happened' })
    }
  }
  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const responseData = await client.get(`${Constants.baseEntities}`, {
        headers: Constants.headers.fetch,
        params: { type: 'Room' }
      })
      return response.status(responseData.status).json(await responseData.data)
    } catch (error) {
      return response.status(500).json({ message: 'An error happened' })
    }
  }
}

export default new RoomController()
