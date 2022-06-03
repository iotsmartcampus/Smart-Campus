import { Request, response, Response, Router } from 'express'
import HealthController from './controller/Health'
import Block from './controller/Block'
import Room from './controller/Room'
import General from './controller/General'
import Nofication from './controller/Notifcation'
import SendCommandController from './controller/SendCommandController'
const router = Router()

//Block
router.get('/block/:id/rooms', Block.getAllRoomsByBlockId)
router.get('/block/:id', Block.getOne)
router.get('/block', Block.getAll)

//Room
router.get('/room/:id', Room.getOne)
router.get('/room', Room.getAll)

//Notification
router.get('/room', Room.getAll)

//SendCommand
router.post('/sendCommand', SendCommandController.send)

//GetAllEntities
router.get('/entities', General.getAll)
//Health
router.get('/check', HealthController.getStatus)
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'version 1' })
})

module.exports = function routerHandler(io: any) {
  const notificationController = new Nofication(io)
  router.post(
    '/notification/room/:id/temperatureSensor',
    notificationController.notifyChangeTemperatureAndHumidityRoomid
  )
  return router
}
