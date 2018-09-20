/* global describe, it, before */
const test = require('test');
test.setup();

const {constant} = require('../lib/cjs');
const alphabet = constant.alphabet;

describe('测试 constant 是否正确', () => {
  before(() => {
  });

  describe('keymirror', () => {
    const keyMirrows = alphabet.generateKeyMirror()
    it(`alphabet.keymirror 含有 a <-> 97`, () => {
      assert.equal(keyMirrows.a, 97)
      assert.equal(keyMirrows[97], 'a')
    })
    it(`alphabet.keymirror 含有 A <-> 65`, () => {
      assert.equal(keyMirrows.A, 65)
      assert.equal(keyMirrows[65], 'A')
    })
  });

  describe('list', () => {
    const list = alphabet.generateList();
    it(`alphabet.list 长度为 52`, () => {
      assert.equal(list.length, 52)
    })
    it(`alphabet.list 第 27 位为 a`, () => {
      assert.equal(list[26], 'a')
    })
    it(`alphabet.list 第 26 位为 A`, () => {
      assert.equal(list[25], 'A')
    })
    it(`alphabet.list 第 52 位为 z`, () => {
      assert.equal(list[51], 'z')
    })
    it(`alphabet.list 第 1 位为 Z`, () => {
      assert.equal(list[0], 'Z')
    })
  });
});

test.run(console.DEBUG);