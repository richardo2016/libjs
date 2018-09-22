/* global describe, it, before */
const test = require('test');
test.setup();

function testor(mod, prefixer) {
  const string = mod.string;
  describe(`${prefixer} primitive.string`, () => {
    before(() => {
    });

    const capitalize = string.capitalize;
    describe('capitalize', () => {
      it(`capitalize('abc') === 'Abc'`, () => {
        assert.equal(capitalize('abc'), 'Abc')
      })
      it(`capitalize('') === ''`, () => {
        assert.equal(capitalize(''), '')
      })
      it(`capitalize(NaN) === 'NaN'`, () => {
        assert.equal(capitalize(NaN), 'NaN')
      })
      it(`capitalize(undefined) === 'Undefined'`, () => {
        assert.equal(capitalize(undefined), 'Undefined')
      })
      it(`capitalize(null) === 'Null'`, () => {
        assert.equal(capitalize(null), 'Null')
      })
      it(`capitalize(0) === '0'`, () => {
        assert.equal(capitalize(0), '0')
      })
    })

    const kebab2camel = string.kebab2camel;
    describe('kebab2camel', () => {
      it(`kebab2camel('abc-component') === 'abcComponent'`, () => {
        assert.equal(kebab2camel('abc-component'), 'abcComponent')
      });

      it(`kebab2camel('abc-com-ponent') === 'abcComPonent'`, () => {
        assert.equal(kebab2camel('abc-com-ponent'), 'abcComPonent')
      });

      it(`kebab2camel('-abc-component') === 'AbcComponent'`, () => {
        assert.equal(kebab2camel('-abc-component'), 'AbcComponent')
      });

      it(`kebab2camel('-abc-component-') === 'AbcComponent'`, () => {
        assert.equal(kebab2camel('-abc-component-'), 'AbcComponent')
      });

      it(`kebab2camel() === 'undefined'`, () => {
        assert.equal(kebab2camel(), 'undefined')
      });

      it(`kebab2camel(null) === 'null'`, () => {
        assert.equal(kebab2camel(null), 'null')
      });
    })
    const camel2kebab = string.camel2kebab;
    describe('camel2kebab', () => {
      it(`camel2kebab('abcComponent') === abc-component`, () => {
        assert.equal(camel2kebab('abcComponent'), 'abc-component')
      })
      it(`camel2kebab('AbcComponent') === abc-component`, () => {
        assert.equal(camel2kebab('AbcComponent'), 'abc-component')
      })
      it(`camel2kebab('Abccomponent') === abccomponent`, () => {
        assert.equal(camel2kebab('Abccomponent'), 'abccomponent')
      })
      it(`camel2kebab('AbccomponenT') === abccomponen-t`, () => {
        assert.equal(camel2kebab('AbccomponenT'), 'abccomponen-t')
      })
      it(`camel2kebab('') === ''`, () => {
        assert.equal(camel2kebab(''), '')
      })
      it(`camel2kebab() === 'undefined'`, () => {
        assert.equal(camel2kebab(), 'undefined')
      })
      it(`camel2kebab(null) === 'null'`, () => {
        assert.equal(camel2kebab(null), 'null')
      })
      it(`camel2kebab(undefined) === 'undefined'`, () => {
        assert.equal(camel2kebab(undefined), 'undefined')
      })
    })

    const _2camel = string._2camel;
    describe('_2camel', () => {
      it(`_2camel('abc_component') === 'abcComponent'`, () => {
        assert.equal(_2camel('abc_component'), 'abcComponent')
      });

      it(`_2camel('abc_com_ponent') === 'abcComPonent'`, () => {
        assert.equal(_2camel('abc_com_ponent'), 'abcComPonent')
      });

      it(`_2camel('_abc_component') === 'AbcComponent'`, () => {
        assert.equal(_2camel('_abc_component'), 'AbcComponent')
      });

      it(`_2camel('_abc_component_') === 'AbcComponent'`, () => {
        assert.equal(_2camel('_abc_component_'), 'AbcComponent')
      });

      it(`_2camel() === 'undefined'`, () => {
        assert.equal(_2camel(), 'undefined')
      });

      it(`_2camel(null) === 'null'`, () => {
        assert.equal(_2camel(null), 'null')
      });
    })
    const camel2_ = string.camel2_;
    describe('camel2_', () => {
      it(`camel2_('abcComponent') === 'abc_component'`, () => {
        assert.equal(camel2_('abcComponent'), 'abc_component')
      })
      it(`camel2_('AbcComponent') === 'abc_component'`, () => {
        assert.equal(camel2_('AbcComponent'), 'abc_component')
      })
      it(`camel2_('Abccomponent') === 'abccomponent'`, () => {
        assert.equal(camel2_('Abccomponent'), 'abccomponent')
      })
      it(`camel2_('AbccomponenT') === 'abccomponen_t'`, () => {
        assert.equal(camel2_('AbccomponenT'), 'abccomponen_t')
      })
      it(`camel2_('') === ''`, () => {
        assert.equal(camel2_(''), '')
      })
      it(`camel2_() === 'undefined'`, () => {
        assert.equal(camel2_(), 'undefined')
      })
      it(`camel2_(null) === 'null'`, () => {
        assert.equal(camel2_(null), 'null')
      })
      it(`camel2_(undefined) === 'undefined'`, () => {
        assert.equal(camel2_(undefined), 'undefined')
      })
    })
  });
}

testor(require('../lib/cjs').primitive, '[cjs]')
testor(require('../lib/umd').primitive, '[umd]')

test.run(console.DEBUG);
