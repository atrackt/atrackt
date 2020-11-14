// add support for the context alias
global.context = global.describe

// mock Failure with vanilla JS Error
jest.mock('@atrackt/core/failure', () => Error)

// set window to be undefined to prevent jest environment warnings
global.window = undefined
