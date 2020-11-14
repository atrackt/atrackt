import Core from '@atrackt/core/core'
const Atrackt = jest.requireActual('@atrackt/core').default

describe('Atrackt', () => {
  let atrackt

  describe('constructor', () => {
    beforeEach(() => {
      delete globalThis.Atrackt
    })

    context('when initialized', () => {
      beforeEach(() => {
        atrackt = new Atrackt()
      })

      it('should create a core instance', () => {
        expect(Core).toBeCalledTimes(1)
      })

      it('should expose the api', () => {
        // core methods should all be bound
        expect(atrackt.setService.name).toEqual('bound setService')
        expect(atrackt.track.name).toEqual('bound track')

        // handler api methods should be undefined
        expect(atrackt.enableConsole).toBeUndefined()
      })

      it('should expose atrackt global', () => {
        expect(globalThis.Atrackt).toBe(atrackt)
      })
    })

    context('without passing a config', () => {
      it('should pass nothing to Core', () => {
        new Atrackt()

        expect(Core).toBeCalledWith(undefined)
      })
    })

    context('when passing a config', () => {
      it('should pass it to Core', () => {
        new Atrackt({
          config: {
            custom: 'config',
          },
        })

        expect(Core).toBeCalledWith({ custom: 'config' })
      })
    })

    context('when initialized from a handler', () => {
      it('should expose the handler api', () => {
        const HandlerClass = class Handler extends Atrackt {}
        atrackt = new HandlerClass()

        expect(atrackt.enableConsole.name).toEqual('bound enableConsole')
      })
    })
  })
})
