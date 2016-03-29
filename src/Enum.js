const INITIALIZING = Symbol();
const FROZEN = Symbol();
const CASES = Symbol();

export default class Enum {
  static case(...cases) {
    if (typeof cases[0] === 'object') {
      Object.keys(cases[0]).forEach((name) => {
        this.caseWithRawValue(name, cases[0][name]);
      });

      return this;
    }

    cases.forEach((aCase) => this.caseWithRawValue(aCase));
    return this;
  }

  static caseWithRawValue(name, rawValue) {
    const newCase = new this(name, rawValue, INITIALIZING);
    this[name] = newCase;
    this.cases.push(newCase);
  }

  static fromRawValue(rawValue) {
    return this.cases && this.cases.find((enumCase) => enumCase.rawValue === rawValue);
  }

  static freeze() {
    this[FROZEN] = true;
  }

  static get cases() {
    this[CASES] = this[CASES] || [];
    return this[CASES];
  }

  static type = String;

  static [Symbol.iterator]() {
    return this.cases[Symbol.iterator]();
  }

  constructor(name, rawValue, initializationChecker) {
    if (this.constructor[FROZEN]) {
      throw new Error('Enum is frozen: you may no longer add additional cases.');
    }

    if (initializationChecker !== INITIALIZING) {
      throw new Error('Enum classes can’t be instantiated.');
    }

    this.name = name;
    this.rawValue = rawValue || (this.constructor.type === String ? name : this.constructor.cases.length);
  }

  toString() {
    return `${this.constructor.name}.${this.name}`;
  }
}
