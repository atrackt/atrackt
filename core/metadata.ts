export default class Metadata {
  callbacks: object // callbacks to run before/after submitting payload
  options: object // options to be passed to services
  payload: object // additional data to include with payload

  constructor() {
    this.callbacks = {
      before: [],
      after: [],
    }
    this.options = {}
    this.payload = {}
  }
}
