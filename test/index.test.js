import {expect} from 'chai';
import Enum, {NamingConvention, SimpleEnum} from '../src';

describe('exports', () => {
  it('exports everything it should', () => {
    expect(Enum).to.be.a.function;
    expect(SimpleEnum).to.be.a.function;
    expect(NamingConvention).to.be.a.function;
  });
});
