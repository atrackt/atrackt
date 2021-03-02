import Failure from '@atrackt/core/failure'
import Global from '@atrackt/core/global'
import Handler from '@atrackt/core/handler'
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
  describe('setCore', () => {
    it('should call the provided function with arguments', () => {
      const setCoreFunctionName = 'setCoreFunctionName'
      const setCoreFunctionReturn = 'setCoreFunctionReturn'
      const setCoreObject = 'setCoreObject'
      core.global[setCoreFunctionName] = () => {}

      const globalFunctionSpy = jest.spyOn(core.global, setCoreFunctionName)
      globalFunctionSpy.mockImplementation(() => setCoreFunctionReturn)

      const setCoreReturn = core.setCore(setCoreFunctionName, setCoreObject)

      expect(globalFunctionSpy).toHaveBeenNthCalledWith(1, setCoreObject)
      expect(setCoreReturn).toEqual(setCoreFunctionReturn)
    })
  })

  describe('setConsole', () => {
    context('when handler has been loaded', () => {
      it('should initialize the console', () => {
        core.handler = { setConsole: () => {} }
        const setConsoleSpy = jest.spyOn(core.handler, 'setConsole')
        setConsoleSpy.mockImplementation(() => 'setConsoleReturn')

        core.setConsole('setConsoleArg')

        expect(setConsoleSpy).toBeCalledWith('setConsoleArg')
        expect(setConsoleSpy).toReturnWith('setConsoleReturn')
      })
    })

    context('when handler has not been loaded', () => {
      it('should initialize the console', () => {
        core.handler = undefined
        const throwError = () => core.setConsole()

        expect(throwError).toThrow(Failure)
      })
    })
  })

  describe('setHandler', () => {
    it('should initialize Handler', () => {
      core.handler = undefined
      const handlerArg = 'handlerArg'

      const setHandlerSpy = jest.spyOn(core, 'setHandler')

      const handlerReturn = core.setHandler(handlerArg)

      expect(Handler).toBeCalledWith(handlerArg)
      expect(setHandlerSpy).toReturnWith(handlerReturn)
      expect(handlerReturn).toBeInstanceOf(Handler)
      expect(core.handler).toBe(handlerReturn)
    })
  })

  describe('.setService', () => {
    const setServiceArg = {
      name: 'serviceName',
    }

    context('with a new service', () => {
      beforeEach(() => {
        core.services = {}
      })

      it('should register the service', () => {
        const setServiceReturn = core.setService(setServiceArg)

        expect(Service).toHaveBeenNthCalledWith(1, setServiceArg)
        expect(core.services['serviceName']).toBeInstanceOf(Service)
        expect(core.services['serviceName']).toBe(setServiceReturn)
      })
    })

    context('with an existing service', () => {
      beforeEach(() => {
        core.services = { serviceName: setServiceArg }
      })

      it('should prevent duplicate services', () => {
        const duplicateService = () => core.setService(setServiceArg)

        expect(duplicateService).toThrow(Failure)
        expect(Service).not.toHaveBeenCalled()
        expect(Object.entries(core.services)).toHaveLength(1)
        expect(core.services.serviceName.name).toEqual('serviceName')
      })
    })
  })

  // METADATA METHODS
  //
  describe('setMetaData', () => {
    const setMetadataFunctionName = 'setMetadataFunctionName'
    const setMetadataFunctionReturn = 'setMetadataFunctionReturn'
    const setMetadataObject = 'setMetadataObject'
    const setMetadataServiceName = 'Service Name'
    const globalFunction = () => {}
    const serviceFunction = () => {}
    let globalFunctionSpy
    let serviceFunctionSpy

    beforeEach(() => {
      core.global[setMetadataFunctionName] = globalFunction
      core.services[setMetadataServiceName] = {
        [setMetadataFunctionName]: serviceFunction,
      }

      globalFunctionSpy = jest.spyOn(core.global, setMetadataFunctionName)
      serviceFunctionSpy = jest.spyOn(
        core.services[setMetadataServiceName],
        setMetadataFunctionName
      )
      globalFunctionSpy.mockImplementation(() => setMetadataFunctionReturn)
      serviceFunctionSpy.mockImplementation(() => setMetadataFunctionReturn)
    })

    context('when no services are passed', () => {
      it('should call the provided function with arguments', () => {
        const setMetadataReturn = core.setMetadata(
          setMetadataFunctionName,
          setMetadataObject
        )

        expect(globalFunctionSpy).toHaveBeenNthCalledWith(1, setMetadataObject)
        expect(serviceFunctionSpy).not.toHaveBeenCalled()
        expect(setMetadataReturn).toEqual(setMetadataFunctionReturn)
      })
    })

    context('when services are passed', () => {
      it('should call the provided function with arguments', () => {
        const setMetadataReturn = core.setMetadata(
          setMetadataFunctionName,
          setMetadataObject,
          setMetadataServiceName
        )

        expect(globalFunctionSpy).not.toHaveBeenCalled()
        expect(serviceFunctionSpy).toHaveBeenNthCalledWith(1, setMetadataObject)
        expect(setMetadataReturn).toEqual(setMetadataFunctionReturn)
      })
    })
  })

  // API METHODS
  //
  describe('track', () => {
    const iterateFunc = (payload, options) => {
      payload++
      options++

      return {
        payload,
        options,
      }
    }
    const trackPayload = 1
    const trackOptions = 1
    const serviceOneName = 'Service One'
    const serviceTwoName = 'Service Two'
    let globalCallCallbacksSpy
    let serviceOneCallCallbacksSpy
    let serviceOneSubmitSpy
    let serviceTwoCallCallbacksSpy
    let serviceTwoSubmitSpy

    beforeEach(() => {
      core.services = {
        // @ts-ignore
        [serviceOneName]: new Service(),
        // @ts-ignore
        [serviceTwoName]: new Service(),
      }

      globalCallCallbacksSpy = jest.spyOn(core.global, 'callCallbacks')
      globalCallCallbacksSpy.mockImplementation((order, payload, options) =>
        iterateFunc(payload, options)
      )
      serviceOneCallCallbacksSpy = jest.spyOn(
        core.services[serviceOneName],
        'callCallbacks'
      )
      serviceOneCallCallbacksSpy.mockImplementation((order, payload, options) =>
        iterateFunc(payload, options)
      )
      serviceOneSubmitSpy = jest.spyOn(core.services[serviceOneName], 'submit')
      serviceTwoCallCallbacksSpy = jest.spyOn(
        core.services[serviceTwoName],
        'callCallbacks'
      )
      serviceTwoCallCallbacksSpy.mockImplementation((order, payload, options) =>
        iterateFunc(payload, options)
      )
      serviceTwoSubmitSpy = jest.spyOn(core.services[serviceTwoName], 'submit')
    })

    context('when no services are passed', () => {
      it('should should call global & all service functions', () => {
        core.track(trackPayload, trackOptions)

        expect(globalCallCallbacksSpy).toHaveBeenNthCalledWith(
          1,
          'before',
          1,
          1
        )
        expect(serviceOneCallCallbacksSpy).toHaveBeenNthCalledWith(
          1,
          'before',
          2,
          2
        )
        expect(serviceOneSubmitSpy).toBeCalledWith()
        expect(serviceOneCallCallbacksSpy).toHaveBeenNthCalledWith(
          2,
          'after',
          3,
          3
        )
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          1,
          'before',
          4,
          4
        )
        expect(serviceTwoSubmitSpy).toBeCalledWith()
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          2,
          'after',
          5,
          5
        )
        expect(globalCallCallbacksSpy).toHaveBeenNthCalledWith(2, 'after', 6, 6)
      })
    })

    context('when services are passed', () => {
      it('should should call global & only passed service functions', () => {
        core.track(trackPayload, trackOptions, serviceTwoName)

        expect(globalCallCallbacksSpy).toHaveBeenNthCalledWith(
          1,
          'before',
          1,
          1
        )
        expect(serviceOneCallCallbacksSpy).not.toHaveBeenCalled()
        expect(serviceOneSubmitSpy).not.toHaveBeenCalled()
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          1,
          'before',
          2,
          2
        )
        expect(serviceTwoSubmitSpy).toBeCalledWith()
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          2,
          'after',
          3,
          3
        )
        expect(globalCallCallbacksSpy).toHaveBeenNthCalledWith(2, 'after', 4, 4)
      })
    })
  })
})
