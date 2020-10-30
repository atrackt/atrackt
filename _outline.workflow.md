#### Workflow Outline

```js
// PUBLIC FUNCTIONS
//
CORE.setService('Service Name', {service})
  service = CORE.validateService(service)
  return CORE.mergeObjectsShallow(CORE.services, service)

CORE.track({
  payload: [Object|HtmlNode]
  data: [Array<'criteria'>|[criteria]|HtmlNode|Object]},
  options?: {options},
  event?: [Event|'eventType'],
  service?: ['service'])
})
  options = CORE.mergeObjects(CORE.options, CORE.getService(service).options, arg.options)
  data = CORE.mergeObjects(CORE.data, CORE.getService(service).data, arg.data)
  event = typeof event == Event ? Event : new Event('eventType')
  CORE.callCallbacks('before')
  CORE.isElement('payload', 'event', service?)
    for (each) 'element'...
      if 'service' argument is undefined...
        for (each) 'service' in CORE.services...
          CORE.trackElement('element', 'service', 'event')
      else if 'service' argument is defined...
        CORE.trackElement('element', 'service', 'event')
  else not an element
    if 'service' argument is undefined...
      for (each) 'service' in CORE.services...
        CORE.trackObject('object', 'service')
    else if 'service' argument is defined...
      CORE.trackObject('object', 'service')
  CORE.callCallbacks('after')


// GLOBAL
CORE.setEvents({eventCriteria})
  // for dom mutations
  if criteria passed...
    criteria = CORE.eventCriteria
  else
    criteria = CORE.mergeObjects(CORE.eventCriteria, {eventCriteria})
  for (each) 'element' in HANDLER.getElements()...
    for (each) 'service' in CORE.services...
      if 'data-atrackt-services' does not contain 'service.name'
        CORE.setElementData('element', 'service.name')
        for (each) 'event' in Object.keys({eventCriteria})...
          CORE.setElementEvent('element', 'event')

CORE.set[Data|Options](Object)
  CORE.mergeObjects(CORE.[data|options], Object)

CORE.setCallback('callback fn', ORDER: ['before'|'after'])
  * push 'callback fn' into CORE.callbacks.[ORDER]


// SERVICE
CORE.setEvents({eventCriteria}, service: 'Service Name')
  CORE.getService('Service Name')
  CORE.mergeObjects(SERVICE.eventCriteria, {eventCriteria})
  for (each) 'element' in HANDLER.getElements('service-name')...
    if 'data-atrackt-services' does not contain 'service.name'
      CORE.setElementData('element', 'service.name')
      for (each) 'event' in Object.keys({eventCriteria})...
        CORE.setElementEvent('element', 'event')

CORE.set[Data|Options](Object, service: 'Service Name')
  CORE.getService('Service Name')
  CORE.mergeObjects(SERVICE.[data|options], Object)

CORE.setCallback('callback fn', ORDER: ['before'|'after'], service: 'Service Name'))
  CORE.getService('Service Name')
  * push 'callback fn' into CORE.services['service-name'].callbacks[ORDER]

// PRIVATE FUNCTIONS
//
CORE.validateService('Service Name', {service})
  service.name = CORE.getKeySafeServiceName('Service Name')
  throw Error if typeof 'service'.submit !== 'function'
  return { service.name: service }

CORE.getKeySafeServiceName('Service Name')
  return 'service-name' || throw Error

CORE.getService('Service Name)
  CORE.getKeySafeServiceName('Service Name')
    return CORE.services['service-name']

CORE.mergeObjectArrays(objValue, srcValue, key) ->
  if (_.isArray(objValue))
    return _.unionBy(objValue,srcValue)
  else
    if (objValue !== undefined && srcValue !== undefined)
      console.warn "key #{objValue} will be overwritten by #{srcValue}"

CORE.mergeObjects(..objects)
  return _.mergeWith(...objects, mergeObjectArrays)

CORE.mergeObjectsShallow(...objects)
  return Object.assign(...objects)

CORE.setElementData('element', 'service-name')
  // add service name, ensure its not duplicated, ensure spaces

CORE.setElementEvent('element', 'options', 'event', 'service')
  HANDLER.bindEvent('element', 'options', 'event', 'service')

CORE.getElementMetaData('element', 'event')
  data.element = element
  data.event = event
  data.location = CORE.getLocation()
  data.title = CORE.getTitle()
  data.value = CORE.getValue()

CORE.getLocation(element)
  // see original source code

CORE.getTitle(element)
  // see original source code

CORE.getValue(element)
  // see original source code

CORE.isElement('payload', 'event', 'service-name')
  event.target || HANDLER.isElement('payload') == true
  if true
    return HANDLER.getElements('service-name')
  else
    return false

CORE.trackElement('element', 'service', 'event')
  CORE.getElementMetaData('element', 'event')
  CORE.mergeObjects({data}, {metaData})
  CORE.callCallbacks('before', service)
  CORE.callDataFunction('element')
  SERVICE.submit('payload', 'options')
  CORE.callCallbacks('after', service)

CORE.trackObject('object', 'service')
  CORE.callCallbacks('before', service)
  SERVICE.submit('payload', 'options')
  CORE.callCallbacks('after', service)

CORE.callCallbacks('order', 'service')
  // loop through CORE.callbacks, and call each one
  // if service, loop through SERVICE.callbacks, and call each one

CORE.callDataFunction('element')
  // call data-atrackt-function on element if it exists

CORE.getElements('service')
  if (service)
    HANDLER.getElements(SERVICE)
  else
    HANDLER.getElements(CORE)

```

#### Handler

```js
HANDLER.bindEvent('element', 'options', 'event', 'service')
  * // check for event already bound to event
  // if not, bind event to call CORE.track(payload: 'element', options: 'options', event: 'event', service: 'service')

HANDLER.getElements(Object)
  * // loop through Object.eventCriteria and add to array
  return array

HANDLER.isElement('criteria')
  // use handler to test if arg can be matched to an element(s)
```

#### Callbacks

```js
CORE.setCallback('order', data, options) ->
  CORE.callbacks.ORDER.push (data, options) -> // modify data and options

CORE.setCallback('order', data, options, 'Service Name') ->
  CORE.getService('Service Name')
    SERVICE.callbacks.ORDER.push (data, options) -> // modify data and options
```

#### On DOM Change

```js
CORE.setEvents()
  * for each 'service' in CORE.services...
    * for each 'event' in SERVICE.eventCriteria...
```
