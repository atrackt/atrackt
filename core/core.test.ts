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
      const setCoreObject = 'setCoreObject'
      const setGlobalFunctionReturn = 'setGlobalFunctionReturn'
      core.global[setCoreFunctionName] = () => {}

      const setCoreSpy = jest.spyOn(core, 'setCore')
      const globalFunctionSpy = jest
        .spyOn(core.global, setCoreFunctionName)
        .mockImplementation(() => setGlobalFunctionReturn)

      core.setCore(setCoreFunctionName, setCoreObject)

      expect(globalFunctionSpy).toBeCalledWith(setCoreObject)
      expect(setCoreSpy).toReturnWith(setGlobalFunctionReturn)
    })
  })

  describe('setConsole', () => {
    context('when handler has been loaded', () => {
      it('should initialize the console', () => {
        const setConsoleReturn = 'setConsoleReturn'
        core.handler = { setConsole: () => {} }

        const setConsoleSpy = jest.spyOn(core, 'setConsole')
        const handlerSetConsoleSpy = jest
          .spyOn(core.handler, 'setConsole')
          .mockImplementation(() => setConsoleReturn)

        core.setConsole('setConsoleArg')

        expect(handlerSetConsoleSpy).toBeCalledWith('setConsoleArg')
        expect(handlerSetConsoleSpy).toReturnWith(setConsoleReturn)
        expect(setConsoleSpy).toReturnWith(setConsoleReturn)
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

      core.setHandler(handlerArg)

      expect(Handler).toBeCalledWith(handlerArg)
      expect(setHandlerSpy).toReturnWith(core.handler)
      expect(core.handler).toBeInstanceOf(Handler)
    })
  })

  describe('.setService', () => {
    const setServiceName = 'Service Name'
    const setServiceArg = {
      name: setServiceName,
    }

    context('with a new service', () => {
      it('should register the service', () => {
        core.services = {}
        const setServiceSpy = jest.spyOn(core, 'setService')

        core.setService(setServiceArg)

        expect(Service).toBeCalledWith(setServiceArg)
        expect(setServiceSpy).toReturnWith(core.services[setServiceName])
        expect(core.services[setServiceName]).toBeInstanceOf(Service)
      })
    })

    context('with an existing service', () => {
      it('should prevent duplicate services', () => {
        core.services = { [setServiceName]: setServiceArg }
        const duplicateService = () => core.setService(setServiceArg)

        expect(duplicateService).toThrow(Failure)
        expect(Service).not.toHaveBeenCalled()
        expect(Object.keys(core.services)).toHaveLength(1)
        expect(core.services[setServiceName]).toBe(setServiceArg)
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
    let globalFunctionSpy
    let serviceFunctionSpy

    beforeEach(() => {
      core.global[setMetadataFunctionName] = () => {}
      core.services[setMetadataServiceName] = {
        [setMetadataFunctionName]: () => {},
      }

      globalFunctionSpy = jest
        .spyOn(core.global, setMetadataFunctionName)
        .mockImplementation(() => setMetadataFunctionReturn)
      serviceFunctionSpy = jest
        .spyOn(core.services[setMetadataServiceName], setMetadataFunctionName)
        .mockImplementation(() => setMetadataFunctionReturn)
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
    const payloadCount = 1
    const optionsCount = 1
    const serviceOneName = 'Service One'
    const serviceTwoName = 'Service Two'
    let globalCallCallbacksSpy
    let serviceOneCallCallbacksSpy
    let serviceOneSubmitSpy
    let serviceTwoCallCallbacksSpy
    let serviceTwoSubmitSpy
    let trackSpy

    beforeEach(() => {
      core.services = {
        [serviceOneName]: {
          name: serviceOneName,
          callCallbacks: () => {},
          submit: () => {},
        },
        [serviceTwoName]: {
          name: serviceTwoName,
          callCallbacks: () => {},
          submit: () => {},
        },
      }

      globalCallCallbacksSpy = jest
        .spyOn(core.global, 'callCallbacks')
        .mockImplementation((order, payload, options) =>
          iterateFunc(payload, options)
        )
      serviceOneCallCallbacksSpy = jest
        .spyOn(core.services[serviceOneName], 'callCallbacks')
        .mockImplementation((order, payload, options) =>
          iterateFunc(payload, options)
        )
      serviceOneSubmitSpy = jest
        .spyOn(core.services[serviceOneName], 'submit')
        .mockImplementation((payload, options) => iterateFunc(payload, options))
      serviceTwoCallCallbacksSpy = jest
        .spyOn(core.services[serviceTwoName], 'callCallbacks')
        .mockImplementation((order, payload, options) =>
          iterateFunc(payload, options)
        )
      serviceTwoSubmitSpy = jest
        .spyOn(core.services[serviceTwoName], 'submit')
        .mockImplementation((payload, options) => iterateFunc(payload, options))
      trackSpy = jest.spyOn(core, 'track')
    })

    context('when no services are passed', () => {
      it('should call global & all service functions', () => {
        core.track(payloadCount, optionsCount)

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
        expect(serviceOneSubmitSpy).toHaveBeenNthCalledWith(1, 3, 3)
        expect(serviceOneCallCallbacksSpy).toHaveBeenNthCalledWith(
          2,
          'after',
          4,
          4
        )
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          1,
          'before',
          5,
          5
        )
        expect(serviceTwoSubmitSpy).toHaveBeenNthCalledWith(1, 6, 6)
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          2,
          'after',
          7,
          7
        )
        expect(globalCallCallbacksSpy).toHaveBeenNthCalledWith(2, 'after', 8, 8)
        expect(trackSpy).toReturnWith({ payload: 9, options: 9 })
      })
    })

    context('when services are passed', () => {
      it('should call global & only passed service functions', () => {
        core.track(payloadCount, optionsCount, serviceTwoName)

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
        expect(serviceTwoSubmitSpy).toHaveBeenNthCalledWith(1, 3, 3)
        expect(serviceTwoCallCallbacksSpy).toHaveBeenNthCalledWith(
          2,
          'after',
          4,
          4
        )
        expect(globalCallCallbacksSpy).toHaveBeenNthCalledWith(2, 'after', 5, 5)
        expect(trackSpy).toReturnWith({ payload: 6, options: 6 })
      })
    })
  })
})
