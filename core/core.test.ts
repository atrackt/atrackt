import Failure from '@atrackt/core/failure'
import Global from '@atrackt/core/global'
import Service from '@atrackt/core/service'

const Core = jest.requireActual('@atrackt/core/core').default

describe(Core, () => {
  let core

  beforeEach(() => {
    core = new Core()
  })

  describe('constructor', () => {
    it('should set defaults', () => {
      expect(core.config).toEqual({})
      expect(core.global).toBeInstanceOf(Global)
      expect(core.handler).toBeUndefined()
      expect(core.services).toEqual({})
    })
  })

  // CORE METHODS
  //
  describe('setConsole', () => {
    context('when handler has been loaded', () => {
      it('should initialize the console', () => {
        let setConsoleSpy = jest.spyOn(core, 'handler')
        setConsoleSpy.mockImplementation(() => 'setConsoleReturn')
        // core.handler = { setConsole: setConsoleSpy }
        core.setConsole('setConsoleArg')

        expect(setConsoleSpy).toBeCalledWith('setConsoleArg')
        expect(setConsoleSpy).toEqual('setConsoleReturn')
      })
    })

    context('when handler has not been loaded', () => {
      it('should initialize the console', () => {
        core.handler = undefined
        const throwError = () => core.setConsole('spec console')

        expect(throwError).toThrow(Failure)
      })
    })
  })

  describe('setHandler', () => {
    it('should initialize a handler', () => {
      //
    })
  })

  describe('.setService', () => {
    let setServiceArgServiceObject
    let setServiceReturn

    beforeEach(() => {
      setServiceArgServiceObject = {
        name: 'Test Service',
      }
      core = Object.create(Core.prototype)
      core.services = {}
      setServiceReturn = core.setService(setServiceArgServiceObject)
    })

    context('with a new service', () => {
      it('should register the service', () => {
        expect(Service).toBeCalledTimes(1)
        expect(core.services['Test Service']).toBeInstanceOf(Service)
        expect(setServiceReturn).toBeInstanceOf(Service)
      })
    })

    context('with a service already registered', () => {
      it('should prevent duplicate services', () => {
        const duplicateService = () =>
          core.setService(setServiceArgServiceObject)

        expect(duplicateService).toThrow('Test Service')
        expect(Service).toHaveBeenNthCalledWith(1, setServiceArgServiceObject)
        expect(Service).not.toBeCalledTimes(2)
        expect(Object.entries(core.services)).toHaveLength(1)
        expect(setServiceReturn).toBeInstanceOf(Service)
      })
    })
  })

  describe('setGlobal', () => {
    it('should ', () => {
      //
    })
  })

  // METADATA METHODS
  //
  describe('setCallbacks', () => {
    it('should ', () => {
      //
    })
  })

  describe('setData', () => {
    it('should ', () => {
      //
    })
  })

  describe('setEvents', () => {
    it('should ', () => {
      //
    })
  })

  describe('setOptions', () => {
    it('should ', () => {
      //
    })
  })

  // API METHODS
  //
  describe('.callGlobalOrServices', () => {
    let globalFunctionMock
    let serviceFunctionMock

    beforeEach(() => {
      globalFunctionMock = () => {}
      globalFunctionMock.apply = jest.spyOn(core, 'handler')
      serviceFunctionMock = () => {}
      serviceFunctionMock.apply = jest.spyOn(core, 'handler')
    })

    context('when no services passes', () => {
      beforeEach(() => {
        core.global.functionName = globalFunctionMock
        core.services = {}
        core.callGlobalOrServices('functionName', [], 'globalArgs')
      })

      it('should call the given method', () => {
        expect(core.global.functionName.apply).toHaveBeenNthCalledWith(
          1,
          globalFunctionMock,
          ['globalArgs']
        )
        expect(core.global.functionName.apply).toHaveBeenNthCalledWith(
          1,
          globalFunctionMock,
          ['globalArgs']
        )
      })
    })

    context('when passing services', () => {
      beforeEach(() => {
        core.global.functionName = globalFunctionMock
        core.services = {
          serviceA: {
            functionName: serviceFunctionMock,
          },
          serviceB: {
            functionName: serviceFunctionMock,
          },
        }
      })

      it('should call the given method', () => {
        core.callGlobalOrServices(
          'functionName',
          ['serviceA', 'serviceB'],
          'serviceArgs'
        )

        expect(
          core.services.serviceA.functionName.apply
        ).toHaveBeenNthCalledWith(1, serviceFunctionMock, ['serviceArgs'])

        expect(
          core.services.serviceB.functionName.apply
        ).toHaveBeenNthCalledWith(2, serviceFunctionMock, ['serviceArgs'])

        expect(core.global.functionName.apply).not.toHaveBeenCalled()
      })
    })
  })

  describe('setMetaData', () => {
    it('should ', () => {
      //
    })
  })

  describe('track', () => {
    it('should ', () => {
      //
    })
  })
})
