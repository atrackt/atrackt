import Metadata from '@atrackt/core/metadata'
import Service from '@atrackt/core/service'
const Core = jest.requireActual('@atrackt/core/core').default

describe('Core', () => {
  let core

  it('should extend Metadata', () => {
    expect(Core.prototype).toBeInstanceOf(Metadata)
  })

  describe('constructor', () => {
    context('without passing a config', () => {
      it('should set defaults', () => {
        core = new Core()

        expect(core.console).toBe(false)
        expect(core.services).toEqual({})
        expect(core.config).toEqual({})
      })
    })

    context('when passing a config', () => {
      it('should set a default', () => {
        const coreConfig = {
          custom: 'config',
        }
        core = new Core(coreConfig)

        expect(core.console).toBe(false)
        expect(core.services).toEqual({})
        expect(core.config).toEqual(coreConfig)
      })
    })
  })

  // instance methods
  describe('.enableConsole', () => {
    it('should set console to true', () => {
      core = Object.create(Core.prototype)
      core.enableConsole()

      expect(core.console).toBe(true)
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

  describe('.track', () => {})

  // class methods
  describe('::getFunctionArguments', () => {
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

  describe('::getFunctionReturn', () => {
    it('should return an array of accepted argument names', () => {
      // with implicit returns
      expect(Core.getFunctionReturn(() => false)).toEqual('false')

      // with a single line return
      expect(
        Core.getFunctionReturn(() => {
          return true
        })
      ).toEqual('true')

      // with a multi-line return
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
