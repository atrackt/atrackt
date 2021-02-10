import './demo.sass'
import Atrackt from '@atrackt/core'
import '@atrackt/handler-dom'
// import Atrackt from '@atrackt/handler-dom'
import '@atrackt/service-adobe-analytics'

// import '@atrackt/core/console'
// console.log(Atrackt)

Atrackt.start()

// Atrackt.setService({
//   name: 'Demo Service',
//   submit: (payload, options) => {
//     console.log('DEMO SERVICE')
//     console.log(' => Payload', payload)
//     console.log(' => Options', options)
//     return payload
//   },
// })

// Atrackt.setEvents({
//   click: 'a',
// })
