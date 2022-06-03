import { Request, Response } from 'express'
import resourceClient from '../client/ResourceClient'
import {
  defaultDevices,
  mappedDevicesAndCommands,
  aircontionerCommandsValues,
  headers
} from '../util/Constans'

type SendCommandPayload = {
  type: string
  id: string
  command: string
}
const checkPayloadType = (type: string) => {
  return defaultDevices().find((item) => item === type)
}
const checkValidCommand = (command: string, type: string) => {
  switch (type) {
    case 'aircontioner':
      return ['on', 'off', 'up', 'down'].find((item) => command === item)
    case 'lamp':
      return ['on', 'off'].find((item) => item === command)
    case 'camera':
      return ['on', 'off'].find((item) => item === command)
    case 'projector':
      return ['on', 'off'].find((item) => item === command)
    case 'InfraredDevice':
      return ['on', 'off', 'up', 'down'].find((item) => command === item)
    case 'RelayDevice':
        return ['on', 'off'].find((item) => item === command)
    default:
      return null
  }
}
const mapDevicesType = (type: string) => {
  switch (type) {
    case 'aircontioner':
      return 'InfraredDevice'
    case 'lamp':
      return 'RelayDevice'
    case 'camera':
      return 'Camera'
    case 'InfraredDevice':
      return 'InfraredDevice'
    case 'RelayDevice':
      return 'RelayDevice'
    default:
      return null
  }
}

const getAirContionerValues = (command: string) => {
  switch (command) {
    case 'on':
      return aircontionerCommandsValues.on
    case 'off':
      return aircontionerCommandsValues.off
    case 'up':
      return aircontionerCommandsValues.up
    case 'off':
      return aircontionerCommandsValues.down
  }
}

const mappedEntity = (type: string, id: string, command: string) => {
  const mappedType = mapDevicesType(type)

  switch (mappedType) {
    case 'InfraredDevice':
      return {
        type: mappedType,
        id,
        infrared: { type: 'command', value: getAirContionerValues(command) }
      }
    case 'RelayDevice':
      const commandValueRelayDevice =
        command === 'on'
          ? { on: { type: 'command', value: '' } }
          : { off: { type: 'command', value: '' } }
      return {
        type: mappedType,
        id: id,
        ...commandValueRelayDevice
      }
    case 'Camera':
      const commandValueCamera =
        command === 'ring'
          ? { ring: { type: 'command', value: '' } }
          : command === 'flash'
          ? { flash: { type: 'command', value: '' } }
          : { print: { type: 'command', value: '' } }
      return {
        type: mappedType,
        id: id,
        ...commandValueCamera
      }
  }
}

export const createPayload = ({ command, id, type }: SendCommandPayload) => {
  const entity = mappedEntity(type, id, command)

  return { actionType: 'update', entities: [entity] }
}

class SendCommandController {
  async send(req: Request, res: Response) {
    // Analyse the payload
    const body: SendCommandPayload = req.body
    if (
      !checkPayloadType(body.type) &&
      !checkValidCommand(body.command, body.type)
    )
      return res.status(404).json({ message: 'Not found!' })

    // check if the payload is valid
    const payload = createPayload(body)
    const response = await resourceClient.post(
      `${process.env.RESOURCE_SERVER!!}/v2/op/update`,
      payload,
      {
        headers: headers.save
      }
    )
    return res.status(response.status)
    // Send a post request to context broker
  }
}

export default new SendCommandController()
