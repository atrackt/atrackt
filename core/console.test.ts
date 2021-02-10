// import Atrackt from '@atrackt/core'
// const Console = jest.requireActual('@atrackt/core/console').default

// describe('Console', () => {
//   let consoleInstance

//   // it('should extend Atrackt', () => {
//   //   expect(Console.prototype).toBeInstanceOf(Atrackt)
//   // })

//   describe('constructor', () => {
//     let enableConsoleSpy
//     let setupConsoleSpy
//     let validateSpy

//     beforeEach(() => {
//       window.Atrackt = {
//         enableConsole: () => {},
//       }
//       enableConsoleSpy = jest
//         .spyOn(window.Atrackt, 'enableConsole')
//         .mockImplementation()
//       setupConsoleSpy = jest
//         .spyOn(Console.prototype, 'setupConsole')
//         .mockImplementation()
//       validateSpy = jest.spyOn(Console.prototype, 'validate')
//     })

//     context('when conditions are valid', () => {
//       it('should initialize the console', () => {
//         validateSpy.mockImplementation(() => true)
//         new Console()

//         expect(validateSpy).toBeCalledTimes(1)
//         expect(enableConsoleSpy).toBeCalledTimes(1)
//         expect(setupConsoleSpy).toBeCalledTimes(1)
//       })
//     })

//     context('when conditions are invalid', () => {
//       it('should not initialize the console', () => {
//         validateSpy.mockImplementation(() => false)
//         new Console()

//         expect(validateSpy).toBeCalledTimes(1)
//         expect(enableConsoleSpy).not.toBeCalled()
//         expect(setupConsoleSpy).not.toBeCalled()
//       })
//     })
//   })

//   describe('.validate', () => {
//     let getItemSpy
//     let searchIncludesSpy
//     let validateError
//     let validateReturn
//     let windowSpy

//     beforeEach(() => {
//       consoleInstance = Object.create(Console.prototype)
//       getItemSpy = jest.fn()
//       searchIncludesSpy = jest.fn()
//       validateError = consoleInstance.validate
//       windowSpy = jest.spyOn(global, 'window', 'get')
//     })

//     afterEach(() => {
//       getItemSpy.mockRestore()
//       searchIncludesSpy.mockRestore()
//     })

//     context('when in a browser', () => {
//       context('when a handler is loaded', () => {
//         beforeEach(() => {
//           windowSpy.mockImplementation(() => ({
//             Atrackt: {},
//             location: {
//               search: {
//                 includes: searchIncludesSpy,
//               },
//             },
//             localStorage: {
//               getItem: getItemSpy,
//             },
//           }))
//         })

//         context('when console is disabled', () => {
//           it('should return false', () => {
//             validateReturn = consoleInstance.validate()

//             expect(getItemSpy).toBeCalledTimes(1)
//             expect(searchIncludesSpy).toBeCalledTimes(1)
//             expect(validateReturn).toEqual(false)
//           })
//         })

//         context('when console is enabled in the url', () => {
//           it('should return true', () => {
//             searchIncludesSpy.mockImplementation(() => true)
//             validateReturn = consoleInstance.validate()

//             expect(searchIncludesSpy).toBeCalledTimes(1)
//             expect(getItemSpy).not.toBeCalled()
//             expect(validateReturn).toEqual(true)
//           })
//         })

//         context('when console is enabled in local storage', () => {
//           it('should return true', () => {
//             getItemSpy.mockImplementation(() => 'true')
//             validateReturn = consoleInstance.validate()

//             expect(searchIncludesSpy).toBeCalledTimes(1)
//             expect(getItemSpy).toBeCalledTimes(1)
//             expect(validateReturn).toEqual(true)
//           })
//         })
//       })

//       context('when a handler is not loaded', () => {
//         it('should throw an error', () => {
//           windowSpy.mockImplementation(() => true)

//           expect(searchIncludesSpy).not.toBeCalled()
//           expect(getItemSpy).not.toBeCalled()
//           expect(validateError).toThrow('handler')
//         })
//       })
//     })

//     context('when not in a browser', () => {
//       it('should throw an error', () => {
//         windowSpy.mockImplementation(() => undefined)

//         expect(searchIncludesSpy).not.toBeCalled()
//         expect(getItemSpy).not.toBeCalled()
//         expect(validateError).toThrow('browser')
//       })
//     })
//   })

//   describe('.setupConsole', () => {})
// })
