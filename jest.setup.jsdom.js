// add support for the context alias
global.context = global.describe

// console
// the console is auto-instantiated so need to prevent throwing exceptions
window.Atrackt = {
  enableConsole: () => {},
  services: {},
  setService: () => {},
}
