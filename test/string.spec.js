/* global describe, it, before */

import chai from 'chai';
import {string} from '../dist/rayjs.js';

chai.expect();

const expect = chai.expect;

let lib;

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
    it(`camel2kebab('abcComponent') abc-component`, () => {
      expect(camel2kebab('abcComponent')).to.be.equal('abc-component')
    })
    it(`camel2kebab('AbcComponent') abc-component`, () => {
      expect(camel2kebab('AbcComponent')).to.be.equal('abc-component')
    })
    it(`camel2kebab('Abccomponent') abccomponent`, () => {
      expect(camel2kebab('Abccomponent')).to.be.equal('abccomponent')
    })
    it(`camel2kebab('AbccomponenT') abccomponen-t`, () => {
      expect(camel2kebab('AbccomponenT')).to.be.equal('abccomponen-t')
    })
    it(`camel2kebab('')`, () => {
      expect(camel2kebab('')).to.be.equal('')
    })
    it(`camel2kebab() undefined`, () => {
      expect(camel2kebab()).to.be.equal('undefined')
    })
    it(`camel2kebab(null) null`, () => {
      expect(camel2kebab(undefined)).to.be.equal('undefined')
    })
    it(`camel2kebab(undefined) undefined`, () => {
      expect(camel2kebab(null)).to.be.equal('null')
    })
  })
});
