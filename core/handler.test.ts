import Atrackt from '@atrackt/core/atrackt'
const Handler = jest.requireActual('@atrackt/core/handler').default

describe('Handler', () => {
  let handler

  it('should extend Atrackt', () => {
    expect(Handler.prototype).toBeInstanceOf(Atrackt)
  })

  describe('constructor', () => {
    let validateMock

    beforeEach(() => {
      validateMock = jest.spyOn(Handler.prototype, 'validate')
      validateMock.mockImplementation()
    })

    it('should initialize', () => {
      new Handler()

      expect(Atrackt).toBeCalledTimes(1)
      expect(validateMock).toBeCalledTimes(1)
    })

    it('should assign properties from handler argument', () => {
      handler = new Handler({
        foo: () => 'foo',
        bar: 'bar',
      })

      expect(handler.foo()).toEqual('foo')
      expect(handler.bar).toEqual('bar')
    })
  })

  describe('.validate', () => {
    beforeEach(() => {
      handler = Object.create(Handler.prototype)
    })

    if (!window) {
      context('when not in a browser', () => {
        it('should throw an error', () => {
          expect(handler.validate).toThrow('browser')
        })
      })
    } else {
      let windowSpy

      context('when in a browser', () => {
        beforeEach(() => {
          windowSpy = jest.spyOn(global, 'window', 'get')
          windowSpy.mockImplementation(() => undefined)
        })

        context('when no handler passed', () => {
          it('should throw an error', () => {
            windowSpy.mockImplementation(() => true)

            expect(handler.validate).toThrow('handler')
          })
        })

        context('when setEvents is not passed', () => {
          it('should throw an error', () => {
            windowSpy.mockImplementation(() => true)
            const validateError = () => handler.validate({})

            expect(validateError).toThrow('setEvents')
          })
        })
      })
    }
  })
})
