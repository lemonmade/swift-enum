import Enum from './Enum';

export default function SimpleEnum(...cases) {
  const SimpleEnum = class SimpleEnum extends Enum {}; // eslint-disable-line no-shadow
  SimpleEnum.case(...cases).freeze();
  Object.defineProperty(SimpleEnum, 'name', {value: 'Enum'});
  return SimpleEnum;
}
