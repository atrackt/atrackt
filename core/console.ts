import './console.sass'
import Failure from '@atrackt/core/failure'

export default class Console {
  constructor() {
    if (!this.validate()) {
      return
    }

    window.Atrackt.enableConsole()
    this.setupConsole()
  }

  private validate() {
    if (!window) {
      throw new Failure('Console can only be used in the browser')
    }

    if (!window.Atrackt) {
      throw new Failure('A handler must be initialized')
    }

    return (
      window.location.search.includes('atracktConsole') ||
      window.localStorage.getItem('atracktConsole') == 'true'
    )
  }

  private setupConsole() {
    // start all console logic
  }
}

new Console()
