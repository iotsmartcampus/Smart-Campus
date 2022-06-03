import axios from 'axios'

const resourceClient = axios.create({
  baseURL: process.env.RESOURCE_SERVER
})

export default resourceClient
