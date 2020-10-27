// jest
declare var context: jest.Describe

interface Window {
  Atrackt: any
}

// atrackt
interface CoreConstructor {
  config?: object
}

interface HandlerConstructor extends CoreConstructor {
  [key: string]: any
  name: string
  setEvents: object
}

interface ServiceConstructor {
  [key: string]: any
  name: string
  submit: (payload: object, options?: object) => object
}
