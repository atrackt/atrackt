import Failure from '@atrackt/core/failure'

describe.skip(Failure, () => {
  let failure

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
