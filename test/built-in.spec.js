/* global describe, it, before */
// NODE_ENV=test ./node_modules/.bin/mocha --compilers js:babel-core/register --colors -w ./test/built-in.spec.js
import chai from 'chai';
import {builtin} from '../dist/biz-strategy.js';

chai.expect();

const expect = chai.expect;

describe('测试 built-in/object 功能是否正确', () => {
  describe('list2keymirror', () => {
    const list2keymirror = builtin.object.list2keymirror

    it(`list2keymirror([1, 2, 3]) -> {1: 1, 2: 2, 3: 3}`, () => {
      expect(JSON.stringify(list2keymirror([1, 2, 3]))).to.be.equals(`{"1":1,"2":2,"3":3}`)
    })

    it(`list2keymirror(['1', 2, '3']) -> {1: 1, 2: 2, 3: 3}`, () => {
      expect(JSON.stringify(list2keymirror([1, 2, 3]))).to.be.equals(`{"1":1,"2":2,"3":3}`)
    })
  })

  describe('foreachObject', () => {
    const foreachObject = builtin.object.foreachObject

    it(`foreachObject check`, () => {
      let test = []
      foreachObject({a: 1, b: 2, c: 3}, function (value, key, object) {
        test.push(`${key}:${value}`)
      })
      test = test.join(' ')

      expect(test).to.be.equals(`a:1 b:2 c:3`)
    })
  })

  describe('filterObject', () => {
    const filterObject = builtin.object.filterObject

    it(`filterObject with dropKeys only 1`, () => {
      let testObj = {a: 1, b: 2, c: 3}
      filterObject(testObj, ['a', 'b'])
      let test = JSON.stringify(testObj)
      expect(test).to.be.equals(`{"c":3}`)
    })

    it(`filterObject with dropKeys only 2`, () => {
      let testObj = {a: 1, b: 2, c: 3}
      filterObject(testObj, {dropKeys: ['a', 'b']})
      let test = JSON.stringify(testObj)
      expect(test).to.be.equals(`{"c":3}`)
    })

    it(`filterObject with leaveKeys`, () => {
      let testObj = {a: 1, b: 2, c: 3}
      filterObject(testObj, {leaveKeys: ['a']})
      let test = JSON.stringify(testObj)
      expect(test).to.be.equals(`{"a":1}`)
    })
  })

  describe('ofObject', () => {
    const ofObject = builtin.object.ofObject

    it(`ofObject strictly 1`, () => {
      let result = ofObject(2, {a: 1, b: 2, c: 3})
      expect(result).to.be.equals(true)
    })

    it(`ofObject strictly 2`, () => {
      let result = ofObject(4, {a: 1, b: 2, c: 3})
      expect(result).to.be.equals(false)
    })

    it(`ofObject instrictly`, () => {
      let result = ofObject('2', {a: 1, b: 2, c: 3}, {strict: false})
      expect(result).to.be.equals(true)
    })
  })

  describe('view', () => {
    const view = builtin.object.view

    it(`view object`, () => {
      let testObj = {a: 1, b: 2, c: 3}
      let descriptors = view(testObj)
      let test = JSON.stringify(descriptors)
      expect(test).to.be.equals(`{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"value":2,"writable":true,"enumerable":true,"configurable":true},"c":{"value":3,"writable":true,"enumerable":true,"configurable":true}}`)

      testObj = {
        a: 1,
        get b () {
          return 2
        },
        set b (val) {}
      }
      descriptors = view(testObj)
      expect(descriptors.a.value).to.be.equals(1)
      expect(descriptors.a.writable).to.be.equals(true)
      expect(descriptors.a.enumerable).to.be.equals(true)
      expect(descriptors.a.configurable).to.be.equals(true)

      expect(JSON.stringify(descriptors)).to.be.equals(`{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"enumerable":true,"configurable":true}}`)
      expect(typeof descriptors.b.get).to.be.equals('function')
      expect(descriptors.b.writable).to.be.equals(undefined)
      expect(descriptors.b.enumerable).to.be.equals(true)
      expect(descriptors.b.configurable).to.be.equals(true)
    })
  })

  describe('view', () => {
    const view = builtin.object.view
    const viewField = builtin.object.viewField

    it(`view object`, () => {
      let testObj = {a: 1, b: 2, c: 3}
      let descriptors = view(testObj)
      let test = JSON.stringify(descriptors)
      expect(test).to.be.equals(`{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"value":2,"writable":true,"enumerable":true,"configurable":true},"c":{"value":3,"writable":true,"enumerable":true,"configurable":true}}`)

      testObj = {
        a: 1,
        get b () {
          return 2
        },
        set b (val) {}
      }
      descriptors = view(testObj)
      expect(descriptors.a.value).to.be.equals(1)
      expect(descriptors.a.writable).to.be.equals(true)
      expect(descriptors.a.enumerable).to.be.equals(true)
      expect(descriptors.a.configurable).to.be.equals(true)

      expect(JSON.stringify(descriptors)).to.be.equals(`{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"enumerable":true,"configurable":true}}`)
      expect(typeof descriptors.b.get).to.be.equals('function')
      expect(descriptors.b.writable).to.be.equals(undefined)
      expect(descriptors.b.enumerable).to.be.equals(true)
      expect(descriptors.b.configurable).to.be.equals(true)
    })

    it(`viewField`, () => {
      let testObj = {a: 1, b: 2, c: 3}
      let descriptorA = viewField(testObj, 'a')
      let test = JSON.stringify(descriptorA)
      expect(test).to.be.equals(`{"value":1,"writable":true,"enumerable":true,"configurable":true}`)

      expect(descriptorA.value).to.be.equals(1)
      expect(descriptorA.writable).to.be.equals(true)
      expect(descriptorA.enumerable).to.be.equals(true)
      expect(descriptorA.configurable).to.be.equals(true)

      const secretObj = builtin.object.secretObj
      secretObj(testObj, 'b')
      let descriptorB = viewField(testObj, 'b')

      expect(descriptorB.value).to.be.equals(2)
      expect(descriptorB.writable).to.be.equals(true)
      expect(descriptorB.enumerable).to.be.equals(false)
      expect(descriptorB.configurable).to.be.equals(true)

      const solidifyObj = builtin.object.solidifyObj
      solidifyObj(testObj, 'c')
      let descriptorC = viewField(testObj, 'c')

      expect(descriptorC.value).to.be.equals(3)
      expect(descriptorC.writable).to.be.equals(false)
      expect(descriptorC.enumerable).to.be.equals(false)
      expect(descriptorC.configurable).to.be.equals(false)
    })
  })
})

describe('测试 built-in/function 功能是否正确', () => {
  const _function = builtin['function'];

  function map(fn, list) {
    return list.map(fn)
  }

  describe('curry', () => {
    const curry = _function.curry;

    it(`curry(map, addone)([1, 2, 3, 4])[0] === 2`, () => {
      let mapPlusOne = curry(map, (x) => x + 1)

      let res = mapPlusOne([1, 2, 3, 4])
      expect(res[0]).to.be.equals(2)
      expect(res[1]).to.be.equals(3)
      expect(res[2]).to.be.equals(4)
      expect(res[3]).to.be.equals(5)

      let match = curry((what, str) => {
        return str.match(what)
      })
      expect(typeof match(/\s+/g)).to.be.equals('function')

      let hasSpaces = match(/\s+/g, ' ');
      expect(hasSpaces[0]).to.be.equals(' ')
    })
  })
})
