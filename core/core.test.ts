import Service from '@atrackt/core/service'
const Core = jest.requireActual('@atrackt/core/core').default

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

    context('without passing a config', () => {
      it('should set a default', () => {
        expect(core.config).toEqual({})
      })
    })

    context('when passing a config', () => {
      it('should set a default', () => {
        const coreConfig = {
          custom: 'config',
        }
        core = new Core(coreConfig)

        expect(core.config).toEqual(coreConfig)
      })
    })
  })

  describe('instance methods', () => {
    describe('enableConsole', () => {
      it('should set console to true', () => {
        core = new Core()
        core.enableConsole()

        expect(core.console).toBe(true)
      })
    })

    describe('setService', () => {
      let setServiceArgServiceObject
      let setServiceReturn

      beforeEach(() => {
        setServiceArgServiceObject = {
          name: 'Test Service',
        }
        core = new Core()
        setServiceReturn = core.setService(setServiceArgServiceObject)
      })

      afterEach(() => {
        core.services = {}
      })

      context('with a new service', () => {
        it('should register the service', () => {
          expect(setServiceReturn).toBeInstanceOf(Service)
          expect(core.services['Test Service']).toBeInstanceOf(Service)
          expect(Service).toBeCalledTimes(1)
        })
      })

      context('with a service already registered', () => {
        it('should prevent duplicate services', () => {
          const duplicateService = () => {
            core.setService(setServiceArgServiceObject)
          }

          expect(setServiceReturn).toBeInstanceOf(Service)
          expect(duplicateService).toThrow()
          expect(Object.entries(core.services)).toHaveLength(1)
          expect(Service).toHaveBeenNthCalledWith(1, setServiceArgServiceObject)
          expect(Service).not.toHaveBeenCalledTimes(2)
        })
      })
    })

    describe.skip('track', () => {})
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
