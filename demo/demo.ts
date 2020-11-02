import './demo.sass'
import Atrackt from '@atrackt/handler-dom'
import '@atrackt/core/console'

Atrackt.setService({
  name: 'Demo Service',
  submit: (payload, options) => {
    console.log('DEMO SERVICE')
    console.log(' => Payload', payload)
    console.log(' => Options', options)
    return payload
  },
})

Atrackt.setEvents({
  click: 'a',
})
