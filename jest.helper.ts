// prevent describe from returning a value
const realDescribe = describe

describe = (name, fn) => {
  realDescribe(name, () => {
    fn()
  })
}

global.context = describe
