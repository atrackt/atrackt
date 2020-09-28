import Service from '@atrackt/core/service'

new Service({
  name: 'Sumo Logic',
  send: (payload: object, options?: object): object => {
    console.log('Sumo Logic: Send', payload, options)
    return payload
  }
})
