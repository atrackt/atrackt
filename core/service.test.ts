import Core from '@atrackt/core/core'
import Metadata from '@atrackt/core/metadata'
const Service = jest.requireActual('@atrackt/core/service').default

describe('Service', () => {
  let service

  it('should extend Metadata', () => {
    expect(Service.prototype).toBeInstanceOf(Metadata)
  })

  describe('constructor', () => {
    let validateSpy

    beforeEach(() => {
      validateSpy = jest
        .spyOn(Service.prototype, 'validate')
        .mockImplementation()
      service = new Service()
    })

    it('should initialize the service', () => {
      expect(validateSpy).toBeCalledTimes(1)
    })

    it('should assign properties from service argument', () => {
      service = new Service({
        foo: () => 'foo',
        bar: 'bar',
      })

      expect(service.foo()).toEqual('foo')
      expect(service.bar).toEqual('bar')
    })
  })

  describe('.validate', () => {
    let serviceError
    let windowSpy
    let getFunctionArgumentsSpy
    let getFunctionReturnSpy

    beforeEach(() => {
      getFunctionArgumentsSpy = jest.spyOn(Core, 'getFunctionArguments')
      getFunctionReturnSpy = jest.spyOn(Core, 'getFunctionReturn')
    })

    context('when atrackt is not initialized', () => {
      beforeEach(() => {
        delete globalThis.Atrackt
        service = Object.create(Service.prototype)
      })

      if (!window) {
        context('when not in a browser', () => {
          it('should extend Metadata', () => {
            expect(service.validate).toThrow('handler')
          })
        })
      } else {
        context('when in a browser', () => {
          it('should extend Metadata', () => {
            windowSpy = jest
              .spyOn(global, 'window', 'get')
              .mockImplementation(() => true)

            expect(service.validate).toThrow('Core')
          })
        })
      }
    })

    context('when no service is passed', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)

        expect(service.validate).toThrow('service')
      })
    })

    context('when name is not passed', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)
        serviceError = () => service.validate({})

        expect(serviceError).toThrow('name')
      })
    })

    context('when submit function is not passed', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)
        serviceError = () =>
          service.validate({
            name: 'Service Name',
          })

        expect(serviceError).toThrow('submit')
      })
    })

    context('when submit does not accept a payload', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)
        getFunctionArgumentsSpy.mockImplementation(() => [])
        serviceError = () =>
          service.validate({
            name: 'Service Name',
            submit: () => {},
          })

        expect(serviceError).toThrow('payload')
        expect(getFunctionArgumentsSpy).toBeCalledTimes(1)
        expect(getFunctionReturnSpy).not.toBeCalled()
      })
    })

    context('when submit does not accept options', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)
        getFunctionArgumentsSpy.mockImplementation(() => ['payload'])
        serviceError = () =>
          service.validate({
            name: 'Service Name',
            submit: () => {},
          })

        expect(serviceError).toThrow('options')
      })
    })

    context('when submit accepts excessive arguments', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)
        getFunctionArgumentsSpy.mockImplementation(() => [
          'payload',
          'options',
          'foo',
        ])
        serviceError = () =>
          service.validate({
            name: 'Service Name',
            submit: () => {},
          })

        expect(serviceError).toThrow('only accepts')
      })
    })

    context('when submit does not return the payload', () => {
      it('should throw an error', () => {
        globalThis.Atrackt = true
        service = Object.create(Service.prototype)
        getFunctionArgumentsSpy.mockImplementation(() => ['payload', 'options'])
        getFunctionReturnSpy.mockImplementation(() => '')
        serviceError = () =>
          service.validate({
            name: 'Service Name',
            submit: () => {},
          })

        expect(serviceError).toThrow('return the payload')
        expect(getFunctionArgumentsSpy).toBeCalledTimes(1)
        expect(getFunctionReturnSpy).toBeCalledTimes(1)
      })
    })
  })
})
