interface ServiceConstructor {
  name: string
  send: (payload: object, options?: object) => object
}

export default class Service {
  constructor(service: ServiceConstructor) {
    console.log('Service constructor', service.name, service.send)
  }
}
