import Core from '@atrackt/core/core'
const Atrackt = jest.requireActual('@atrackt/core').default

const CORE_METHODS = ['setConsole', 'setHandler', 'setService']
const METADATA_METHODS = ['setCallbacks', 'setData', 'setEvents', 'setOptions']

describe(Atrackt, () => {
  describe('before script is started', () => {
    it('should add to the global object', () => {
      expect(globalThis.Atrackt).toEqual(Atrackt)
      expect(globalThis.Atrackt._core).toBeUndefined()
    })
  })

  describe('after script is started', () => {
    beforeAll(() => {
      Atrackt._core = new Core()
    })

    it('should initialize Core', () => {
      expect(Atrackt._core).toBeInstanceOf(Core)
    })

    describe('core methods', () => {
      for (const method of CORE_METHODS) {
        describe(`#${method}`, () => {
          it('should call setGlobal on Core', () => {
            const methodArg = `${method}Arg`
            const setGlobalReturn = 'setGlobalReturn'

            const methodSpy = jest.spyOn(Atrackt, method)
            const setGlobalSpy = jest.spyOn(Atrackt._core, 'setGlobal')
            setGlobalSpy.mockImplementation(() => setGlobalReturn)

            Atrackt[method](methodArg)

            expect(methodSpy).toBeCalledWith(methodArg)
            expect(methodSpy).toReturnWith(setGlobalReturn)
            expect(setGlobalSpy).toBeCalledWith(method, methodArg)
          })
        })
      }
    })

    describe('metadata methods', () => {
      for (const method of METADATA_METHODS) {
        describe(`#${method}`, () => {
          it('should call setMetadata on Core', () => {
            const methodArg = `${method}Arg`
            const setMetadataReturn = 'setMetadataReturn'

            const methodSpy = jest.spyOn(Atrackt, method)
            const setMetadataSpy = jest.spyOn(Atrackt._core, 'setMetadata')
            setMetadataSpy.mockImplementation(() => setMetadataReturn)

            Atrackt[method](methodArg)

            expect(methodSpy).toBeCalledWith(methodArg)
            expect(methodSpy).toReturnWith(setMetadataReturn)
            expect(setMetadataSpy).toBeCalledWith(method, methodArg, [])
          })
        })
      }
    })

    describe('#start', () => {
      it('should initialize Core', () => {
        delete Atrackt._core
        const startArg = 'startArg'
        const startReturn = 'startReturn'

        const startSpy = jest.spyOn(Atrackt, 'start')

        Atrackt.start(startArg)

        expect(startSpy).toBeCalledWith(startArg)
        expect(startSpy).toReturnWith(Atrackt._core)
        expect(Atrackt._core).toBeInstanceOf(Core)
        expect(Core).toBeCalledWith(startArg)
      })
    })

    describe('#track', () => {
      it('should call track on Core', () => {
        const trackArg = 'trackPayloadArg'
        const trackReturn = 'trackReturn'

        const trackSpy = jest.spyOn(Atrackt, 'track')
        const coreTrackSpy = jest.spyOn(Atrackt._core, 'track')
        coreTrackSpy.mockImplementation(() => trackReturn)

        Atrackt.track(trackArg)

        expect(trackSpy).toBeCalledWith(trackArg)
        expect(trackSpy).toReturnWith(trackReturn)
        expect(coreTrackSpy).toBeCalledWith(trackArg, {}, [])
      })
    })
  })
})
