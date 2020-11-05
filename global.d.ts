// jest
declare var context: jest.Describe

// global
interface Window {
  Atrackt: any
}

// constructors
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

// api
interface EventCriteria {
  eventCriteria: object
}
