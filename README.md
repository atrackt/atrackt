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
- [jsdoc](https://jsdoc.app/tags-member.html)
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
