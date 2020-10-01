import Service from '@atrackt/core/service'

new Service({
  name: 'Adobe Analytics',
  send: (payload: object, options?: object): object => {
    console.log('Adobe Analytics: Send', payload, options)
    return payload
  }
})
