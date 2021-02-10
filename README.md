# Atrackt

#### A library for making complex tracking & analytics easier

---

### Basic Usage

> _...more info on each step after the example_

```js
// SCRIPTS
// ...import core - always required
import Atrackt from '@atrackt/core'

// ...import handler - required for browser
import '@atrackt/handler-dom'

// ...import service(s) - requires 1 or more
import '@atrackt/service-adobe-analytics'

// ...import console - not for production
import '@atrackt/core/console'

// BIND
// ...bind events to dom elements - requires a loaded handler
Atrackt.setEvents({
  click: '.click',
})

// INITIALIZE
// ...sets up your environment
Atrackt.start()

// IMPLEMENT
// ...track data manually when a dom event isn't triggered - good for SPA
Atrackt.track(
  {
    data: {
      key: 'value',
    },
  },
  {
    options: {
      key: 'value',
    },
  }
)
```

---

### IMPORT/REQUIRE/SCRIPT

```js
// IMPORT
import Atrackt from '@atrackt/core'
import '@atrackt/handler-dom'
import '@atrackt/service-adobe-analytics'
import '@atrackt/core/console'

// REQUIRE
const Atrackt = require '@atrackt/core'
require '@atrackt/handler-dom'
require '@atrackt/service-adobe-analytics'
require '@atrackt/core/console'
```

```html
<!-- SCRIPT -->
<script type="module" src="/path/to/@atrackt/core/atrackt.js"></script>
<script type="module" src="/path/to/@atrackt/handler-dom/dom.js"</script>
<script type="module" src="/path/to/@atrackt/service-adobe-analytics/adobe-analytics.js"</script>
<script type="module" src="/path/to/@atrackt/core/console.js"</script>
```

### BIND

```js
// only used with a handler in a browser
// setEvents takes an object with the key is the event name, and the value is based on the handler that was set
Atrackt.setEvents({
  // this will bind a click event on all dom elements with the class `click`
  click: '.click',
})
```

### INITIALIZE

```js
// after handler is set, or if not using a handler
Atrackt.start()
```

---

### CUSTOM HANDLER

```js
const Atrackt = new Core({ config: {...} })

// ...or write your own service(s)
Atrackt.setService({
  name: 'My Service',
    submit: (data, options) => {
    // with data & options, make any needed adjustments, & submit the data it to the service
  },
})

Atrackt.setEvents({
  click: '.click' // track click events on elements with `click` css class
})


// ...or write your own handler
import Handler from '@atrackt/core/handler'

new Handler({
  name: 'My Handler',
  setEvents: (eventObject) => {
    // use eventObject to bind event key to element
  },
})

```

##### Initialize & Configure

```js
// initialize atrackt with optional configuration (see below)
const Atrackt = new Core({ config: {...} })
```

##### Support tracking DOM elements

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

##### Set a Handler

```js
// import an element handler
import '@atrackt/handler-dom'

// or write your own handler
import Handler from '@atrackt/core/handler'

new Handler({
  name: 'My Handler',
  setEvents: (eventObject) => {
    // use eventObject to bind event key to element
  },
})
```

##### Set Services

```js
// import services
import '@atrackt/service-adobe-analytics'

// write your own service
Atrackt.setService({
  name: 'My Service',
  submit: (data, options) => {
    // with the passed data & options, make any needed adjustments, & submit the data it to the service
  },
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
    option: 'object',
  },
})
```

---

## Development

#### Setup Environment

> ##### Install Dependencies
>
> - [git](https://git-scm.com)
> - [node.js](https://nodejs.org)
> - [yarn](https://yarnpkg.com)

```sh
# clone repository
git clone git@github.com:atrackt/atrackt.git

# change to atrackt directory
cd atrackt

# configure git
git config --local include.path ../.gitconfig

# install node dependencies
yarn
```

```sh
# run tests
yarn test

# run demo
yarn demo
```

---

## Todo: Production

- easily include/change data via js w/out using atrackt-function
- allow setting data & event via atrackt.track
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
- create new orphan branch & re-create conventional commits
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
