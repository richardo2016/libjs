/* global describe, it, before */

import chai from 'chai';
import {primitive} from '../dist/biz-strategy.js';
const string = primitive.string;

chai.expect();

const expect = chai.expect;

describe('测试字符串功能是否正确', () => {
  before(() => {
  });

  const capitalize = string.capitalize;
  describe('capitalize', () => {
    it(`capitalize('abc') === 'Abc'`, () => {
      expect(capitalize('abc')).to.be.equal('Abc')
    })
    it(`capitalize('') === ''`, () => {
      expect(capitalize('')).to.be.equal('')
    })
    it(`capitalize(NaN) === 'NaN'`, () => {
      expect(capitalize(NaN)).to.be.equal('NaN')
    })
    it(`capitalize(undefined) === 'Undefined'`, () => {
      expect(capitalize(undefined)).to.be.equal('Undefined')
    })
    it(`capitalize(null) === 'Null'`, () => {
      expect(capitalize(null)).to.be.equal('Null')
    })
    it(`capitalize(0) === '0'`, () => {
      expect(capitalize(0)).to.be.equal('0')
    })
  })

  const kebab2camel = string.kebab2camel;
  describe('kebab2camel', () => {
    it(`kebab2camel('abc-component') === 'abcComponent'`, () => {
      expect(kebab2camel('abc-component')).to.be.equal('abcComponent')
    });

    it(`kebab2camel('abc-com-ponent') === 'abcComPonent'`, () => {
      expect(kebab2camel('abc-com-ponent')).to.be.equal('abcComPonent')
    });

    it(`kebab2camel('-abc-component') === 'AbcComponent'`, () => {
      expect(kebab2camel('-abc-component')).to.be.equal('AbcComponent')
    });

    it(`kebab2camel('-abc-component-') === 'AbcComponent'`, () => {
      expect(kebab2camel('-abc-component-')).to.be.equal('AbcComponent')
    });

    it(`kebab2camel() === 'undefined'`, () => {
      expect(kebab2camel()).to.be.equal('undefined')
    });

    it(`kebab2camel(null) === 'null'`, () => {
      expect(kebab2camel(null)).to.be.equal('null')
    });
  })
  const camel2kebab = string.camel2kebab;
  describe('camel2kebab', () => {
    it(`camel2kebab('abcComponent') === abc-component`, () => {
      expect(camel2kebab('abcComponent')).to.be.equal('abc-component')
    })
    it(`camel2kebab('AbcComponent') === abc-component`, () => {
      expect(camel2kebab('AbcComponent')).to.be.equal('abc-component')
    })
    it(`camel2kebab('Abccomponent') === abccomponent`, () => {
      expect(camel2kebab('Abccomponent')).to.be.equal('abccomponent')
    })
    it(`camel2kebab('AbccomponenT') === abccomponen-t`, () => {
      expect(camel2kebab('AbccomponenT')).to.be.equal('abccomponen-t')
    })
    it(`camel2kebab('') === ''`, () => {
      expect(camel2kebab('')).to.be.equal('')
    })
    it(`camel2kebab() === 'undefined'`, () => {
      expect(camel2kebab()).to.be.equal('undefined')
    })
    it(`camel2kebab(null) === 'null'`, () => {
      expect(camel2kebab(null)).to.be.equal('null')
    })
    it(`camel2kebab(undefined) === 'undefined'`, () => {
      expect(camel2kebab(undefined)).to.be.equal('undefined')
    })
  })

  const _2camel = string._2camel;
  describe('_2camel', () => {
    it(`_2camel('abc_component') === 'abcComponent'`, () => {
      expect(_2camel('abc_component')).to.be.equal('abcComponent')
    });

    it(`_2camel('abc_com_ponent') === 'abcComPonent'`, () => {
      expect(_2camel('abc_com_ponent')).to.be.equal('abcComPonent')
    });

    it(`_2camel('_abc_component') === 'AbcComponent'`, () => {
      expect(_2camel('_abc_component')).to.be.equal('AbcComponent')
    });

    it(`_2camel('_abc_component_') === 'AbcComponent'`, () => {
      expect(_2camel('_abc_component_')).to.be.equal('AbcComponent')
    });

    it(`_2camel() === 'undefined'`, () => {
      expect(_2camel()).to.be.equal('undefined')
    });

    it(`_2camel(null) === 'null'`, () => {
      expect(_2camel(null)).to.be.equal('null')
    });
  })
  const camel2_ = string.camel2_;
  describe('camel2_', () => {
    it(`camel2_('abcComponent') === 'abc_component'`, () => {
      expect(camel2_('abcComponent')).to.be.equal('abc_component')
    })
    it(`camel2_('AbcComponent') === 'abc_component'`, () => {
      expect(camel2_('AbcComponent')).to.be.equal('abc_component')
    })
    it(`camel2_('Abccomponent') === 'abccomponent'`, () => {
      expect(camel2_('Abccomponent')).to.be.equal('abccomponent')
    })
    it(`camel2_('AbccomponenT') === 'abccomponen_t'`, () => {
      expect(camel2_('AbccomponenT')).to.be.equal('abccomponen_t')
    })
    it(`camel2_('') === ''`, () => {
      expect(camel2_('')).to.be.equal('')
    })
    it(`camel2_() === 'undefined'`, () => {
      expect(camel2_()).to.be.equal('undefined')
    })
    it(`camel2_(null) === 'null'`, () => {
      expect(camel2_(null)).to.be.equal('null')
    })
    it(`camel2_(undefined) === 'undefined'`, () => {
      expect(camel2_(undefined)).to.be.equal('undefined')
    })
  })
});
