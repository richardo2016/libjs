/* global describe, it, before */
const test = require('test');
test.setup();

function testor (mod, prefixer = '') {
  describe(`${prefixer} 测试 built-in/object 功能是否正确`, () => {
    describe('list2keymirror', () => {
      const list2keymirror = mod.object.list2keymirror

      it(`list2keymirror([1, 2, 3]) -> {1: 1, 2: 2, 3: 3}`, () => {
        assert.equal(
          JSON.stringify(list2keymirror([1, 2, 3])),
          `{"1":1,"2":2,"3":3}`
        )
      })

      it(`list2keymirror(['1', 2, '3']) -> {1: 1, 2: 2, 3: 3}`, () => {
        assert.equal(
          JSON.stringify(list2keymirror([1, 2, 3])),
          `{"1":1,"2":2,"3":3}`
        )
      })
    })

    describe('foreachObject', () => {
      const foreachObject = mod.object.foreachObject

      it(`foreachObject check`, () => {
        let test = []
        foreachObject({a: 1, b: 2, c: 3}, function (value, key, object) {
          test.push(`${key}:${value}`)
        })
        test = test.join(' ')

        assert.equal(test, `a:1 b:2 c:3`)
      })
    })

    describe('filterObject', () => {
      const filterObject = mod.object.filterObject

      it(`filterObject with dropKeys only 1`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        filterObject(testObj, ['a', 'b'])
        let test = JSON.stringify(testObj)
        assert.equal(test, `{"c":3}`)
      })

      it(`filterObject with dropKeys only 2`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        filterObject(testObj, {dropKeys: ['a', 'b']})
        let test = JSON.stringify(testObj)
        assert.equal(test, `{"c":3}`)
      })

      it(`filterObject with leaveKeys`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        filterObject(testObj, {leaveKeys: ['a']})
        let test = JSON.stringify(testObj)
        assert.equal(test, `{"a":1}`)
      })
    })

    describe('ofObject', () => {
      const ofObject = mod.object.ofObject

      it(`ofObject strictly 1`, () => {
        let result = ofObject(2, {a: 1, b: 2, c: 3})
        assert.equal(result, true)
      })

      it(`ofObject strictly 2`, () => {
        let result = ofObject(4, {a: 1, b: 2, c: 3})
        assert.equal(result, false)
      })

      it(`ofObject instrictly`, () => {
        let result = ofObject('2', {a: 1, b: 2, c: 3}, {strict: false})
        assert.equal(result, true)
      })
    })

    describe('view', () => {
      const view = mod.object.view

      it(`view object`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        let descriptors = view(testObj)
        let test = JSON.stringify(descriptors)
        assert.equal(test, `{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"value":2,"writable":true,"enumerable":true,"configurable":true},"c":{"value":3,"writable":true,"enumerable":true,"configurable":true}}`)

        testObj = {
          a: 1,
          get b () {
            return 2
          },
          set b (val) {}
        }
        descriptors = view(testObj)
        assert.equal(descriptors.a.value, 1)
        assert.equal(descriptors.a.writable, true)
        assert.equal(descriptors.a.enumerable, true)
        assert.equal(descriptors.a.configurable, true)

        assert.equal(JSON.stringify(descriptors), `{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"enumerable":true,"configurable":true}}`)
        assert.equal(typeof descriptors.b.get, 'function')
        assert.equal(descriptors.b.writable, undefined)
        assert.equal(descriptors.b.enumerable, true)
        assert.equal(descriptors.b.configurable, true)
      })
    })

    describe('viewField', () => {
      const viewField = mod.object.viewField

      it(`viewField/secretObj`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        let descriptorA = viewField(testObj, 'a')
        let test = JSON.stringify(descriptorA)
        assert.equal(test, `{"value":1,"writable":true,"enumerable":true,"configurable":true}`)

        assert.equal(descriptorA.value, 1)
        assert.equal(descriptorA.writable, true)
        assert.equal(descriptorA.enumerable, true)
        assert.equal(descriptorA.configurable, true)

        const secretObj = mod.object.secretObj
        secretObj(testObj, 'b')
        let descriptorB = viewField(testObj, 'b')

        assert.equal(descriptorB.value, 2)
        assert.equal(descriptorB.writable, true)
        assert.equal(descriptorB.enumerable, false)
        assert.equal(descriptorB.configurable, true)

        const solidifyObj = mod.object.solidifyObj
        solidifyObj(testObj, 'c')
        let descriptorC = viewField(testObj, 'c')

        assert.equal(descriptorC.value, 3)
        assert.equal(descriptorC.writable, false)
        assert.equal(descriptorC.enumerable, false)
        assert.equal(descriptorC.configurable, false)
      })
    })
  })
}

testor(require('../lib/cjs').builtIn, '[cjs]');
testor(require('../lib/umd').builtIn, '[umd]');

test.run(console.DEBUG);
