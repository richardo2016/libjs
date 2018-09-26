/* global describe, it, before */
const test = require('test');
test.setup();

function testor (mod, prefixer = '') {
  describe(`${prefixer} 测试 iterator 是否正确`, () => {
    const iterator = mod.iterator;

    describe('iteratorable', () => {
      it(`iterator.iteratorable({}) === false`, () => {
        assert.equal(iterator.iteratorable({}), false);
      });

      it(`iterator.iteratorable([]) === true`, () => {
        assert.equal(iterator.iteratorable([]), true);
      });

      it(`iterator.iteratorable(new Set()) === true`, () => {
        assert.equal(iterator.iteratorable(new Set()), true);
      });

      it(`iterator.iteratorable(new Map()) === true`, () => {
        assert.equal(iterator.iteratorable(new Map()), true);
      });

      it(`custom iteratable object`, () => {
        // view detail in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
        const iterable = new Object();
        assert.equal(iterator.iteratorable(iterable), false);

        iterable[Symbol.iterator] = function* () {
          yield 1;
          yield 2;
          yield 3;
        };
        assert.equal(iterator.iteratorable(iterable), true);
      })
    });

    describe('selfIteratorable', () => {
      it(`iterator.selfIteratorable({}) === false`, () => {
        assert.equal(iterator.selfIteratorable({}), false);
      });

      it(`iterator.selfIteratorable([]) === false`, () => {
        assert.equal(iterator.selfIteratorable([]), false);
      });

      it(`iterator.selfIteratorable(new Set()) === false`, () => {
        assert.equal(iterator.selfIteratorable(new Set()), false);
      });

      it(`iterator.selfIteratorable(new Map()) === false`, () => {
        assert.equal(iterator.selfIteratorable(new Map()), false);
      });

      it(`custom iteratable object`, () => {
        const iterable = new Object();
        assert.equal(iterator.selfIteratorable(iterable), false);

        iterable[Symbol.iterator] = function* () {
          yield 1;
          yield 2;
          yield 3;
        };
        assert.equal(iterator.selfIteratorable(iterable), true);
      })
    });

    describe('enumKeyMirror', () => {
      const testArr = [1, 2, 3, 4, 5]
      const nonKVRepetObject = {
        a: 1,
        b: 2,
        3: 'c',
        4: 'd',
        e: '5e',
        _f: '6',
        null: undefined
      }

      it('enumKeyMirror(array)', () => {
        const result = iterator.enumKeyMirror(testArr)

        testArr.forEach(v => assert.isTrue(result[v] === v.toString()))
      })

      it('exception: enumKeyMirror(null)', () => {
        assert.throws(() => iterator.enumKeyMirror(null))
      })

      it('enumKeyMirror(object)', () => {
        const result = iterator.enumKeyMirror(nonKVRepetObject)

        Object.keys(result).forEach((resultK, _) => {
          const v = result[resultK]
          assert.isTrue(result[resultK] === v)
          assert.isTrue(result[v] === resultK)
        })
      })
    });
  });
}

testor(require('../lib/cjs').struct, '[cjs]')
testor(require('../lib/umd').struct, '[umd]')

test.run(console.DEBUG);
