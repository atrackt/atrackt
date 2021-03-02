// import Atrackt from '@atrackt/core/atrackt'
import Core from '@atrackt/core/core'
const Handler = jest.requireActual('@atrackt/core/handler').default

describe('Handler', () => {
  let handler

  it('should extend Core', () => {
    expect(Handler.prototype).toBeInstanceOf(Core)
  })

  describe('constructor', () => {
    let validateMock

    beforeEach(() => {
      validateMock = jest
        .spyOn(Handler.prototype, 'validate')
        .mockImplementation()
    })

    it('should initialize', () => {
      new Handler()

      expect(Core).toBeCalledTimes(1)
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

  describe('setEvents', () => {
    beforeEach(() => {
      handler = Object.create(Handler.prototype)
    })
    it('should support passing a single element selectors', () => {
      handler.setEvents({
        event: 'a',
      })
    })
    it('should support passing an array of element selectors', () => {})
    it('should add the element selectors to the global `_events` object', () => {})
    it('should not add element selectors to service `_events` objects', () => {})
    it('should call _getElements for each element selectors passed', () => {})
    it('should call _registerElement for each element, for each event type', () => {})
    it('should be called when observing for new elements', () => {})
    it('should the context', () => {})
    context('when called with serviceName argument', () => {})
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
          windowSpy = jest
            .spyOn(global, 'window', 'get')
            .mockImplementation(() => undefined)
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
