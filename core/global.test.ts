import Metadata from '@atrackt/core/metadata'
const Global = jest.requireActual('@atrackt/core/global').default

describe('Global', () => {
  let global

  it('should extend Metadata', () => {
    expect(Global.prototype).toBeInstanceOf(Metadata)
  })

  describe('constructor', () => {
    beforeEach(() => {
      global = new Global()
    })
  })
})
