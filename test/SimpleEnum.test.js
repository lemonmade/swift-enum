import {expect} from 'chai';
import SimpleEnum from '../src/SimpleEnum';

describe(SimpleEnum.name, () => {
  let Color;

  beforeEach(() => {
    Color = SimpleEnum('Red', 'Blue'); // eslint-disable-line new-cap
  });

  it('creates a new enum class with a sensible default name', () => {
    expect(Color).to.be.a.function;
    expect(Color.name).to.equal('Enum');
  });

  it('adds all the passed cases', () => {
    expect(Color.Red).to.be.an.instanceOf(Color);
    expect(Color.Blue).to.be.an.instanceOf(Color);
  });

  it('prevents the addition of cases', () => {
    expect(() => Color.case('Green')).to.throw(Error, /frozen/);
  });
});
