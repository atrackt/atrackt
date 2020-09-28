# Atrackt

A library for making complex tracking & analytics easier

## API

> A plugin (or plugins) option can be passed in to all global functions to specify plugin(s)

```js
atrackt.track({ ..., plugin: 'foo' })
atrackt.track({ ..., plugins: ['foo', 'bar'] })
```

---

## Todo: Production

- easily include/change data via js w/out using atrackt-function
- allow setting data and event via atrackt.track
- use [VisualEvent](https://github.com/DataTables/VisualEvent) as a reference to find elements with events
- rename location to title
- rename categories to location

---

## Todo: Development

- webpack
  - add copy-pkg-json-webpack-plugin
  - generate CHANGELOG
  - copy README.md, LICENSE, CHANGELOG
  - build demo
  - launch demo server
  - livereload
  - publish to github packages
- add [jest](https://jestjs.io)
  - compile and test single files when changed
- add CI (github actions/travis/circle)
- add readme badges
- add configuration dot-files
- [majestic?](https://github.com/Raathigesh/majestic)
- [husky](https://github.com/typicode/husky)

##### [Creative Commons Attribution NonCommercial NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.txt)

---

## Developer

#### Basic Workflow

```shell
// PUBLIC FUNCTIONS
//
CORE.setService('Service Name', {service})
  service = CORE._validateService(service)
  return CORE._mergeObjectsShallow(CORE._services, service)

CORE.track({
  payload: [Object|HtmlNode]
  data: [Array<'criteria'>|[criteria]|HtmlNode|Object]},
  options?: {options},
  event?: [Event|'eventType'],
  service?: ['service'])
})
  options = CORE._mergeObjects(CORE._options, CORE._getService(service)._options, arg.options)
  data = CORE._mergeObjects(CORE._data, CORE._getService(service)._data, arg.data)
  event = typeof event == Event ? Event : new Event('eventType')
  CORE._callCallbacks('before')
  CORE._isElement('payload', 'event', service?)
    for (each) 'element'...
      if 'service' argument is undefined...
        for (each) 'service' in CORE._services...
          CORE._trackElement('element', 'service', 'event')
      else if 'service' argument is defined...
        CORE._trackElement('element', 'service', 'event')
  else not an element
    if 'service' argument is undefined...
      for (each) 'service' in CORE._services...
        CORE._trackObject('object', 'service')
    else if 'service' argument is defined...
      CORE._trackObject('object', 'service')
  CORE._callCallbacks('after')


// GLOBAL
CORE.setEvent({eventCriteria})
  // for dom mutations
  if criteria passed...
    criteria = CORE._eventCriteria
  else
    criteria = CORE._mergeObjects(CORE._eventCriteria, {eventCriteria})
  for (each) 'element' in LISTENER._getElements()...
    for (each) 'service' in CORE._services...
      if 'data-atrackt-services' does not contain 'service.name'
        CORE._setElementData('element', 'service.name')
        for (each) 'event' in Object.keys({eventCriteria})...
          CORE._setElementEvent('element', 'event')

CORE.set[Data|Options](Object)
  CORE._mergeObjects(CORE._[data|options], Object)

CORE.setCallback('callback fn', ORDER: ['before'|'after'])
  * push 'callback fn' into CORE._callbacks.[ORDER]


// PLUGIN
CORE.setEvent({eventCriteria}, service: 'Service Name')
  CORE._getService('Service Name')
  CORE._mergeObjects(PLUGIN._eventCriteria, {eventCriteria})
  for (each) 'element' in LISTENER._getElements('service-name')...
    if 'data-atrackt-services' does not contain 'service.name'
      CORE._setElementData('element', 'service.name')
      for (each) 'event' in Object.keys({eventCriteria})...
        CORE._setElementEvent('element', 'event')

CORE.set[Data|Options](Object, service: 'Service Name')
  CORE._getService('Service Name')
  CORE._mergeObjects(PLUGIN._[data|options], Object)

CORE.setCallback('callback fn', ORDER: ['before'|'after'], service: 'Service Name'))
  CORE._getService('Service Name')
  * push 'callback fn' into CORE._services['service-name']._callbacks[ORDER]

// PRIVATE FUNCTIONS
//
CORE._validateService('Service Name', {service})
  service.name = CORE._getKeySafeServiceName('Service Name')
  throw Error if typeof 'service'.send !== 'function'
  return { service.name: service }

CORE._getKeySafeServiceName('Service Name')
  return 'service-name' || throw Error

CORE._getService('Service Name)
  CORE._getKeySafeServiceName('Service Name')
    return CORE._services['service-name']

CORE._mergeObjectArrays(objValue, srcValue, key) ->
  if (_.isArray(objValue))
    return _.unionBy(objValue,srcValue)
  else
    if (objValue !== undefined && srcValue !== undefined)
      console.warn "key #{objValue} will be overwritten by #{srcValue}"

CORE._mergeObjects(..objects)
  return _.mergeWith(...objects, _mergeObjectArrays)

CORE._mergeObjectsShallow(...objects)
  return Object.assign(...objects)

CORE._setElementData('element', 'service-name')
  // add service name, ensure its not duplicated, ensure spaces

CORE._setElementEvent('element', 'options', 'event', 'service')
  LISTENER._bindEvent('element', 'options', 'event', 'service')

CORE._getElementMetaData('element', 'event')
  data._element = element
  data._event = event
  data._location = CORE._getLocation()
  data._title = CORE._getTitle()
  data._value = CORE._getValue()

CORE._getLocation(element)
  // see original source code

CORE._getTitle(element)
  // see original source code

CORE._getValue(element)
  // see original source code

CORE._isElement('payload', 'event', 'service-name')
  event.target || LISTENER._isElement('payload') == true
  if true
    return LISTENER._getElements('service-name')
  else
    return false

CORE._trackElement('element', 'service', 'event')
  CORE._getElementMetaData('element', 'event')
  CORE._mergeObjects({data}, {metaData})
  CORE._callCallbacks('before', service)
  CORE._callDataFunction('element')
  PLUGIN.send('payload', 'options')
  CORE._callCallbacks('after', service)

CORE._trackObject('object', 'service')
  CORE._callCallbacks('before', service)
  PLUGIN.send('payload', 'options')
  CORE._callCallbacks('after', service)

CORE._callCallbacks('order', 'service')
  // loop through CORE._callbacks, and call each one
  // if service, loop through PLUGIN._callbacks, and call each one

CORE._callDataFunction('element')
  // call data-atrackt-function on element if it exists

CORE._getElements('service')
  if (service)
    LISTENER._getElements(PLUGIN)
  else
    LISTENER._getElements(CORE)

```

#### Handler

```js
LISTENER._bindEvent('element', 'options', 'event', 'service')
  * // check for event already bound to event
  // if not, bind event to call CORE.track(payload: 'element', options: 'options', event: 'event', service: 'service')

LISTENER._getElements(Object)
  * // loop through Object._eventCriteria and add to array
  return array

LISTENER._isElement('criteria')
  // use handler to test if arg can be matched to an element(s)
```

#### Callbacks

```js
CORE.setCallback('order', data, options) ->
  CORE._callbacks.ORDER.push (data, options) -> // modify data and options

CORE.setCallback('order', data, options, 'Service Name') ->
  CORE._getService('Service Name')
    PLUGIN._callbacks.ORDER.push (data, options) -> // modify data and options
```

#### On DOM Change

```js
CORE.setEvent()
  * for each 'service' in CORE._services...
    * for each 'event' in PLUGIN._eventCriteria...
```
