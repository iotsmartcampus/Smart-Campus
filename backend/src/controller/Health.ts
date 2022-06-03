import { Request, Response } from 'express'

class HealthController {
  public getStatus (request: Request, response:Response): unknown {
    return response.status(200).json({ message: 'is active' })
  }
}

export default new HealthController()
