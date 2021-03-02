// JEST
//
declare var context: jest.Describe

// GLOBAL
//
interface Window {
  Atrackt: object
}

type ServiceNames = string | string[]

type TrackDataFunction = (payload: object, options: object) => TrackDataObject

type TrackDataObject = {
  payload: object
  options: object
}

// CORE OBJECTS
//
type ConsoleObject = {
  [key: string]: any // to allow additional variables and functions for a console
}

type HandlerObject = {
  [key: string]: any // to allow additional variables and functions for a handler
  bindEvent(element: object, eventName: string): object
  getElements(selector: string): object[]
}

type ServiceObject = {
  [key: string]: any // to allow additional variables and functions for a service
  name: string
  submit: TrackDataFunction
}

type CallbackOrdersObject = {
  before: Function[]
  after: Function[]
}

// METADATA OBJECTS
//
type EventSelectorsObject = {
  [key: string]: ServiceNames
}

// type Core {
//   config?: object
// }

// // classes
// interface ConsoleClass {
//   [key: string]: any // to allow additional variables and functions for a handler
//   console: ConsoleConstructor
// }

// interface CoreClass {
//   config?: object
//   global: GlobalClass
//   handler: HandlerClass
//   services: object
// }

// interface GlobalClass {}

// type AtracktConsole {

// }
// type Handler {
//   getElements: (selector: string | string[])
// }

// // type Metadata {
// //   callbacks: CallbackOrdersObject
// // }

// interface HandlerClass {
//   handler: object
//   console: boolean
// }

// interface MetadataClass {
//   // callbacks: CallbackOrdersObject
//   // data: object
//   // eventSelectors: EventSelectorsObject
//   // options: object
//   // payload: object
// }

// type ServiceClass {
//   [key: string]: any
//   name: string
// }

// // constructors
// interface Constructable {
//   new (...args: any): object
// }

// interface ConsoleConstructor extends Constructable {}

// interface CoreConstructor extends Constructable {
//   config?: object
// }

// interface HandlerConstructor extends Constructable {
//   [key: string]: any // to allow additional variables and functions for a handler
//   name: string
//   bindEvent(element: object, eventName: string): typeof element
//   // getElements(selector: string): object[]
//   setEvents(eventSelectors: object, serviceNames: string[]): never
// }

// interface MetadataConstructor extends Constructable {
//   // callbacks: CallbackOrdersObject
// }

// interface ServiceConstructor extends Constructable {
//   [key: string]: any // to allow additional variables and functions for a service
//   name: string
//   service: object
//   submit: (payload: object, options?: object) => typeof payload
// }

// // objects
// type CallbackOrdersObject {
//   before: Function[]
//   after: Function[]
// }

// interface EventSelectorsObject {
//   [key: string]: string | string[]
// }

// interface ServiceConstructor {
//   [key: string]: any
//   name: string
//   submit: (payload: object, options?: object) => object
// }
