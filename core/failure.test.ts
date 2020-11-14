const Failure = jest.requireActual('@atrackt/core/failure').default

describe('Failure', () => {
  let failure

  it('should extend Atrackt', () => {
    expect(Failure.prototype).toBeInstanceOf(Error)
  })

  describe('constructor', () => {
    beforeEach(() => {
      failure = new Failure('test error')
    })

    it('should initialize the failure', () => {
      expect(failure.message).toBe('test error')
      expect(failure.name).toBe('Atrackt Error')
    })
  })
})
