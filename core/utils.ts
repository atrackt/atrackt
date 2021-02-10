export default class Utils {
  public static deepMerge(source: object | any[], ...merges: any[]) {
    // check if merging different data types
    if (Array.isArray(source)) {
      let mergedArrays = source.concat(merges)
      mergedArrays = mergedArrays.filter(
        (element, index) => mergedArrays.indexOf(element) === index
      )

      return mergedArrays
    } else if (typeof source === 'object') {
      for (const merge of merges) {
        if (Array.isArray(merge)) {
          throw new Failure('cant merge array into an object')
        }

        for (const nestedObject in merge) {
          if (!!source[nestedObject]) {
            return Utils.deepMerge(source[nestedObject], nestedObject)
          } else {
            return (source[nestedObject] = nestedObject)
          }
        }
      }
    }
  }

  public static getFunctionArguments(func: Function) {
    const funcString = func.toString()

    // get arguments in parens
    const functionParens = funcString.match(/\(([^{}]*)\)/)[1]
    if (functionParens) {
      return functionParens.replace(/\s/g, '').split(',')
    }

    // get vars declared in function
    const functionVars = funcString.match(/var ([^=]+)/g)
    if (functionVars) {
      return functionVars.map((m) => m.replace(/(var|\s)/g, ''))
    }

    // no arguments
    return []
  }

  public static getFunctionReturn(func: Function) {
    return func
      .toString()
      .replace(/\s/g, '')
      .match(/return(.+);\}$/)[1]
  }
}
