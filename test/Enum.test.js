import {expect} from 'chai';
import Enum from '../src/Enum';

describe(Enum.name, () => {
  let Color;
  let DayOfTheWeek;

  beforeEach(() => {
    Color = class Color extends Enum {}; // eslint-disable-line no-shadow
    DayOfTheWeek = class DayOfTheWeek extends Enum { // eslint-disable-line no-shadow
      static type = Number;
    };
  });

  it('throws an error when calling the constructor directly', () => {
    expect(() => new Color()).to.throw(Error);
  });

  describe('.case()', () => {
    it('returns the enum for chaining', () => {
      expect(Color.case('Blue')).to.equal(Color);
    });

    it('adds a static member for the enum case', () => {
      Color.case('Blue');
      expect(Color).to.have.property('Blue');
    });

    it('creates an instance of the enum class as the enum case', () => {
      Color.case('Blue');
      expect(Color.Blue).to.be.an.instanceOf(Color);
    });

    it('adds a static member for each enum case', () => {
      Color.case('Blue', 'Red');
      expect(Color).to.have.property('Blue');
      expect(Color).to.have.property('Red');
    });

    it('adds enum cases for each key in an object', () => {
      Color.case({Blue: 0, Red: 1});
      expect(Color).to.have.property('Blue');
      expect(Color).to.have.property('Red');
    });

    it('respects the string type when multiple cases provided', () => {
      Color.case('Blue', 'Red');
      expect(Color.Red.rawValue).to.equal('Red');
    });
  });

  describe('.freeze()', () => {
    it('prevents additional cases from being added', () => {
      Color.freeze();
      expect(() => Color.case('Blue')).to.throw(Error, /Enum is frozen/);
    });
  });

  describe('.fromRawValue()', () => {
    it('returns nothing when there is no matching enum value', () => {
      Color.case('Blue');
      expect(Color.fromRawValue('Red')).to.be.undefined;
    });

    it('returns an enum value when has a matching value', () => {
      Color.case('Blue');
      expect(Color.fromRawValue('Blue')).to.equal(Color.Blue);
    });
  });

  describe('.cases', () => {
    it('has an array of all cases', () => {
      Color.case('Blue', 'Red');
      Color.case('Green');
      expect(Color.cases).to.deep.equal([Color.Blue, Color.Red, Color.Green]);
    });

    it('uses a unique cases array for each enum class', () => {
      expect(Color.cases).not.to.equal(DayOfTheWeek.cases);
    });
  });

  describe('[Symbol.iterator]()', () => {
    it('does not fail on an enum without cases', () => {
      function doNothingWithColor() {} // eslint-disable-line no-empty-function

      expect(() => {
        for (const color of Color) { doNothingWithColor(color); }
      }).not.to.throw(Error);
    });

    it('iterates over each case in order', () => {
      Color.case('Blue', 'Red');
      Color.case('Green');

      expect([...Color]).to.deep.equal([Color.Blue, Color.Red, Color.Green]);
    });
  });

  describe('#name', () => {
    it('uses the name of the case', () => {
      Color.case('Blue');
      expect(Color.Blue.name).to.equal('Blue');
    });

    it('uses the name of the case for numeric enums', () => {
      DayOfTheWeek.case('Monday');
      expect(DayOfTheWeek.Monday.name).to.equal('Monday');
    });

    it('uses the name of the case for enums with custom values', () => {
      DayOfTheWeek.case({Monday: 'First day of the week'});
      expect(DayOfTheWeek.Monday.name).to.equal('Monday');
    });
  });

  describe('#rawValue', () => {
    it('uses the name of the case as its rawValue', () => {
      Color.case('Blue');
      expect(Color.Blue.rawValue).to.equal('Blue');
    });

    it('uses a 0-indexed number for the rawValue of a numeric enum', () => {
      DayOfTheWeek.case('Monday');
      DayOfTheWeek.case('Tuesday');

      expect(DayOfTheWeek.Monday.rawValue).to.equal(0);
      expect(DayOfTheWeek.Tuesday.rawValue).to.equal(1);
    });

    it('uses a passed value in place of the default', () => {
      const customValue = 'First day of the week';
      DayOfTheWeek.case({Monday: customValue});
      expect(DayOfTheWeek.Monday.rawValue).to.equal(customValue);
    });
  });

  describe('#toString()', () => {
    it('uses the name of the enum and the name of the case', () => {
      DayOfTheWeek.case('Monday');
      expect(`${DayOfTheWeek.Monday}`).to.equal('DayOfTheWeek.Monday');
    });
  });
});
