# Enum

A Swift-inspired enum implementation for JavaScript.

[![Build status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Maintained][maintained-image]][maintained-url] [![NPM version][npm-image]][npm-url] [![Dependency Status][dependency-image]][dependency-url] [![Dev Dependency Status][devDependency-image]][devDependency-url] [![Code Climate][climate-image]][climate-url]

## Basics

First, install from `npm`:

```bash
npm install swift-enum
```

Then, create a subclass of the `Enum` default export and add cases (and, optionally, freeze the enum to prevent the addition of addition cases):

```js
import Enum from 'swift-enum';

class Theme extends Enum {}
Theme.case('Midnight', 'Mocha', 'Base-16').freeze();

console.log(Theme.Midnight); // {name: Midnight, rawValue: Midnight}
console.log(Theme.Midnight instanceof Theme); // true
console.log(Theme.Midnight.rawValue); // Midnight

new Theme(); // Error: can't instantiate instances of an enum class
```


## API

### Enum Classes

- `.type` sets the type of the `rawValue` for an enum. You can set it to be either `String` (default, sets the `rawValue` to be the same as the name of the case) or `Number` (so that cases are automatically given a zero-indexed number as their `rawValue`).

  ```js
  class Day extends Enum {
    static type = Number;
  }

  Day.case('Monday');
  console.log(Day.Monday.rawValue); // 0
  ```

- `.case()` adds additional cases. You can pass a simple list of string case names (which will be given the default `rawValue` given the specified `type` of the enum), or an object where the keys are the names of the enum cases and the values are the `rawValue`s.

  ```js
  class Day extends Enum {
    static type = Number;
  }

  Day.case('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');
  console.log(Day.Monday) // {name: Monday, rawValue: 0}

  class Color extends Enum {}
  Color.case({Blue: '#5273C4', Red: '#E13737'});
  console.log(Color.Blue); // {name: Blue, rawValue: #527364}
  ```

- `.freeze()` prevents additional cases from being added to the enum.

  ```js
  class Color extends Enum {}
  Color.case('Blue', 'Red');
  Color.freeze();
  Color.case('Green'); // Error
  ```

- `.cases` returns an array with all cases for the enum.

  ```js
  class Color extends Enum {}
  console.log(Color.cases); // []

  Color.case('Red', 'Blue');
  console.log(Color.cases); // [Color.Red, Color.Blue]
  ```

- `Symbol.iterator` allows iteration over all cases of an enum in a `for of` loop.

  ```js
  class Color extends Enum {}
  Color.case('Red', 'Blue');

  for (const color of Color) {
    console.log(color); // Color.Red, Color.Blue
  }
  ```

### Enum Cases

Enums have two properties by default:

- `#name`: The name of the case, which will always be the string you used to create the enum case.

- `#rawValue`: The value backing the enum case. For `String` enums, this will be the same as the name. For `Number` enums, this will be a zero-indexed number. You can also provide a custom `rawValue` by passing an object to the enum's `.case()` method.

For example, for the following case:

```js
class Color extends Enum {}
Color.case({Blue: '#5273C4', Red: '#E13737'});
```

The following properties will be set on the cases:

```js
console.log(Color.Blue); // {name: 'Blue', rawValue: '#5273C4'}
console.log(Color.Red); // {name: 'Red', rawValue: '#E13737'}
```

In addition to these default properties, you can set additional properties and methods by adding them to the custom `Enum` subclass.

```js
class Convention extends Enum {
  get opposite() {
    switch (this) {
    case Convention.SnakeCase: return Convention.CamelCase;
    case Convention.CamelCase: return Convention.SnakeCase;
    }
  }

  testString(string) {
    switch (this) {
    case Convention.SnakeCase: return /^[a-z_]*$/.test(string);
    case Convention.CamelCase: return /^[a-zA-Z]*$/.test(string);
    }
  }
}

Convention.case('SnakeCase', 'CamelCase');
console.log(Convention.SnakeCase.test('snake_case')); // true
console.log(Convention.SnakeCase.test('notSnakeCase')); // false
console.log(Convention.SnakeCase.opposite); // Convention.CamelCase
```

### Other Exports

The index file for this project also provides two named exports:

- `NamingConvention`: This is an enum that has a few cases for common enum naming conventions: `ScreamingSnakeCase`, `PascalCase`, and `NoRules`. You can use the `EnumClass` getter on any of these cases to create a new `Enum` base class that will throw an error if you try to add a case that does not match the specified naming convention.

  ```js
  import {NamingConvention} from 'swify-enum';

  class Color extends NamingConvention.ScreamingSnakeCase.EnumClass {}
  Color.case('BLUE', 'RED');
  Color.case('Green'); // Error

  class Color extends NamingConvention.PascalCase.EnumClass {}
  Color.case('BLUE', 'GREEN'); // Error
  Color.case('Green');

  class Color extends NamingConvention.NoRules.EnumClass {}
  Color.case('BLUE', 'GREEN');
  Color.case('Green');
  ```

  This can be great to export for use within your project to ensure all enum cases are being declared consistently.

- `SimpleEnum`: This function can be used to create a very simple enum. You can provide to it any arguments you can provide to `Enum.case`. When using the function, the resulting enum will be frozen for you. Note that, although `instanceof` will continue to work correctly, the `toString()` value of cases will not have the name of the enum as it does for enums subclassing `Enum`. You also can't change the type of the enum (but can provide custom `rawValue`s by passing an object).

  ```js
  import {SimpleEnum} from 'swify-enum';

  const Theme = SimpleEnum('Midnight', 'Mocha', 'Base-16');
  Theme.case('Monokai'); // Error

  console.log(Theme.Midnight); // {name: Midnight, rawValue: Midnight}
  console.log(Theme.Midnight instanceof Theme); // true
  console.log(Theme.Midnight.rawValue); // Midnight
  console.log(Theme.Midnight.toString()); // Enum.Midnight

  new Theme(); // Error
  ```


[travis-url]: https://travis-ci.org/lemonmade/swift-enum
[travis-image]: https://travis-ci.org/lemonmade/swift-enum.svg?branch=master

[coveralls-url]: https://coveralls.io/github/lemonmade/swift-enum?branch=master
[coveralls-image]: https://coveralls.io/repos/lemonmade/swift-enum/badge.svg?branch=master&service=github

[dependency-url]: https://david-dm.org/lemonmade/swift-enum
[dependency-image]: https://david-dm.org/lemonmade/swift-enum.svg

[devDependency-url]: https://david-dm.org/lemonmade/swift-enum
[devDependency-image]: https://david-dm.org/lemonmade/swift-enum.svg

[npm-url]: https://npmjs.org/package/swift-enum
[npm-image]: http://img.shields.io/npm/v/swift-enum.svg?style=flat-square

[climate-url]: https://codeclimate.com/github/lemonmade/swift-enum
[climate-image]: http://img.shields.io/codeclimate/github/lemonmade/swift-enum.svg?style=flat-square

[maintained-url]: https://github.com/lemonmade/swift-enum/pulse
[maintained-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square
