import Core from '@atrackt/core'

export default class Handler extends Core {
  constructor(service: { name: string }) {
    super()
    console.log('Handler constructor', service.name)
  }
}
