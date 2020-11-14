// add support for the context alias
global.context = global.describe

// mock Failure with vanilla JS Error
jest.mock('@atrackt/core/failure', () => Error)

// the console is auto-instantiated so need to prevent throwing exceptions
window.Atrackt = {}
