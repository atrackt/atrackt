import * as modules from '@atrackt/core'
import Service from '@atrackt/core/service'

jest.mock('@atrackt/core/service')

const Atrackt = modules.default
const Core = modules.Core

describe('Atrackt', () => {
  let atrackt

  describe('constructor', () => {
    beforeAll(() => {
      // @ts-ignore
      modules.Core = jest.fn(() => {
        return {
          enableConsole: () => {},
          setService: () => {},
          track: () => {},
        }
      })
    })

    beforeEach(() => {
      atrackt = new Atrackt()
    })

    afterAll(() => {
      // @ts-ignore
      modules.Core.mockRestore()
    })

    it('should expose the api', () => {
      // core methods should all be bound
      expect(atrackt.setService.name).toEqual('bound setService')
      expect(atrackt.track.name).toEqual('bound track')

      // handler api methods should be undefined
      expect(atrackt.enableConsole).toBeUndefined()
    })

    it('should create a core instance', () => {
      expect(modules.Core).toBeCalledTimes(1)
    })

    it('should expose atrackt global', () => {
      expect(globalThis.Atrackt).toBe(atrackt)
    })

    context('when initialized from a handler', () => {
      let HandlerClass

      beforeAll(() => {
        HandlerClass = class Handler extends Atrackt {}
      })

      beforeEach(() => {
        atrackt = new HandlerClass()
      })

      it('should expose the handler api', () => {
        expect(atrackt.enableConsole.name).toEqual('bound enableConsole')
      })
    })
  })
})

describe('Core', () => {
  let core

  describe('constructor', () => {
    beforeEach(() => {
      core = new Core()
    })

    it('should create all defaults', () => {
      expect(core.console).toBe(false)
      expect(core.services).toEqual({})
    })

    context('without passing a configuration', () => {
      beforeEach(() => {
        core = new Core()
      })

      it('should set a default', () => {
        expect(core.config).toEqual({})
      })
    })

    context('with a custom configuration', () => {
      const coreConfig = {
        custom: 'config',
      }

      beforeEach(() => {
        core = new Core(coreConfig)
      })

      it('should set a default', () => {
        expect(core.config).toEqual(coreConfig)
      })
    })
  })

  describe('enableConsole', () => {
    beforeEach(() => {
      core = new Core()
      core.enableConsole()
    })

    it('should set console to true', () => {
      expect(core.console).toBe(true)
    })
  })

  describe('setService', () => {
    const serviceObject = {
      name: 'Test Service',
    }

    beforeAll(() => {
      // @ts-ignore
      Service.prototype.constructor.mockImplementation(() => {})
    })

    beforeEach(() => {
      core = new Core()
    })

    afterEach(() => {
      core.services = {}
    })

    context('with a new service', () => {
      it('should register the service', () => {
        core.setService(serviceObject)

        expect(core.services['Test Service']).toBeInstanceOf(Service)
        expect(Service).toBeCalledTimes(1)
      })
    })

    context('with a service already registered', () => {
      it('should prevent duplicate services', () => {
        core.setService(serviceObject)

        const duplicateService = () => {
          core.setService(serviceObject)
        }

        expect(duplicateService).toThrow()
        expect(Object.entries(core.services)).toHaveLength(1)
        expect(Service).toHaveBeenNthCalledWith(1, serviceObject)
        expect(Service).not.toHaveBeenCalledTimes(2)
      })
    })
  })
})
