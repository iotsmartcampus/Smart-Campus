import { Request, Response } from 'express'
import { Infrared, SendCommand } from '../util/Interfaces'
import axios from 'axios'
import Constants from '../util/Constans'

class GeneralController {
  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const responseData = await (
        await axios.get(Constants.baseEntities, {
          headers: Constants.headers.fetch
        })
      ).data
      //TODO: Add response validation
      return response.status(200).json(responseData)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'An error happed' })
    }
  }
}

export default new GeneralController()
