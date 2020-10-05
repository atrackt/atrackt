import './console.sass'
import { AtracktError } from '@atrackt/core'

export default class Console {
  constructor() {
    if (!this.validate()) {
      return
    }
    window.atrackt.enableConsole()
    this.setupConsole()
  }

  private validate() {
    if (typeof window !== 'object') {
      throw new AtracktError('Console can only be used in the browser')
    }

    if (!(window.atrackt instanceof Object)) {
      throw new AtracktError('A handler must be initialized')
    }

    return window.location.search.includes('atracktConsole') || window.localStorage.getItem('atracktConsole') == 'true'
  }

  private setupConsole() {
    // start all console logic
  }
}

new Console()
