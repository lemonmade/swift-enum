import {expect} from 'chai';
import NamingConvention from '../src/NamingConvention';

describe(NamingConvention.name, () => {
  describe('.PascalCase', () => {
    it('accepts pascal case strings', () => {
      expect(NamingConvention.PascalCase.testString('PascalCase')).to.be.true;
    });

    it('rejects camelcase strings', () => {
      expect(NamingConvention.PascalCase.testString('camelCase')).to.be.false;
    });

    it('rejects screaming snake case strings', () => {
      expect(NamingConvention.PascalCase.testString('SNAKE_CASE')).to.be.false;
    });

    it('rejects mixed case strings', () => {
      expect(NamingConvention.PascalCase.testString('Pascal_mixedWith_EVERYTHING')).to.be.false;
    });
  });

  describe('.ScreamingSnakeCase', () => {
    it('rejects pascal and camelcase strings', () => {
      expect(NamingConvention.ScreamingSnakeCase.testString('PascalCase')).to.be.false;
      expect(NamingConvention.ScreamingSnakeCase.testString('camelCase')).to.be.false;
    });

    it('accepts screaming snake case strings', () => {
      expect(NamingConvention.ScreamingSnakeCase.testString('SNAKE_CASE')).to.be.true;
    });

    it('rejects mixed case strings', () => {
      expect(NamingConvention.ScreamingSnakeCase.testString('Pascal_mixedWith_EVERYTHING')).to.be.false;
    });
  });

  describe('.NoRules', () => {
    it('accepts pascal and camelcase strings', () => {
      expect(NamingConvention.NoRules.testString('PascalCase')).to.be.true;
      expect(NamingConvention.NoRules.testString('camelCase')).to.be.true;
    });

    it('accepts screaming snake case strings', () => {
      expect(NamingConvention.NoRules.testString('SNAKE_CASE')).to.be.true;
    });

    it('accepts mixed case strings', () => {
      expect(NamingConvention.NoRules.testString('Pascal_mixedWith_EVERYTHING')).to.be.true;
    });
  });

  describe('#EnumClass', () => {
    let CustomEnum;
    let Color;

    beforeEach(() => {
      CustomEnum = NamingConvention.ScreamingSnakeCase.EnumClass;
      Color = class extends CustomEnum {};
    });

    it('allows a case to be defined with the correct convention', () => {
      expect(() => Color.case('BLUE')).not.to.throw(Error);
    });

    it('does not throw an error when all cases match the convention', () => {
      expect(() => Color.case('BLUE', 'RED', 'GREEN')).not.to.throw(Error);
    });

    it('throws an error when creating a case with a non-matching name', () => {
      expect(() => Color.case('Blue')).to.throw(/Blue/);
    });

    it('throws an error when adding multiple cases when one does not match the convention', () => {
      expect(() => Color.case('BLUE', 'RED', 'Green')).to.throw(/Green/);
    });
  });
});
