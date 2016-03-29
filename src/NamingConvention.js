import Enum from './Enum';

export default class NamingConvention extends Enum {
  testString(string) {
    return this.regex.test(string);
  }

  get regex() {
    switch (this) {
    case NamingConvention.PascalCase: return /^[A-Z][a-zA-Z]*$/;
    case NamingConvention.ScreamingSnakeCase: return /^[A-Z][A-Z_]*$/;
    default: return /./;
    }
  }

  get EnumClass() {
    const namingConvention = this; // eslint-disable-line consistent-this

    return class CustomEnum extends Enum {
      static caseWithRawValue(name, rawValue) {
        if (!namingConvention.testString(name)) {
          throw new Error(`The name '${name}' for enum '${this.constructor.name}' does not match your required naming convention (${namingConvention}).`);
        }

        super.caseWithRawValue(name, rawValue);
      }
    };
  }
}

NamingConvention.case('PascalCase', 'ScreamingSnakeCase', 'NoRules');
