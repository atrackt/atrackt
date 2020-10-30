import './demo.sass'
import Atrackt from '@atrackt/handler-dom'
import '@atrackt/core/console'

Atrackt.setService({
  name: 'Demo Service',
  submit: () => {},
})

Atrackt.setEvents({
  click: 'a',
})
