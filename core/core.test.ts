// import Atrackt, { Core, Failure } from '@atrackt/core'
import * as modules from '@atrackt/core'
import Service from '@atrackt/core/service'

// jest.spyOn(Core, 'foo').mockImplementation(() => {
//   'MOCK.FOO'
// })

jest.mock('@atrackt/core/service', () => {})

// jest.mock('@atrackt/core', () => {
//   const moduleMock = jest.requireActual('@atrackt/core')

//   return {
//     ...moduleMock,
//     Core: jest.fn(),
//   }
// })

describe('Atrackt', () => {
  let atrackt = undefined
  beforeEach(() => {
    atrackt = new modules.default()
  })

  describe('constructor', () => {
    let CoreConstructorMock = undefined

    beforeAll(() => {
      CoreConstructorMock = jest
        .spyOn(modules as any, 'Core')
        .mockImplementation(() => {
          return {
            setService: () => {},
            track: () => {},
            enableConsole: () => {},
          }
        })
    })

    afterAll(() => {
      // @ts-ignore
      modules.Core.mockRestore()
    })

    it('should expose the api', () => {
      // core methods should all be bound
      expect(atrackt.setService.name).toEqual('bound setService')
      expect(atrackt.track.name).toEqual('bound track')

      // handler api methods should be undefined
      expect(atrackt.enableConsole).toBeUndefined()

      expect(CoreConstructorMock).toBeCalled()
    })

    context('when initialized from a handler', () => {
      beforeEach(() => {
        class Handler extends modules.default {}
        atrackt = new Handler()
      })

      it('should expose the api', () => {
        expect(atrackt.enableConsole.name).toEqual('bound enableConsole')
      })
    })

    it('should become global', () => {
      expect(globalThis.Atrackt).toBe(atrackt)
    })
  })
})

describe('Core', () => {
  let core = undefined

  beforeEach(() => {
    core = new modules.Core()
    globalThis.Atrackt = core
  })

  describe('constructor', () => {
    it('should create all defaults', () => {
      expect(core.callbacks).toEqual({
        before: [],
        after: [],
      })
      expect(core.console).toBe(false)
      expect(core.data).toEqual({})
      expect(core.options).toEqual({})
      expect(core.services).toEqual({})
    })

    context('without a configuration', () => {
      beforeEach(() => {
        core = new modules.Core()
      })

      it('should set a default', () => {
        expect(core.config).toEqual({})
      })
    })

    context('with a custom configuration', () => {
      beforeEach(() => {
        core = new modules.Core({
          custom: 'config',
        })
      })

      it('should set a default', () => {
        expect(core.config).toEqual({
          custom: 'config',
        })
      })
    })
  })

  describe('enableConsole', () => {
    beforeEach(() => {
      core.enableConsole()
    })

    it('should set console to true', () => {
      expect(core.console).toBe(true)
    })
  })

  describe.skip('setService', () => {
    let serviceObject = undefined
    // let ServiceConstructorMock = undefined

    // beforeAll(() => {
    //   ServiceConstructorMock = jest
    //     .spyOn(modules as any, 'Core')
    //     .mockImplementation(() => {
    //       return {
    //         setService: () => {},
    //         track: () => {},
    //         enableConsole: () => {},
    //       }
    //     })
    // })

    // afterAll(() => {
    //   // @ts-ignore
    //   modules.Core.mockRestore()
    // })

    context('with valid service', () => {
      beforeEach(() => {
        serviceObject = {
          name: 'Test Service',
        }
        core.setService(serviceObject)
      })

      it('should register the service', () => {
        console.log(core.services)

        expect(core.services['Test Service']).toEqual(serviceObject)
      })
    })
  })
})

/*
describe(Core, () => {
  let atracktInstance = undefined

  beforeEach(() => {
    atracktInstance = new Core()
  })

  context('when initialized', () => {
    it('should become global', () => {
      expect(globalThis.Atrackt).toBeInstanceOf(Atrackt)
    })

    it('should set defaults', () => {
      expect(atracktInstance.console).toBe(false)
      expect(atracktInstance.services).toEqual({})
    })
  })

  describe('.enableConsole', () => {
    it('should set console to true', () => {
      atracktInstance.enableConsole()

      expect(atracktInstance.console).toBe(true)
    })
  })

  describe('.setService', () => {
    let service = undefined

    beforeAll(() => {
      class Service {}

      // @ts-ignore
      service = new Service({
        name: 'test service',
        submit: (payload, options) => {
          return payload
        },
      })
    })

    beforeEach(() => {
      atracktInstance.setService(service)
    })

    it('should register a new service', () => {
      expect(atracktInstance.services['test service'].name).toBe('test service')
    })

    it('should prevent duplicate services', () => {
      console.log('service', service)

      let setDuplicateService = () => {
        atracktInstance.setService(service)
      }

      expect(setDuplicateService).toThrowError(Failure)
    })
  })
})

// describ, () => {
//   let metadata = undefined

//   beforeEach(() => {
//     metadata = ne()
//   })

//   it('should set defaults', () => {
//     expect(metadata.data).toEqual({})
//     expect(metadata.options).toEqual({})
//     expect(metadata.callbacks).toEqual({
//       before: [],
//       after: [],
//     })
//   })
// })

describe(Failure, () => {
  let failure = undefined

  beforeAll(() => {
    failure = new Failure('test error')
  })

  it('should namespace the error', () => {
    expect(failure.name).toBe('Atrackt Error')
  })

  it('should extend Error', () => {
    expect(failure.message).toBe('test error')
    expect(failure).toBeInstanceOf(Error)
  })
})
*/
