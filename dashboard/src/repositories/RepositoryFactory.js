import authentication_and_register from './AuthenticationAndRegisterRepository'
import sendCommand from './CommandRepository'
import roomRepository from './RoomRepository'
import blockRepository from './BlockRepository'
const repositories = {
    authentication: authentication_and_register,
    sendCommand,
    roomRepository,
    blockRepository,
}

export const RepositoryFactory={
    get:name=>repositories[name]
}