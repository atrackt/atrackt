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
          it('should call setCore on Core', () => {
            const methodArg = `${method}Arg`
            const setCoreReturn = 'setCoreReturn'

            const methodSpy = jest.spyOn(Atrackt, method)
            const setCoreSpy = jest.spyOn(Atrackt._core, 'setCore')
            setCoreSpy.mockImplementation(() => setCoreReturn)

            Atrackt[method](methodArg)

            expect(methodSpy).toBeCalledWith(methodArg)
            expect(methodSpy).toReturnWith(setCoreReturn)
            expect(setCoreSpy).toBeCalledWith(method, methodArg)
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
            expect(setMetadataSpy).toBeCalledWith(method, methodArg, undefined)
          })
        })
      }
    })

    describe('#start', () => {
      it('should initialize Core', () => {
        delete Atrackt._core
        const startArg = 'startArg'

        const startSpy = jest.spyOn(Atrackt, 'start')

        Atrackt.start(startArg)

        expect(startSpy).toBeCalledWith(startArg)
        expect(startSpy).toReturnWith(Atrackt._core)
        expect(Atrackt._core).toBeInstanceOf(Core)
        expect(Core).toBeCalledWith(startArg)
      })
    })

    describe('#track', () => {
      const trackPayload = { payloadKey: 'payloadValue' }
      const trackOptions = { optionsKey: 'optionsValue' }
      const trackServiceNames = 'serviceName'
      const trackReturn = 'trackReturn'

      let trackSpy
      let coreTrackSpy

      beforeEach(() => {
        trackSpy = jest.spyOn(Atrackt, 'track')
        coreTrackSpy = jest.spyOn(Atrackt._core, 'track')
        coreTrackSpy.mockImplementation(() => trackReturn)
      })

      afterEach(() => {
        expect(trackSpy).toReturnWith(trackReturn)
      })

      context('when called with only a payload', () => {
        beforeEach(() => {
          Atrackt.track(trackPayload)
        })

        it('should call track on Core', () => {
          // expect(trackSpy).toReturnWith(trackReturn)
          expect(coreTrackSpy).toBeCalledWith(
            trackPayload,
            undefined,
            undefined
          )
        })
      })

      context('when called with only a payload & options', () => {
        beforeEach(() => {
          Atrackt.track(trackPayload, trackOptions)
        })

        it('should call track on Core', () => {
          // expect(trackSpy).toReturnWith(trackReturn)
          expect(coreTrackSpy).toBeCalledWith(
            trackPayload,
            trackOptions,
            undefined
          )
        })
      })

      context('when called with only a payload & service names', () => {
        beforeEach(() => {
          Atrackt.track(trackPayload, trackServiceNames)
        })

        it('should call track on Core', () => {
          // expect(trackSpy).toReturnWith(trackReturn)
          expect(coreTrackSpy).toBeCalledWith(
            trackPayload,
            {},
            trackServiceNames
          )
        })
      })

      context('when called with a payload, options, & service names', () => {
        beforeEach(() => {
          Atrackt.track(trackPayload, trackOptions, trackServiceNames)
        })

        it('should call track on Core', () => {
          // expect(trackSpy).toReturnWith(trackReturn)
          expect(coreTrackSpy).toBeCalledWith(
            trackPayload,
            trackOptions,
            trackServiceNames
          )
        })
      })
    })
  })
})
