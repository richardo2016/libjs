/* global describe, it, before */

import chai from 'chai';
import {primitive} from '../dist/biz-strategy.js';
const number = primitive.number;

chai.expect();

const expect = chai.expect;

describe('测试 number 功能是否正确', () => {
  before(() => {
  });

  const coerceNumber = number.coerceNumber;
  describe('coerceNumber', () => {
    it(`coerceNumber('abc') === undefined`, () => {
      expect(coerceNumber('abc')).to.be.equal(undefined)
    })
    it(`coerceNumber('1') === 1`, () => {
      expect(coerceNumber('1')).to.be.equal(1)
    })
    it(`coerceNumber('') === undefined`, () => {
      expect(coerceNumber('')).to.be.equal(undefined)
    })
    it(`coerceNumber(null) === undefined`, () => {
      expect(coerceNumber(null)).to.be.equal(undefined)
    })
    it(`coerceNumber() === undefined`, () => {
      expect(coerceNumber(undefined)).to.be.equal(undefined)
    })
    it(`coerceNumber(Infinity) === undefined`, () => {
      expect(coerceNumber(Infinity)).to.be.equal(Infinity)
    })
    it(`coerceNumber(Object) === undefined`, () => {
      expect(coerceNumber(Object)).to.be.equal(undefined)
    })
    it(`coerceNumber(() => {}) === undefined`, () => {
      expect(coerceNumber(() => {})).to.be.equal(undefined)
    })
  });
});
