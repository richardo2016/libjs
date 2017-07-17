/* global describe, it, before */

import chai from 'chai';
import { constant } from '../dist/biz-strategy.js';
const alphabet = constant.alphabet;

chai.expect();

const expect = chai.expect;

describe('测试 constant 是否正确', () => {
  before(() => {
  });

  const keymirror = alphabet.keymirror;

  describe('keymirror', () => {
    it(`alphabet.keymirror 含有 a <-> 97`, () => {
      expect(alphabet.keymirror.a).to.be.equal(97)
      expect(alphabet.keymirror[97]).to.be.equal('a')
    })
    it(`alphabet.keymirror 含有 A <-> 65`, () => {
      expect(alphabet.keymirror.A).to.be.equal(65)
      expect(alphabet.keymirror[65]).to.be.equal('A')
    })
  });

  const list = alphabet.list;
  describe('list', () => {
    it(`alphabet.list 长度为 52`, () => {
      expect(alphabet.list.length).to.be.equal(52)
    })
    it(`alphabet.list 第 27 位为 a`, () => {
      expect(alphabet.list[26]).to.be.equal('a')
    })
    it(`alphabet.list 第 26 位为 A`, () => {
      expect(alphabet.list[25]).to.be.equal('A')
    })
    it(`alphabet.list 第 52 位为 z`, () => {
      expect(alphabet.list[51]).to.be.equal('z')
    })
    it(`alphabet.list 第 1 位为 Z`, () => {
      expect(alphabet.list[0]).to.be.equal('Z')
    })
  });
});
