const Utils = jest.requireActual('@atrackt/core/utils').default

describe(Utils, () => {
  describe('', () => {
    //
  })

  describe('::getFunctionArguments', () => {
    it('should return an array of accepted argument names', () => {
      // with no arguments
      expect(Utils.getFunctionArguments(() => {})).toEqual([])

      // with a single argument
      expect(Utils.getFunctionArguments((singleArg) => {})).toEqual([
        'singleArg',
      ])

      // with a multiple arguments
      expect(Utils.getFunctionArguments((arg1, arg2) => {})).toEqual([
        'arg1',
        'arg2',
      ])

      // with multiple arguments and defaults
      expect(
        Utils.getFunctionArguments(
          (defaultArg1 = 'foo', defaultArg2 = 'bar') => {}
        )
      ).toEqual(['defaultArg1', 'defaultArg2'])
    })
  })

  describe('::getFunctionReturn', () => {
    it('should return an array of accepted argument names', () => {
      // with implicit returns
      expect(Utils.getFunctionReturn(() => false)).toEqual('false')

      // with a single line return
      expect(
        Utils.getFunctionReturn(() => {
          return true
        })
      ).toEqual('true')

      // with a multi-line return
      expect(
        Utils.getFunctionReturn(() => {
          return {
            foo: true,
          }
        })
      ).toEqual('{foo:true}')
    })
  })
})
