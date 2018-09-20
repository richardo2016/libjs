/* global describe, it, before */
const test = require('test');
test.setup();

const {primitive} = require('../lib/cjs');
const number = primitive.number;

describe('primitive.number', () => {
  before(() => {
  });

  const coerceNumber = number.coerceNumber;
  describe('coerceNumber', () => {
    it(`coerceNumber('abc') === undefined`, () => {
      assert.equal(coerceNumber('abc'), undefined)
    })
    it(`coerceNumber('1') === 1`, () => {
      assert.equal(coerceNumber('1'), 1)
    })
    it(`coerceNumber('') === undefined`, () => {
      assert.equal(coerceNumber(''), undefined)
    })
    it(`coerceNumber(null) === undefined`, () => {
      assert.equal(coerceNumber(null), undefined)
    })
    it(`coerceNumber() === undefined`, () => {
      assert.equal(coerceNumber(undefined), undefined)
    })
    it(`coerceNumber(Infinity) === undefined`, () => {
      assert.equal(coerceNumber(Infinity), Infinity)
    })
    it(`coerceNumber(Object) === undefined`, () => {
      assert.equal(coerceNumber(Object), undefined)
    })
    it(`coerceNumber(() => {}) === undefined`, () => {
      assert.equal(coerceNumber(() => {}), undefined)
    })
  });
});

test.run(console.DEBUG);