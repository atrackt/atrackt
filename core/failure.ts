export default class Failure extends Error {
  name: string

  constructor(message: string) {
    super(message)
    this.name = 'Atrackt Error'
  }
}
