# Atrackt

A library for making complex tracking & analytics easier

## API
#### via App
###### Use in Node/JS w/out DOM element support
```js
// import the core
import Core from '@atrackt/core'

// initialize & configure (see below)
// set services (see below)

// track data objects only
Atrackt.track({
  data: 'object'
}, {
  options: 'object'
})
```

###### Support tracking DOM elements
```js
// set a handler (see below)
// set services (see below)

// bind events to track elements automatically
Atrackt.setEvents({
  click: '.click' // track click events on elements with `click` css class
})

// track an element manually
Atrackt.track([ELEMENT NODE], {
  options: 'object'
})
```

###### Set a Handler
```js
// import an element handler
import '@atrackt/handler-dom'

// or write a custom handler
import Handler from '@atrackt/core/handler'

new Handler({
  name: 'My Handler',
  setEvents: (eventObject) => {
    // use eventObject to bind event key to element
  }
})
```

###### Initialize & Configure
```js
// import core or handler
import Core from '@atrackt/core'

// initialize atrackt with optional configuration (see below)
const Atrackt = new Core({ config: {...} })
```

###### Set Services
```js
// import services
import '@atrackt/service-adobe-analytics'

// write a custom service
Atrackt.setService({
  name: 'My Service',
  submit: (data, options) => {
    // modify data if needed, & send it to the service
  }
})
```

#### via HTML
```html
<script type="module" src="/@atrackt/handler-dom/dom.js"></script>
<!-- OR -->
<script type="module">
  import Atrackt from '@atrackt/handler-dom'
</script>
```

```js
// API is available from global Atrackt object
window.Atrackt.setEvents({...})
```

> If you don't want to track to all services, you can use the `service` or `services` option

```js
Atrackt.track([DATA], {
  service: 'Adobe Analytics'
  //  OR multiple services
  services: ['Adobe Analytics', 'My Service']
})
```

> To pass service-specific options, namespace those options with the service name

```js
Atrackt.track([DATA], {
  'Adobe Analytics': {
    option: 'object'
  }
})
```

---

## Development

- `webpack ^5` cause dependency errors

---

## Todo: Production

- easily include/change data via js w/out using atrackt-function
- allow setting data and event via atrackt.track
- use [VisualEvent](https://github.com/DataTables/VisualEvent) as a reference to find elements with events
- rename location to title
- rename categories to location

---

## Todo: Development

- good repo examples
  - ?
- cross-browser compatibility
  - browserslist
  - postcss/auto-prefix
- g2 to find services
  - [build/ci/cd](https://www.g2.com/categories/continuous-delivery)
    - gitlab
    - github actions
    - circle
  - [code coverage](https://www.g2.com/categories/static-code-analysis)
    - embold
    - codebeat
    - codacy
  - [analysis](https://shields.io/category/analysis)
    - code climate
    - snyk
    - dependabot
- [majestic?](https://github.com/Raathigesh/majestic)
- PRODUCTION LOGIC
- documentation
- remove comment from package.json.husky.hooks.pre-commit to resume testing before each commit
- remove packages from npm registry
- create new orphan branch and re-create conventional commits
- lerna
  - customize package.json
  - generate CHANGELOG
  - release README.md, LICENSE, CHANGELOG
- [badges](https://shields.io)
  - analysis tools
  - build/ci/cd
  - code coverage
  - docs
  - github issues
  - license
  - node version
  - npm bundle size
  - npm download count
  - npm version


##### [Creative Commons Attribution NonCommercial NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.txt)

---

## Developer

#### Basic Workflow

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
