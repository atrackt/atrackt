import Console from '@atrackt/core/console'

describe(Console, function () {
  describe('constructor', () => {
    let atracktEnableConsole
    let consoleSetupConsole
    let consoleValidate

    beforeEach(() => {
      atracktEnableConsole = jest.spyOn(window.Atrackt, 'enableConsole')
      consoleSetupConsole = jest.spyOn(Console.prototype, 'setupConsole')
      consoleValidate = jest.spyOn(Console.prototype, 'validate')
    })

    afterEach(() => {
      atracktEnableConsole.mockRestore()
      consoleSetupConsole.mockRestore()
      consoleValidate.mockRestore()
    })

    context('when conditions are valid', () => {
      beforeEach(() => {
        consoleValidate.mockImplementation(() => true)
        new Console()
      })

      it('should initialize the console', () => {
        expect(atracktEnableConsole).toBeCalledTimes(1)
        expect(consoleSetupConsole).toBeCalledTimes(1)
        expect(consoleValidate).toBeCalledTimes(1)
      })
    })

    context('when conditions are invalid', () => {
      beforeEach(() => {
        consoleValidate.mockImplementation(() => false)
        new Console()
      })

      it('should not initialize the console', () => {
        expect(atracktEnableConsole).not.toBeCalled()
        expect(consoleSetupConsole).not.toBeCalled()
        expect(consoleValidate).toBeCalledTimes(1)
      })
    })
  })

  describe('validate', () => {
    let atracktConsole
    let windowSpy

    beforeEach(() => {
      windowSpy = jest.spyOn(global, 'window', 'get')
    })

    afterEach(() => {
      windowSpy.mockRestore()
    })

    context('when in a browser', () => {
      context('when a handler is loaded', () => {
        beforeEach(() => {
          windowSpy.mockImplementation(() => ({
            Atrackt: {},
            location: {
              search: '',
            },
            localStorage: {
              getItem: () => {},
            },
          }))

          atracktConsole = new Console()
        })

        it('should return a boolean', () => {
          expect([true, false]).toContain(atracktConsole.validate())
        })
      })

      context('when a handler is not loaded', () => {
        let validateHandlerError

        beforeEach(() => {
          windowSpy.mockImplementation(() => ({}))

          validateHandlerError = () => {
            atracktConsole.validate()
          }
        })

        it('should throw an error', () => {
          expect(validateHandlerError).toThrow(/handler/)
        })
      })
    })

    context('when not in a browser', () => {
      let validateBrowserError

      beforeEach(() => {
        windowSpy.mockImplementation(() => undefined)
        validateBrowserError = () => {
          atracktConsole.validate()
        }
      })

      it('should throw an error', () => {
        expect(validateBrowserError).toThrow(/browser/)
      })
    })
  })
})
