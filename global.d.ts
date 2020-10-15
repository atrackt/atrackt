// JEST
declare var context: jest.Describe

interface ServiceConstructor {
  name: string
  send: (payload: object, options?: object) => object
  [key: string]: any
}
