import { Request, Response } from 'express'
import SocketIO from 'socket.io'

class NotificationController {
  public io:SocketIO.Server
  constructor (io: SocketIO.Server) {
    this.io = io
  }

  async notifyChangeTemperatureAndHumidityRoomid (request: Request, response:Response): Promise<unknown> {
    const { id } = request.params
    const { data } = request.body
    // TODO: Add temperature type
    try {
      this.io.sockets.emit(`${id}_temperature_humildity`, { ...data[0], id })
    } catch (error) {
      console.log(error)
    } finally {

    }
    return response.status(200).json({})
  }

  async notifyChangeEletricCurrent (request: Request, response:Response): Promise<unknown> {
    const { id } = request.params
    const { data } = request.body

    // const dataValue = data[0].current.value
    // const arraySubject = dataValue.split(" ")
    // const absoluteValue = arraySubject.map((item)=>{Math.abs(item);})
    // const maxValue = Math.max(...absoluteValue);
    // const amphareValue = (((maxValue*0.000015625)*10)/0.5)
    // const amphareArrayChart = arraySubject.map(item=>(((item*0.000015625)*10)/0.5))
    // const potency = amphareValue * 220 / 1000

    try {
      this.io.sockets.emit(`${id}_temperature_humildity`, { ...data[0], id })
    } catch (error) {
      console.log(error)
    } finally {

    }
    return response.status(200).json({})
  }

  async notifyChangeConsume (request: Request, response:Response): Promise<unknown> {
    const { id } = request.params
    const { data } = request.body

    try {
      this.io.sockets.emit(`${id}_temperature_humildity`, { ...data[0], id })
    } catch (error) {
      console.log(error)
    }
    return response.status(200).json({})
  }
}

export default NotificationController
