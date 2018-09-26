/* global describe, it, before */
const test = require('test');
test.setup();

function testor (mod, prefixer = '') {
  const number = mod.number;
  describe(`${prefixer} primitive.number`, () => {
    const coerceNumber = number.coerce;
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
}

testor(require('../lib/cjs').primitive, '[cjs]')
testor(require('../lib/umd').primitive, '[umd]')

test.run(console.DEBUG);
