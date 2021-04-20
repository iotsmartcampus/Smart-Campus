import authentication_and_register from './AuthenticationAndRegisterRepository'

const repositories = {
    authentication: authentication_and_register
}

export const RepositoryFactory={
    get:name=>repositories[name]
}