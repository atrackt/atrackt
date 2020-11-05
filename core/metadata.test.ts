import Metadata from '@atrackt/core/metadata'

describe.skip(Metadata, () => {
  let metadata

  describe('constructor', () => {
    beforeEach(() => {
      metadata = new Metadata()
    })

    it('should create all defaults', () => {
      expect(metadata.callbacks).toEqual({
        before: [],
        after: [],
      })
      expect(metadata.payload).toEqual({})
      expect(metadata.options).toEqual({})
    })
  })
})
