const Metadata = jest.requireActual('@atrackt/core/metadata').default

describe('Metadata', () => {
  let metadata

  describe('constructor', () => {
    beforeEach(() => {
      metadata = new Metadata()
    })

    it('should set defaults', () => {
      expect(metadata.callbacks).toEqual({
        before: [],
        after: [],
      })
      expect(metadata.payload).toEqual({})
      expect(metadata.options).toEqual({})
    })
  })

  describe('setCallbacks', () => {
    it('should ', () => {
      //
    })
  })

  describe('setData', () => {
    it('should ', () => {
      //
    })
  })

  describe('setEvents', () => {
    it('should ', () => {
      //
    })
  })

  describe('setOptions', () => {
    it('should ', () => {
      //
    })
  })
})
