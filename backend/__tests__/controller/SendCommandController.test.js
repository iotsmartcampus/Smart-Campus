import SendCommandController, {
  createPayload
} from '../../src/controller/SendCommandController'
import MockAdapter from 'axios-mock-adapter'
import resourceClient from '../../src/client/ResourceClient'
import { aircontionerCommandsValues } from '../../src/util/Constans'
require('dotenv').config()
const url = process.env.RESOURCE_SERVER + '/v2/op/update'

describe('Send a command to context broker', () => {
  describe('integration tests', () => {
    it('Send a command with valid payload should return 200', async () => {
      const mockRequest = {
        body: { type: 'aircontioner', id: 'mockId', command: 'off' }
      }
      const mockResponse = {
        status: function (number) {
          return number
        }
      }

      var mock = new MockAdapter(resourceClient)
      mock.onPost(url).reply(200)

      const response = await SendCommandController.send(
        mockRequest,
        mockResponse
      )
      expect(response).toBe(200)
    })
    it('Send a command with non valid type field should return 404', async () => {
      const mockRequest = {
        body: { type: 'mockType', id: 'mockId', command: 'off' }
      }
      const receveidValue = {
        status: null,
        body: null
      }
      const mockResponse = {
        status: jest.fn().mockImplementation((statusReceived) => {
          receveidValue.status = statusReceived
          return mockResponse
        }),
        json: jest.fn().mockImplementation((bodyReceived) => {
          receveidValue.body = bodyReceived
          return mockResponse
        })
      }

      var mock = new MockAdapter(resourceClient)
      mock.onPost(url).reply(404)

      await SendCommandController.send(mockRequest, mockResponse)

      expect(receveidValue.status).toBe(404)
    })

    it('Send a command with non valid command field should return 404', async () => {
      const mockRequest = {
        body: { type: 'airconditioner', id: 'mockId', command: 'mockCommand' }
      }
      const receveidValue = {
        status: null,
        body: null
      }
      const mockResponse = {
        status: jest.fn().mockImplementation((statusReceived) => {
          receveidValue.status = statusReceived
          return mockResponse
        }),
        json: jest.fn().mockImplementation((bodyReceived) => {
          receveidValue.body = bodyReceived
          return mockResponse
        })
      }

      await SendCommandController.send(mockRequest, mockResponse)

      expect(receveidValue.status).toBe(404)
    })
  })

  describe('functional tests', () => {
    it('call createPayload function with valids input should return a valid payload', () => {
      const validInput = { type: 'aircontioner', id: 'mockID', command: 'on' }
      const payload = createPayload(validInput)
      const expectPayload = {
        actionType: 'update',
        entities: [
          {
            type: 'InfraredDevice',
            id: 'mockID',
            infrared: { type: 'command', value: aircontionerCommandsValues.off }
          }
        ]
      }
      expect(payload.entities[0].type).toBe(expectPayload.entities[0].type)
      expect(payload.entities[0].infrared.type).toEqual(
        expectPayload.entities[0].infrared.type
      )
    })
  })
})
