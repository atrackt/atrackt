import Atrackt from '@atrackt/core'

Atrackt.setService({
  name: 'Adobe Analytics',
  submit: (payload, options) => {
    return payload
  },
})

export default Atrackt
