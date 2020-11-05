import Failure from '@atrackt/core/failure'
const Console = jest.requireActual('@atrackt/core/console').default

describe('Console', () => {
  let consoleInstance

  describe('constructor', () => {
    let validateMock
    let enableConsoleMock
    let setupConsoleMock

    beforeEach(() => {
      validateMock = jest.spyOn(Console.prototype, 'validate')
      enableConsoleMock = jest.spyOn(window.Atrackt, 'enableConsole')
      setupConsoleMock = jest
        .spyOn(Console.prototype, 'setupConsole')
        .mockImplementation()
    })

    context('when conditions are valid', () => {
      beforeEach(() => {
        validateMock.mockImplementation(() => true)
        new Console()
      })

      it('should initialize the console', () => {
        expect(validateMock).toHaveBeenCalledTimes(1)
        expect(enableConsoleMock).toHaveBeenCalledTimes(1)
        expect(setupConsoleMock).toHaveBeenCalledTimes(1)
      })
    })

    context('when conditions are invalid', () => {
      beforeEach(() => {
        validateMock.mockImplementation(() => false)
        new Console()
      })

      it('should not initialize the console', () => {
        expect(validateMock).toHaveBeenCalledTimes(1)
        expect(enableConsoleMock).not.toHaveBeenCalled()
        expect(setupConsoleMock).not.toHaveBeenCalled()
      })
    })
  })

  describe('validate', () => {
    let windowSpy
    let validateReturn
    let validateError

    beforeEach(() => {
      jest.spyOn(Console.prototype, 'validate')
      windowSpy = jest.spyOn(global, 'window', 'get')
      validateError = () => {
        consoleInstance.validate()
      }
      consoleInstance = new Console()
    })

    context('when in a browser', () => {
      context('when a handler is loaded', () => {
        context('when console is disabled', () => {
          beforeEach(() => {
            windowSpy.mockImplementation(() => ({
              Atrackt: {},
              location: {
                search: '',
              },
              localStorage: {
                getItem: () => false,
              },
            }))
            validateReturn = consoleInstance.validate()
          })

          it('should return a boolean', () => {
            expect(validateReturn).toEqual(false)
          })
        })

        context('when console is enabled in the url', () => {
          beforeEach(() => {
            windowSpy.mockImplementation(() => ({
              Atrackt: {},
              location: {
                search: 'foo.com?atracktConsole',
              },
            }))
            validateReturn = consoleInstance.validate()
          })

          it('should return a boolean', () => {
            expect(validateReturn).toEqual(true)
          })
        })

        context('when console is enabled in local storage', () => {
          beforeEach(() => {
            windowSpy.mockImplementation(() => ({
              Atrackt: {},
              location: {
                search: '',
              },
              localStorage: {
                getItem: (item) => 'true',
              },
            }))
            validateReturn = consoleInstance.validate()
          })

          it('should return a boolean', () => {
            expect(validateReturn).toEqual(true)
          })
        })
      })

      context('when a handler is not loaded', () => {
        it('should throw an error', () => {
          windowSpy.mockImplementation(() => ({}))
          expect(validateError).toThrow(Failure)
        })
      })
    })

    context('when not in a browser', () => {
      it('should throw an error', () => {
        windowSpy.mockImplementation(() => undefined)
        expect(validateError).toThrow(Failure)
      })
    })
  })

  describe.skip('setupConsole', () => {})
})
