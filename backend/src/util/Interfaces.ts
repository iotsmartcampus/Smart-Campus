export type Camera = {
  type: string
  id: string
  print?: {
    type: string
    value: string
  }
  flash?: {
    type: string
    value: string
  }
  ring?: {
    type: string
    value: string
  }
}
export type RelayDevice = {
  type: string
  id: string
  on?: {
    type: string
    value: string
  }
  off?: {
    type: string
    value: string
  }
}

export type Infrared = {
  type: string
  id: string
  infrared: {
    type: string
    value: string
  }
}

export type SendCommand<T> = {
  actionType?: string
  entities: T[]
}

export type Room = {
  id: string
  type: string
  name: string
  refBlock: string
}

export type TemperatureSensor = {
  id: string
  type: string
  humidity: string
  refRoom: string
  temperature: string
  title: string
}
