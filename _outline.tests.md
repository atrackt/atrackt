#### Testing Outline

```js
describe('CORE', () => {
  context('when functions called on Atrackt', function () {
    describe('setService', function () {
      context('with an invalid service', function () {
        beforeEach(function () {
          atrackt.services = {}
        })
        context('without a valid name', function () {
          it.skip('should throw an error', function () {
            var invalidService
            invalidService = function () {
              Core.setService()
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/name/)
            expect(invalidService).toThrow(/valid/)
            invalidService = function () {
              Core.setService({
                name: 1,
              })
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/name/)
            expect(invalidService).toThrow(/invalid/)
          })
        })
        context('without a valid submit function', function () {
          it.skip('should throw an error', function () {
            var invalidService
            invalidService = function () {
              Core.setService({
                name: 'foo',
              })
            }
            expect(invalidService).toThrow(Failure)
            expect(invalidService).toThrow(/submit/)
            expect(invalidService).toThrow(/function/)
            invalidService = function () {
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
          function () {
            it.skip('should throw an error', function () {
              var invalidService
              Core.setService({
                name: 'foo',
                submit: function () {},
              })
              invalidService = function () {
                Core.setService({
                  name: 'foo',
                  submit: function () {},
                })
              }
              expect(invalidService).toThrow(Failure)
              expect(invalidService).toThrow(/registered/)
            })
          }
        )
      })
      context('with valid service', function () {
        var validService
        validService = void 0
        beforeAll(function () {
          validService = Core.setService({
            name: 'Foo Service',
            submit: function () {},
          })
        })
        it.skip('should register the service', function () {
          expect(atrackt.services).toHaveProperty(validService.key)
        })
        it.skip('should add service variables', function () {
          expect(validService.key).toEqual('foo_service')
          expect(validService.name).toEqual('Foo Service')
        })
        it.skip('should expose service functions', function () {
          expect(validService.setData).toBeInstanceOf(Function)
          expect(validService.setEvents).toBeInstanceOf(Function)
          expect(validService.setOptions).toBeInstanceOf(Function)
          expect(validService.setCallback).toBeInstanceOf(Function)
          expect(validService.track).toBeInstanceOf(Function)
        })
        it.skip('should add service objects', function () {
          expect(validService.data).toMatchObject({})
          expect(validService.options).toMatchObject({})
          expect(validService.callbacks).toMatchObject({
            before: [],
            after: [],
          })
        })
        it.skip('should the service object', function () {
          expect(validService).toBeInstanceOf(Object)
        })
      })
    })
    describe('setEvents', function () {
      it.skip('should support passing a single element criteria', function () {})
      it.skip('should support passing an array of element criteria', function () {})
      it.skip('should add the element criteria to the global `_events` object', function () {})
      it.skip('should not add element criteria to service `_events` objects', function () {})
      it.skip('should call _getElements for each element criteria passed', function () {})
      it.skip('should call _registerElement for each element, for each event type', function () {})
      it.skip('should be called when observing for new elements', function () {})
      it.skip('should the context', function () {})
      context('when called with serviceName argument', function () {})
    })
    describe('setData', function () {
      it.skip('should add data to the global `data` object', function () {})
      it.skip('should not add data to the service `data` objects', function () {})
      it.skip('should merge with existing data', function () {})
      it.skip('should log a warning when overwriting existing data', function () {})
      it.skip('should the context', function () {})
    })
    describe('setOptions', function () {
      it.skip('should add options to the global options object', function () {})
      it.skip('should not add options to service options objects', function () {})
      it.skip('should merge with existing options', function () {})
      it.skip('should log a warning when overwriting existing data', function () {})
      it.skip('should the context', function () {})
    })
    describe('setCallback', function () {
      it.skip('should only allow approved callbacks', function () {})
      it.skip('should add callback to the global `callbacks` object', function () {})
      it.skip('should not add callback to the service `callbacks` objects', function () {})
      it.skip('should allow multiple callbacks of the same type', function () {})
      it.skip('should the context', function () {})
    })
    describe('track', function () {
      it.skip('should the context', function () {})
      context('when tracking an element', function () {
        it.skip('should track if `data-atrackt-services` is set to all', function () {})
        it.skip('should track if `data-atrackt-services` contains the service name', function () {})
        it.skip('should not track if `data-atrackt-services` does not contain all or the service name', function () {})
        context('when `data-atrackt-services` is set to all', function () {
          it.skip('should call `_submit`', function () {})
        })
      })
      context('when tracking an object', function () {
        it.skip('should track if options.services equals or contains the service name', function () {})
        it.skip('should track if options.services is not set', function () {})
      })
    })
    describe('_callCallbacks', function () {})
    describe('_formatObjectKey', function () {})
    describe('_getService', function () {})
    describe('_trackObject', function () {})
    describe('_validateService', function () {})

    // Utility Functions

    describe('_mergeObjectArrays', function () {})
    describe('_mergeObjects', function () {})
    describe('_mergeObjectsShallow', function () {})

    // Element Functions

    describe('_bindEvent', function () {
      it.skip('should throw an error', function () {
        var serviceMethod
        serviceMethod = function () {
          Core.bindEvent()
        }
        expect(serviceMethod).toThrow(Failure)
        expect(serviceMethod).toThrow(/_bindEvent/)
      })
    })
    describe('_getElementMetaData', function () {})
    describe('_getElements', function () {})
    describe('_getLocation', function () {})
    describe('_getTitle', function () {})
    describe('_getValue', function () {})
    describe('_isElement', function () {})
    describe('_registerElement', function () {})
    describe('_setElementData', function () {})
    describe('_setElementEvent', function () {})
    describe('_trackElement', function () {})
  })

  context('when functions called on a single service', function () {
    describe('setService', function () {
      context('when called without a name', function () {
        it.skip('should throw an error', function () {})
      })
      context('when called without a submit function', function () {
        it.skip('should throw an error', function () {})
      })
      context('with valid service', function () {
        var validService
        validService = void 0
        beforeAll(function () {
          validService = Core.setService('Foo Service', {
            submit: function () {},
          })
        })
        it.skip('should register the service', function () {})
        it.skip('should add service variables', function () {})
        it.skip('should expose service functions', function () {})
        it.skip('should add service objects', function () {})
        it.skip('should the service object', function () {})
      })
    })
    describe('setEvents', function () {
      it.skip('should support passing a single element criteria', function () {})
      it.skip('should support passing an array of element criteria', function () {})
      it.skip('should add the element criteria to the global `_events` object', function () {})
      it.skip('should not add element criteria to service `_events` objects', function () {})
      it.skip('should call _getElements for each element criteria passed', function () {})
      it.skip('should call _registerElement for each element, for each event type', function () {})
      it.skip('should be called when observing for new elements', function () {})
      it.skip('should the context', function () {})
      context('when called with serviceName argument', function () {})
    })
    describe('setData', function () {
      it.skip('should add data to the global `data` object', function () {})
      it.skip('should not add data to the service `data` objects', function () {})
      it.skip('should merge with existing data', function () {})
      it.skip('should log a warning when overwriting existing data', function () {})
      it.skip('should the context', function () {})
    })
    describe('setOptions', function () {
      it.skip('should add options to the global options object', function () {})
      it.skip('should not add options to service options objects', function () {})
      it.skip('should merge with existing options', function () {})
      it.skip('should log a warning when overwriting existing data', function () {})
      it.skip('should the context', function () {})
    })
    describe('setCallback', function () {
      it.skip('should only allow approved callbacks', function () {})
      it.skip('should add callback to the global `callbacks` object', function () {})
      it.skip('should not add callback to the service `callbacks` objects', function () {})
      it.skip('should allow multiple callbacks of the same type', function () {})
      it.skip('should the context', function () {})
    })
    describe('track', function () {
      it.skip('should the context', function () {})
      context('when tracking an element', function () {
        it.skip('should track if `data-atrackt-services` is set to all', function () {})
        it.skip('should track if `data-atrackt-services` contains the service name', function () {})
        it.skip('should not track if `data-atrackt-services` does not contain all or the service name', function () {})
        context('when `data-atrackt-services` is set to all', function () {
          it.skip('should call `_submit`', function () {})
        })
      })
      context('when tracking an object', function () {
        it.skip('should track if options.services equals or contains the service name', function () {})
        it.skip('should track if options.services is not set', function () {})
      })
    })
    describe('_callCallbacks', function () {})
    describe('_formatObjectKey', function () {})
    describe('_getService', function () {})
    describe('_trackObject', function () {})
    describe('_validateService', function () {})

    // Utility Functions

    describe('_mergeObjectArrays', function () {})
    describe('_mergeObjects', function () {})
    describe('_mergeObjectsShallow', function () {})

    // Element Functions

    describe('_bindEvent', function () {
      it.skip('should throw an error', function () {})
    })
    describe('_getElementMetaData', function () {})
    describe('_getElements', function () {})
    describe('_getLocation', function () {})
    describe('_getTitle', function () {})
    describe('_getValue', function () {})
    describe('_isElement', function () {})
    describe('_registerElement', function () {})
    describe('_setElementData', function () {})
    describe('_setElementEvent', function () {})
    describe('_trackElement', function () {})
  })
})
```