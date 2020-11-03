import * as modules from '@atrackt/core'
import Service from '@atrackt/core/service'

jest.mock('@atrackt/core/service')

const Atrackt = modules.default
const Core = modules.Core

describe(Atrackt, () => {
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

describe(Core, () => {
  let core

  describe('constructor', () => {
    beforeAll(() => {
      core = new Core()
    })

    it('should create all defaults', () => {
      expect(core.console).toBe(false)
      expect(core.services).toEqual({})
    })

    context('without passing a configuration', () => {
      beforeAll(() => {
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

      beforeAll(() => {
        core = new Core(coreConfig)
      })

      it('should set a default', () => {
        expect(core.config).toEqual(coreConfig)
      })
    })
  })

  describe('instance methods', () => {
    describe('enableConsole', () => {
      beforeAll(() => {
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

  describe('class methods', () => {
    describe('getFunctionArguments', () => {
      it('should return an array of accepted argument names', () => {
        // with no arguments
        expect(Core.getFunctionArguments(() => {})).toEqual([])

        // with a single argument
        expect(Core.getFunctionArguments((singleArg) => {})).toEqual([
          'singleArg',
        ])

        // with a multiple arguments
        expect(Core.getFunctionArguments((arg1, arg2) => {})).toEqual([
          'arg1',
          'arg2',
        ])

        // with multiple arguments and defaults
        expect(
          Core.getFunctionArguments(
            (defaultArg1 = 'foo', defaultArg2 = 'bar') => {}
          )
        ).toEqual(['defaultArg1', 'defaultArg2'])
      })
    })

    describe('getFunctionReturn', () => {
      it('should return an array of accepted argument names', () => {
        // returns a single line object
        expect(
          Core.getFunctionReturn(() => {
            return true
          })
        ).toEqual('true')

        // returns a multi-line object
        expect(
          Core.getFunctionReturn(() => {
            return {
              foo: true,
            }
          })
        ).toEqual('{foo:true}')
      })
    })
  })
})
