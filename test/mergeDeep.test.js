'use strict'

const { expect } = require('chai')

const mergeDeep = require('../dist')

describe('Values are primitive data types', () => {
  describe('both params have a truthy value', () => {
    const target = 'x'
    const source = 'y'

    it('returns source', () => {
      expect(mergeDeep(target, source)).to.be.equal(source)
    })
  })

  describe('only the target value is falsy', () => {
    const target = ''
    const source = 'x'

    it('returns source', () => {
      expect(mergeDeep(target, source)).to.be.equal(source)
    })
  })

  describe('only the source value is falsy', () => {
    const target = 'x'
    const source = ''

    it('returns target', () => {
      expect(mergeDeep(target, source)).to.be.equal(target)
    })
  })
})

describe('Values are objects', () => {
  describe('only the target is an object', () => {
    const target = { a: 'a', b: 'b', c: '', d: 'x' }
    const source = 'a'

    describe('returns a new object', () => {
      describe('the object', () => {
        it('includes all keys and values of target', () => {
          expect(mergeDeep(target, source)).to.include(target)
        })
      })
    })
  })

  describe('only the source is an object', () => {
    const target = 'a'
    const source = { e: 'a', b: '', c: 'c', d: 'z' }

    describe('returns a new object', () => {
      describe('the object', () => {
        it('includes all keys and values of source', () => {
          expect(mergeDeep(target, source)).to.include(source)
        })
      })
    })
  })

  describe('both parameters are objects', () => {
    const target = { a: 'a', b: 'b', c: '', d: 'x' }
    const source = { e: 'a', b: '', c: 'c', d: 'z' }

    describe('returns a new object', () => {
      describe('the object', () => {
        it('includes all keys of target', () => {
          expect(mergeDeep(target, source)).includes.all.keys(target)
        })

        it('includes all keys of source', () => {
          expect(mergeDeep(target, source)).includes.all.keys(source)
        })

        describe('the key exists in both params objects', () => {
          describe('has value only in target key', () => {
            const KEY = 'b'

            describe('the key in returned object', () => {
              it('is equals to target key', () => {
                expect(mergeDeep(target, source)[KEY]).to.be.equal(target[KEY])
              })
            })
          })

          describe('has value only in source key', () => {
            const KEY = 'c'

            describe('the key in returned object', () => {
              it('is equals to source key', () => {
                expect(mergeDeep(target, source)[KEY]).to.be.equal(source[KEY])
              })
            })
          })

          describe('has value in both keys', () => {
            const KEY = 'd'

            describe('the key in returned object', () => {
              it('is equals to source key', () => {
                expect(mergeDeep(target, source)[KEY]).to.be.equal(source[KEY])
              })
            })
          })

          describe('the property is an object', () => {
            describe('the returned property', () => {
              it('includes a recursive call result (has all keys and value as called unitarily)', () => {
                const KEY = 'object'
                target[KEY] = { ...target }
                source[KEY] = { ...source }

                const objectKeysMergeResult = mergeDeep(target[KEY], source[KEY])

                expect(mergeDeep(target, source)[KEY]).to.include(objectKeysMergeResult)
              })
            })
          })
        })
      })
    })
  })
})

describe('Values are arrays', () => {
  describe('only the target is an object', () => {
    const target = ['c']
    const source = 'a'

    describe('returns a new array', () => {
      describe('the array', () => {
        it('includes all items of the target', () => {
          expect(mergeDeep(target, source)).to.include.members(target)
        })

        it('includes the source as a new item', () => {
          expect(mergeDeep(target, source)).to.include(source)
        })
      })
    })
  })

  describe('only the source is an array', () => {
    const target = 'c'
    const source = ['a']

    describe('returns a new array', () => {
      describe('the array', () => {
        it('includes all items of the source', () => {
          expect(mergeDeep(target, source)).to.include.members(source)
        })

        it('includes the target as a new item', () => {
          expect(mergeDeep(target, source)).to.include(target)
        })
      })
    })
  })

  describe('both parameters are arrays', () => {
    const target = ['c']
    const source = ['a']

    describe('returns a new array', () => {
      describe('the array', () => {
        it('includes all items of the target', () => {
          expect(mergeDeep(target, source)).to.include.members(target)
        })

        it('includes all items of the source', () => {
          expect(mergeDeep(target, source)).to.include.members(source)
        })
      })
    })
  })

  describe('the params have duplicated element', () => {
    const target = ['a', 'b', 'c']
    const source = ['a', 'd', 'd']

    const UNIQUE_ELEMENTS_LENGTH = 4

    describe('return a new array', () => {
      describe('the array', () => {
        it('includes all items of the target', () => {
          expect(mergeDeep(target, source)).to.include.members(target)
        })

        it('includes all items of the source', () => {
          expect(mergeDeep(target, source)).to.include.members(source)
        })

        it('has length equal to the amount of unique element', () => {
          expect(mergeDeep(target, source)).to.have.lengthOf(UNIQUE_ELEMENTS_LENGTH)
        })
      })
    })
  })
})
