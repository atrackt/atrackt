#### Testing Outline

```js
describe('CORE', () => {
  context('when functions called on Atrackt', () => {
    describe('setService', () => {
      context('with an invalid service', () => {
        beforeEach(() => {
          atrackt.services = {}
        })
        context('without a valid name', () => {
          it('should throw an error', () => {
            var invalidService
            invalidService = () => {
              Core.setService()
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/name/)
            expect(invalidService).toThrow(/valid/)
            invalidService = () => {
              Core.setService({
                name: 1,
              })
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/name/)
            expect(invalidService).toThrow(/invalid/)
          })
        })
        context('without a valid submit function', () => {
          it('should throw an error', () => {
            var invalidService
            invalidService = () => {
              Core.setService({
                name: 'foo',
              })
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/submit/)
            expect(invalidService).toThrow(/function/)
            invalidService = () => {
              Core.setService({
                name: 'foo',
                submit: 'submit',
              })
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/submit/)
            expect(invalidService).toThrow(/function/)
          })
        })
        context(
          'when a service with the same name is already registered',
          () => {
            it('should throw an error', () => {
              var invalidService
              Core.setService({
                name: 'foo',
                submit: () => {},
              })
              invalidService = () => {
                Core.setService({
                  name: 'foo',
                  submit: () => {},
                })
              }
              expect(invalidService).toThrow(Failure)
              expect(invalidService).toThrow(/registered/)
            })
          }
        )
      })
      context('with valid service', () => {
        var validService
        validService = void 0
        beforeAll(() => {
          validService = Core.setService({
            name: 'Foo Service',
            submit: () => {},
          })
        })
        it('should register the service', () => {
          expect(atrackt.services).toHaveProperty(validService.key)
        })
        it('should add service variables', () => {
          expect(validService.key).toEqual('foo_service')
          expect(validService.name).toEqual('Foo Service')
        })
        it('should expose service functions', () => {
          expect(validService.setData).toBeInstanceOf(Function)
          expect(validService.setEvents).toBeInstanceOf(Function)
          expect(validService.setOptions).toBeInstanceOf(Function)
          expect(validService.setCallback).toBeInstanceOf(Function)
          expect(validService.track).toBeInstanceOf(Function)
        })
        it('should add service objects', () => {
          expect(validService.data).toMatchObject({})
          expect(validService.options).toMatchObject({})
          expect(validService.callbacks).toMatchObject({
            before: [],
            after: [],
          })
        })
        it('should the service object', () => {
          expect(validService).toBeInstanceOf(Object)
        })
      })
    })
    describe('setEvents', () => {
      it('should support passing a single element selectors', () => {})
      it('should support passing an array of element selectors', () => {})
      it('should add the element selectors to the global `_events` object', () => {})
      it('should not add element selectors to service `_events` objects', () => {})
      it('should call _getElements for each element selectors passed', () => {})
      it('should call _registerElement for each element, for each event type', () => {})
      it('should be called when observing for new elements', () => {})
      it('should the context', () => {})
      context('when called with serviceName argument', () => {})
    })
    describe('setData', () => {
      it('should add data to the global `data` object', () => {})
      it('should not add data to the service `data` objects', () => {})
      it('should merge with existing data', () => {})
      it('should log a warning when overwriting existing data', () => {})
      it('should the context', () => {})
    })
    describe('setOptions', () => {
      it('should add options to the global options object', () => {})
      it('should not add options to service options objects', () => {})
      it('should merge with existing options', () => {})
      it('should log a warning when overwriting existing data', () => {})
      it('should the context', () => {})
    })
    describe('setCallback', () => {
      it('should only allow approved callbacks', () => {})
      it('should add callback to the global `callbacks` object', () => {})
      it('should not add callback to the service `callbacks` objects', () => {})
      it('should allow multiple callbacks of the same type', () => {})
      it('should the context', () => {})
    })
    describe('track', () => {
      it('should the context', () => {})
      context('when tracking an element', () => {
        it('should track if `data-atrackt-services` is set to all', () => {})
        it('should track if `data-atrackt-services` contains the service name', () => {})
        it('should not track if `data-atrackt-services` does not contain all or the service name', () => {})
        context('when `data-atrackt-services` is set to all', () => {
          it('should call `_submit`', () => {})
        })
      })
      context('when tracking an object', () => {
        it('should track if options.services equals or contains the service name', () => {})
        it('should track if options.services is not set', () => {})
      })
    })
    describe('_callCallbacks', () => {})
    describe('_formatObjectKey', () => {})
    describe('_getService', () => {})
    describe('_trackObject', () => {})
    describe('_validateService', () => {})

    // Utility Functions

    describe('_mergeObjectArrays', () => {})
    describe('_mergeObjects', () => {})
    describe('_mergeObjectsShallow', () => {})

    // Element Functions

    describe('_bindEvent', () => {
      it('should throw an error', () => {
        var serviceMethod
        serviceMethod = () => {
          Core.bindEvent()
        }
        expect(serviceMethod).toThrow(Failure)
        expect(serviceMethod).toThrow(/_bindEvent/)
      })
    })
    describe('_getElementMetaData', () => {})
    describe('_getElements', () => {})
    describe('_getLocation', () => {})
    describe('_getTitle', () => {})
    describe('_getValue', () => {})
    describe('_isElement', () => {})
    describe('_registerElement', () => {})
    describe('_setElementData', () => {})
    describe('_setElementEvent', () => {})
    describe('_trackElement', () => {})
  })

  context('when functions called on a single service', () => {
    describe('setService', () => {
      context('when called without a name', () => {
        it('should throw an error', () => {})
      })
      context('when called without a submit function', () => {
        it('should throw an error', () => {})
      })
      context('with valid service', () => {
        var validService
        validService = void 0
        beforeAll(() => {
          validService = Core.setService('Foo Service', {
            submit: () => {},
          })
        })
        it('should register the service', () => {})
        it('should add service variables', () => {})
        it('should expose service functions', () => {})
        it('should add service objects', () => {})
        it('should the service object', () => {})
      })
    })
    describe('setEvents', () => {
      it('should support passing a single element selectors', () => {})
      it('should support passing an array of element selectors', () => {})
      it('should add the element selectors to the global `_events` object', () => {})
      it('should not add element selectors to service `_events` objects', () => {})
      it('should call _getElements for each element selectors passed', () => {})
      it('should call _registerElement for each element, for each event type', () => {})
      it('should be called when observing for new elements', () => {})
      it('should the context', () => {})
      context('when called with serviceName argument', () => {})
    })
    describe('setData', () => {
      it('should add data to the global `data` object', () => {})
      it('should not add data to the service `data` objects', () => {})
      it('should merge with existing data', () => {})
      it('should log a warning when overwriting existing data', () => {})
      it('should the context', () => {})
    })
    describe('setOptions', () => {
      it('should add options to the global options object', () => {})
      it('should not add options to service options objects', () => {})
      it('should merge with existing options', () => {})
      it('should log a warning when overwriting existing data', () => {})
      it('should the context', () => {})
    })
    describe('setCallback', () => {
      it('should only allow approved callbacks', () => {})
      it('should add callback to the global `callbacks` object', () => {})
      it('should not add callback to the service `callbacks` objects', () => {})
      it('should allow multiple callbacks of the same type', () => {})
      it('should the context', () => {})
    })
    describe('track', () => {
      it('should the context', () => {})
      context('when tracking an element', () => {
        it('should track if `data-atrackt-services` is set to all', () => {})
        it('should track if `data-atrackt-services` contains the service name', () => {})
        it('should not track if `data-atrackt-services` does not contain all or the service name', () => {})
        context('when `data-atrackt-services` is set to all', () => {
          it('should call `_submit`', () => {})
        })
      })
      context('when tracking an object', () => {
        it('should track if options.services equals or contains the service name', () => {})
        it('should track if options.services is not set', () => {})
      })
    })
    describe('_callCallbacks', () => {})
    describe('_formatObjectKey', () => {})
    describe('_getService', () => {})
    describe('_trackObject', () => {})
    describe('_validateService', () => {})

    // Utility Functions

    describe('_mergeObjectArrays', () => {})
    describe('_mergeObjects', () => {})
    describe('_mergeObjectsShallow', () => {})

    // Element Functions

    describe('_bindEvent', () => {
      it('should throw an error', () => {})
    })
    describe('_getElementMetaData', () => {})
    describe('_getElements', () => {})
    describe('_getLocation', () => {})
    describe('_getTitle', () => {})
    describe('_getValue', () => {})
    describe('_isElement', () => {})
    describe('_registerElement', () => {})
    describe('_setElementData', () => {})
    describe('_setElementEvent', () => {})
    describe('_trackElement', () => {})
  })
})
```
