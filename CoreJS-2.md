# Вопросы к собеседованию: CoreJS № 2

Примеры независимы друг от друга. Браузерные фрагменты выполняйте на HTTP(S)-странице после разбора HTML; примеры TypeScript требуют компиляции. Модули с разными именами файлов сохраняйте отдельно.

## Встроенные методы Object

Документация: [MDN: Object и статические методы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object).

### Статические методы Object

- `Object.create()` используется для создания новых объектов и их привязки к прототипу существующего объекта.

  ```javascript
  const prototype = { active: true };
  const user = Object.create(prototype);
  console.log(user.active); // true: свойство найдено в прототипе
  ```

- `Object.keys()` возвращает массив собственных перечисляемых строковых ключей объекта.

  ```javascript
  console.log(Object.keys({ name: "Анна", age: 25 })); // ["name", "age"]
  ```

- `Object.values()` возвращает значения собственных перечисляемых свойств со строковыми ключами.

  ```javascript
  console.log(Object.values({ name: "Анна", age: 25 })); // ["Анна", 25]
  ```

- `Object.entries()` возвращает массив пар [ключ, значение] для собственных перечисляемых свойств со строковыми ключами.

  ```javascript
  console.log(Object.entries({ age: 25 })); // [["age", 25]]
  ```

- `Object.assign(target, ...sources)` поверхностно копирует собственные перечисляемые строковые и символьные свойства источников в target и возвращает target.

  ```javascript
  const source = { nested: { count: 1 } };
  const copy = Object.assign({}, source);
  copy.nested.count = 2;
  console.log(source.nested.count); // 2: вложенный объект общий
  ```

- `Object.freeze()` запрещает добавление и удаление собственных свойств, делает их неконфигурируемыми, а свойства данных — незаписываемыми. Заморозка поверхностная: вложенные объекты и поведение сеттеров автоматически не замораживаются.

  ```javascript
  const user = Object.freeze({ name: "Анна", settings: { dark: false } });
  user.settings.dark = true; // вложенный объект не заморожен
  console.log(Reflect.set(user, "name", "Иван")); // false
  ```

- `Object.seal()` запрещает добавление и удаление собственных свойств и делает их неконфигурируемыми. Значения свойств данных можно менять, только если writable: true.

  ```javascript
  const user = Object.seal({ name: "Анна" });
  user.name = "Иван";
  console.log(Reflect.deleteProperty(user, "name")); // false
  console.log(Reflect.set(user, "age", 25)); // false
  ```

- `Object.getPrototypeOf()` возвращает внутренний прототип [[Prototype]]. Устаревший аксессор `Object.prototype.__proto__` доступен не у всех объектов; используйте стандартные методы работы с прототипом.

  ```javascript
  const user = Object.create(null);
  console.log(Object.getPrototypeOf(user)); // null
  ```

### Флаги и дескрипторы свойств: `Object.defineProperty()`

- У свойств данных есть атрибуты value, writable, enumerable и configurable. У свойств-аксессоров вместо value/writable — get/set. При обычном присваивании новые свойства получают флаги true; у нового свойства через Object.defineProperty пропущенные флаги равны false.
  - **writable** – если true, свойство можно изменить, иначе оно только для чтения.
  - **enumerable** – управляет перечислением в for...in и Object.keys/values/entries; не влияет на прямой доступ, Reflect.ownKeys или Object.getOwnPropertyNames.
  - **configurable** – разрешает удаление и изменение дескриптора. При false запрещены большинство изменений, но у свойства данных writable можно переключить с true на false, а value менять, пока writable: true.
- Метод **`Object.getOwnPropertyDescriptor`** позволяет получить полную информацию о свойстве. (obj - объект, из которого мы получаем информацию. propertyName - имя свойства.)
- Чтобы изменить флаги, мы можем использовать метод `Object.defineProperty`.
  - `Object.defineProperty(obj, propertyName, descriptor)`
  - `obj, propertyName` - объект и его свойство, для которого нужно применить дескриптор.
  - `descriptor` - применяемый дескриптор.
- Как задать свойства?

  ```javascript
  const user = { name: "Анна" };
  Object.defineProperty(user, "name", {
    writable: false,
  });
  ```

  - В дескрипторе можно отдельно настроить writable, enumerable и configurable; свойства-аксессоры используют get/set вместо value/writable.

Документация: [дескрипторы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

Пример флагов и аксессоров:

```javascript
const user = {};

Object.defineProperty(user, "id", { value: 1 }); // все флаги false

console.log(Object.keys(user)); // []: enumerable=false
console.log(Reflect.set(user, "id", 2)); // false: writable=false
console.log(Reflect.deleteProperty(user, "id")); // false: configurable=false
console.log(Object.getOwnPropertyDescriptor(user, "id"));
// { value: 1, writable: false, enumerable: false, configurable: false }

let name = "Анна";
Object.defineProperty(user, "name", {
  get() {
    return name;
  },
  set(value) {
    name = value.trim();
  },
  enumerable: true,
  configurable: true,
});

user.name = " Иван ";
console.log(user.name); // "Иван"
```

### Итерируемые объекты и `Symbol.iterator` (дополнительно)

- Итерируемый объект имеет метод [Symbol.iterator](<>), возвращающий итератор с next(), который возвращает { value, done }.
  ```javascript
  const iterable = {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
    },
  };
  console.log([...iterable]); // [1, 2]
  ```

Документация: [итераторы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_generators).

## Свойства объектов и их перебор

### Вычисляемые свойства объекта

- Пусть имя некоторого свойства хранится в переменной:
  ```javascript
  let key = "a";
  ```
  Давайте сделаем так, чтобы вместо имени свойства взялось значение из нашей переменной. Для этого переменную следует взять в квадратные скобки:
  ```javascript
  let obj = {
    [key]: 1,
    b: 2,
    c: 3,
  };
  ```

### Перебор свойств объекта

- `for...in` перечисляет перечисляемые строковые свойства, включая унаследованные; для собственных используйте Object.hasOwn(obj, key).
- Метод `Object.keys()`
- Метод `Object.values()`
- Метод `Object.entries()`

Пример:

```javascript
const user = Object.assign(Object.create({ inherited: true }), {
  name: "Анна",
});

for (const key in user) {
  if (Object.hasOwn(user, key)) console.log(key, user[key]); // name, "Анна"
}

console.log(Object.keys(user)); // ["name"]
console.log(Object.values(user)); // ["Анна"]
console.log(Object.entries(user)); // [["name", "Анна"]]
```

## Области видимости

### Глобальная область и область функции

- В обычном скрипте объявления верхнего уровня относятся к глобальной области. В ES-модуле верхний уровень имеет область модуля. Глобальные let/const не становятся свойствами window.
- Переменные, которые используются только в определенной части кода, считаются помещенными в локальную область видимости. Такие переменные называются локальными.

Пример:

```javascript
const shared = "снаружи"; // верхний уровень модуля изолирован от других модулей

function show() {
  const local = "внутри";
  console.log(shared, local);
}

show(); // "снаружи", "внутри"
// console.log(local); // ReferenceError
```

### Области видимости var, let и const

- `VAR`
  - `var` имеет область функции либо верхнего уровня скрипта/модуля и не ограничивается обычным блоком.
- `LET`
  - `let` имеет блочную область видимости.
- `CONST`
  - `const` имеет блочную область видимости.

Пример:

```javascript
function demo() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
    console.log(b, c); // 2, 3
  }
  console.log(a); // 1
  // console.log(b, c); // ReferenceError: блок завершился
}
demo();
```

### Вложенные области видимости

- Функция в функции, когда внутренняя функция обращается к переменным внешней функции.

Пример:

```javascript
function outer() {
  const name = "Анна";
  function inner() {
    return `Привет, ${name}`;
  }
  return inner();
}
console.log(outer()); // "Привет, Анна"
```

## Параметры и аргументы функций

Документация: [MDN: функции и аргументы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions).

### Объявление параметров функции

```javascript
function greet(name, greeting) {
  return `${greeting}, ${name}`;
}
console.log(greet("Анна", "Привет")); // "Привет, Анна"
```

### Передача аргументов по значению

- Все аргументы JavaScript передаются по значению. Для примитивов копируется примитивное значение.
- Для объектов и массивов копируется значение ссылки: изменение объекта видно вызывающему коду, а переназначение параметра другому объекту не меняет переменную вызывающего кода (передача с совместным доступом, не по ссылке).

Пример:

```javascript
function change(number, user) {
  number = 100;
  user.name = "Иван";
  user = { name: "Пётр" }; // переназначается только локальный параметр
}
const number = 1;
const user = { name: "Анна" };
change(number, user);
console.log(number, user.name); // 1, "Иван"
```

### Переменное число аргументов

- Доступ к аргументам осуществляется через «псевдомассив» `arguments`.
- Он содержит список аргументов по номерам: `arguments[0]`, `arguments[1]`…, а также свойство `length`.
- `arguments` – это не массив; у стрелочных функций нет собственного arguments. Для переменного числа аргументов обычно используют rest-параметр ...args — настоящий массив.

Пример:

```javascript
function sum(...values) {
  return values.reduce((total, n) => total + n, 0);
}

function first() {
  return arguments[0];
}

console.log(sum(1, 2, 3), first("Анна", "Иван")); // 6, "Анна"
```

## Замыкания и лексическое окружение

Документация: [замыкания](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Closures).

### Лексическое окружение

- Лексическое окружение — модель хранения привязок имён и ссылки на внешнее окружение; это не значение this и не обычный JS-объект.

Пример:

```javascript
function greet(name) {
  const prefix = "Привет";
  return () => `${prefix}, ${name}`; // сохраняет доступ к двум привязкам
}

console.log(greet("Анна")()); // "Привет, Анна"
```

### Окружение при создании и вызове функции

- Когда функция вызывается, у неё создаётся своё окружение со скоупом (ссылкой на внешнее окружение).
- Если она вызывается несколько раз, то это разные лексические окружения.

Пример:

```javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}

const first = createCounter();
const second = createCounter();
console.log(first(), first(), second()); // 1, 2, 1: разные окружения
```

### Область видимости и контекст выполнения

- **Область видимости** (scope) определяет, где доступны имена переменных; поиск идёт по цепочке лексических окружений.
- **Контекст** описывает окружение, в котором выполняется код (любой код имеет контекст выполнения). В пределах одного агента в каждый момент выполняется один контекст; воркеры могут работать параллельно.
- Несколько популярных видов контекста:
  - Глобальный контекст
  - Контекст функции

Пример:

```javascript
const message = "из области видимости";
function show() {
  return [message, this.name];
}

console.log(show.call({ name: "из this" }));
// ["из области видимости", "из this"]: call изменяет this, но не scope
```

### Внутреннее и внешнее лексическое окружение

- При вызове функции создаётся локальное окружение, связанное с окружением, в котором функция была определена. В цепочке может быть несколько окружений функций, блоков и модулей.
- Внутреннее лексическое окружение соответствует текущему выполнению функции.
- Внешнее окружение не обязательно глобальное: это может быть окружение другой функции, блока или модуля.
- У внутреннего лексического окружения есть ссылка на внешнее (outer).
- Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во внешнем, затем в следующем и так далее, до глобального.

Пример:

```javascript
const value = "глобальное";

function outer() {
  const value = "внешнее";
  return () => value; // поиск находит ближайшую внешнюю привязку
}

console.log(outer()()); // "внешнее"
```

### Связь функции с лексическим окружением

- В процессе выполнения функции значения переменных могут меняться, что сразу же отражается в лексическом окружении. После выполнения функции недостижимые данные могут быть собраны сборщиком мусора; немедленное освобождение не гарантируется. Доступное замыкание сохраняет доступ к захваченным переменным, даже если его передали обработчику или сохранили без return.

Пример:

```javascript
function makeCounter() {
  let count = 0;
  return { increment: () => ++count, read: () => count };
}

const counter = makeCounter();
counter.increment();

console.log(counter.read()); // 1: оба замыкания используют одну привязку
```

## Работа с аргументами и коллекциями

Документация: [spread](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

### Параметры по умолчанию

```javascript
function greet(name = "Анна") {
  return `Привет, ${name}`;
}

console.log(greet(), greet(undefined), greet(null));
// "Привет, Анна", "Привет, Анна", "Привет, null"
```

### Spread в аргументах функции

- Синтаксис `spread` — это конструкция в JavaScript, которая распаковывает итерируемый объект в аргументы вызова или элементы массива; отдельная форма {...obj} копирует собственные перечисляемые свойства объекта. Обычный объект не обязательно итерируемый.

```javascript
function spreadInFunc(...args) {
  console.log(...args);
}

spreadInFunc(...[1, 2, 3]); // 1, 2, 3
```

### `arguments` и rest parameters

- Остаточные параметры (`rest parameters`) могут быть обозначены через три точки `...`. Они собирают оставшиеся аргументы в массив.

```javascript
function restInFunc(...args) {
  console.log(args);
}

restInFunc(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

Сравнение:

```javascript
function compare(first, ...rest) {
  console.log(arguments.length, rest.length); // 3, 2
  console.log(Array.isArray(arguments), Array.isArray(rest)); // false, true
}

compare(1, 2, 3);
```

### Spread для копирования массива

- Можно поверхностно скопировать массив **`const newArr = [...oldArr]`**; вложенные объекты остаются общими.

Пример:

```javascript
const original = [{ count: 1 }];
const copy = [...original];
copy[0].count = 2;

console.log(copy === original, original[0].count); // false, 2
```

### Объединение массивов через spread

```javascript
const a = [1, 2];
const b = [3, 4];
const c = [...a, ...b]; // [1, 2, 3, 4]
```

### Destructuring assignment

```javascript
let [firstName, lastName] = ["Илья", "Кантор"];
console.log(firstName); // Илья
console.log(lastName); // Кантор
```

- [MDN: деструктуризация](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring)

### Деструктуризация с присваиванием существующим переменным

```javascript
let a, b;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
```

### Цикл `for...of`

- `for...of` перебирает значения любого итерируемого объекта, например массива, строки, Map или Set; обычный объект без Symbol.iterator не подходит.

  **Spread распаковывает итерируемые значения в вызовах и массивах либо свойства в объектных литералах. Rest собирает оставшиеся аргументы в массив; в деструктуризации массивов/объектов собирает оставшиеся элементы/свойства. Это синтаксис, а не отдельные операторы.**

Пример:

```javascript
for (const value of new Set([1, 2, 2])) console.log(value); // 1, затем 2

for (const [key, value] of new Map([["age", 25]])) console.log(key, value); // age, 25
```

## Модули JavaScript

Документация: [модули](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules).

### Что такое модуль и зачем он нужен?

- Модуль объединяет связанную логику, скрывает детали реализации и предоставляет API для других модулей.

Пример:

```javascript
// counter.js: счётчик закрыт внутри модуля.
let count = 0;
export const increment = () => ++count;
// app.js — отдельный ES-модуль:
// import { increment } from './counter.js';
// console.log(increment()); // 1
```

### CommonJS

- Для импорта `const foo = require('foo');`
- Для экспорта `module.exports = { myFunc, myVar };`

Пример для Node.js:

```javascript
// math.cjs
const add = (a, b) => a + b;
module.exports = { add };
// app.cjs — отдельный файл:
// const { add } = require('./math.cjs');
// console.log(add(2, 3)); // 5
```

### ES modules

- Для именованного экспорта ниже: `import { myFunc } from './myFunc.js';`. Импорт без фигурных скобок требует export default.
- Для экспорта `export { myFunc, myVar };`

Пример:

```javascript
// math.js
export const add = (a, b) => a + b;
export default function double(value) {
  return value * 2;
}
// app.js — отдельный ES-модуль:
// import double, { add } from './math.js';
// console.log(double(add(2, 3))); // 10
```

### Импорт и экспорт

```javascript
// app.js
import { myFunc } from "./myFunc.js";
```

```javascript
// myFunc.js (отдельный файл)
export const myFunc = () => {
  console.log("Hello");
};
```

## Прототипное наследование в JavaScript

Прототипное наследование — это механизм, с помощью которого объекты могут наследовать свойства и методы друг от друга. Рассмотрим основные аспекты прототипного наследования.

Документация: [прототипы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

### Свойство `__proto__`

- **Что это такое?** `__proto__` — устаревший аксессор Object.prototype для внутреннего [[Prototype]], а не само внутреннее свойство. Он может отсутствовать или быть перекрыт; предпочтительны Object.getPrototypeOf, Object.setPrototypeOf и Object.create.

- **Как работает?** Когда вы пытаетесь получить доступ к свойству объекта, и это свойство не найдено у самого объекта, JavaScript ищет его в прототипе, указанном в `__proto__`.

Пример:

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(Object.getPrototypeOf(rabbit) === animal); // true
console.log(rabbit.eats); // true: поиск продолжается в прототипе
```

### Прототип объекта `__proto__`

- **Пример:**

  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = {
    jumps: true,
  };

  rabbit.__proto__ = animal;

  console.log(rabbit.eats); // true
  ```

- **Объяснение:** Здесь объект `rabbit` наследует свойство `eats` от объекта `animal`, так как `rabbit.__proto__` указывает на `animal`.

### Использование `Object.create()` и `__proto__`

- **Object.create:** Этот метод используется для создания нового объекта с указанным прототипом.
- **Пример:**

  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = Object.create(animal);

  console.log(rabbit.eats); // true
  ```

- **Явное определение `__proto__`:**
  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = {};
  rabbit.__proto__ = animal;

  console.log(rabbit.eats); // true
  ```

### Свойство `prototype`

- **Что это такое?** Свойство `prototype` у функций-конструкторов используется для реализации наследования. При обычном вызове new, если prototype — объект, он становится прототипом создаваемого экземпляра; явный возврат другого объекта из конструктора может изменить результат.

- **Пример:**
  ```javascript
  function Animal() {}

  Animal.prototype.eats = true;

  let rabbit = new Animal();

  console.log(rabbit.eats); // true
  ```

### Связь `Constructor.prototype` и прототипа экземпляра

- **Пример:**

  ```javascript
  function Animal() {}

  Animal.prototype.eats = true;

  let rabbit = new Animal();

  console.log(rabbit.__proto__ === Animal.prototype); // true
  ```

- **Объяснение:** В этом примере Object.getPrototypeOf(rabbit) === Animal.prototype. Это отношение внутреннего [[Prototype]] экземпляра к свойству prototype конструктора; оно не требует доступа через **proto**.

### Методы в `Constructor.prototype`

- **Пример:**
  ```javascript
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.speak = function () {
    console.log(`${this.name} говорит.`);
  };

  let rabbit = new Animal("Кролик");
  rabbit.speak(); // Кролик говорит.
  ```

### Установка и получение прототипа объекта (дополнительно)

- **Object.setPrototypeOf:** Устанавливает прототип объекта.

- **Пример:**

  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = {
    jumps: true,
  };

  Object.setPrototypeOf(rabbit, animal);

  console.log(rabbit.eats); // true
  ```

- **Object.getPrototypeOf:** Возвращает прототип объекта.

- **Пример:**
  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = Object.create(animal);

  console.log(Object.getPrototypeOf(rabbit) === animal); // true
  ```

## Коллекции

### Map и Set

Документация: [MDN: коллекции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections).

#### Map

- **Описание:** Map — это коллекция ключ/значение, похожая на Object, но с возможностью использовать ключи любого типа.

- **Методы:**

- `new Map()`: создаёт пустую коллекцию.

```javascript
let map = new Map();
```

- `map.set(key, value)`: добавляет пару ключ/значение.

```javascript
map.set("name", "John");
```

- `map.get(key)`: возвращает значение по ключу или `undefined`, если ключ отсутствует.

```javascript
console.log(map.get("name")); // 'John'
```

- `map.has(key)`: возвращает `true`, если ключ присутствует в коллекции, иначе `false`.

```javascript
console.log(map.has("name")); // true
```

- `map.delete(key)`: удаляет элемент по ключу.

```javascript
map.delete("name");
```

- `map.clear()`: очищает коллекцию от всех элементов.

```javascript
map.clear();
```

- `map.size`: возвращает текущее количество элементов.

```javascript
console.log(map.size); // 0
```

#### Set

- **Описание:** Set — это коллекция уникальных значений.

- **Методы:**

- `new Set(iterable)`: создаёт Set, можно передать перебираемый объект для инициализации.

```javascript
let set = new Set([1, 2, 3]);
```

- `set.add(value)`: добавляет значение, возвращает тот же объект set.

```javascript
set.add(4);
```

- `set.delete(value)`: удаляет значение, возвращает `true`, если значение было в множестве, иначе `false`.

```javascript
set.delete(3);
```

- `set.has(value)`: возвращает `true`, если значение присутствует в множестве, иначе `false`.

```javascript
console.log(set.has(2)); // true
```

- `set.clear()`: удаляет все значения.

```javascript
set.clear();
```

- `set.size`: возвращает количество элементов в множестве.

```javascript
console.log(set.size); // 0
```

### WeakMap и WeakSet

Документация: [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

#### WeakMap

- **Описание:** WeakMap хранит пары с ключами-объектами или незарегистрированными символами (не Symbol.for) и не удерживает ключи от сборки мусора. Момент сборки не гарантирован; перечисления ключей нет.

- **Примеры использования:**
  ```javascript
  let weakMap = new WeakMap();
  let obj = {};

  weakMap.set(obj, "value");
  console.log(weakMap.get(obj)); // 'value'

  obj = null; // теперь объект может быть удален сборщиком мусора
  ```

#### WeakSet

- **Описание:** WeakSet хранит объекты и незарегистрированные символы слабо: наличие в коллекции не препятствует сборке мусора. Коллекция не перечисляется и не имеет size.

- **Примеры использования:**
  ```javascript
  let weakSet = new WeakSet();
  let obj = {};

  weakSet.add(obj);
  console.log(weakSet.has(obj)); // true

  obj = null; // теперь объект может быть удален сборщиком мусора
  ```

## Ошибки JavaScript

Документация: [обработка ошибок](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Control_flow_and_error_handling).

### Исключения: `throw` и `Error`

- **throw:** Инструкция `throw` генерирует исключение.

  ```javascript
  throw new Error("Что-то пошло не так");
  ```

- **Error class:** Конструктор `Error` создаёт объект ошибки.
  ```javascript
  let error = new Error("Ошибка");
  console.log(error.message); // 'Ошибка'
  ```

### try...catch

- **try..catch:** Блок `catch` перехватывает исключения, возникшие при выполнении try. Ошибки будущих колбэков таймеров он не перехватит; отклонение промиса нужно await внутри try или обработать через catch().
  ```javascript
  try {
    JSON.parse("не JSON"); // SyntaxError
  } catch (e) {
    console.log(e.message);
  }
  ```

### Обработка ошибок

- **Обработка ошибок:**

Пример:

```javascript
function parseUser(text) {
  const user = JSON.parse(text);
  if (typeof user.name !== "string") throw new Error("Не задано имя");
  return user;
}

try {
  parseUser('{"age":25}');
} catch (error) {
  console.error(error.message);
} // "Не задано имя"
```

- `try..catch`

- `throw`

### Error

- **Конструктор Error:** Создаёт объект ошибки.
  ```javascript
  let error = new Error("Ошибка");
  console.log(error.message); // 'Ошибка'
  ```

### Логирование ошибок

- **Логирование ошибок:**

Пример:

```javascript
console.log("Обычное сообщение");
console.info("Информация");
console.warn("Предупреждение");
console.error("Ошибка", new Error("Нет данных"));
```

- `console.log()`

- `console.info()`

- `console.error()`

- `console.warn()`

### Ошибки в асинхронном коде

- **Обработка ошибок в асинхронном коде:** Использование `try..catch` с `async/await`.
  ```javascript
  async function fetchData() {
    try {
      let response = await fetch("/api/data");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      let data = await response.json();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
  ```

## Асинхронный JavaScript

Документация: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### Promise

- **Описание:** Promise — объект для написания и обработки асинхронного кода.
  ```javascript
  let promise = new Promise(function (resolve, reject) {
    // executor вызывается синхронно; resolve/reject определяют результат; resolve с thenable ждёт его исхода
    resolve(42);
  });
  ```

### Promise states

- **Состояния Promise:**

Пример:

```javascript
const pending = new Promise(() => {}); // pending: не завершён
const fulfilled = Promise.resolve(42); // fulfilled
const rejected = Promise.reject(new Error("Сбой")); // rejected

fulfilled.then((value) => console.log(value)); // 42
rejected.catch((error) => console.log(error.message)); // "Сбой"
// Публичного свойства state нет; состояние видно в инструментах разработчика.
```

- `pending` — начальное состояние: промис ещё не fulfilled и не rejected

- `fulfilled` — операция завершилась успешно

- `rejected` — произошла ошибка

### Promise chaining

- **Цепочки промисов:**
  ```javascript
  Promise.resolve(2)
    .then((value) => value * 3)
    .then((value) => Promise.resolve(value + 1))
    .then((value) => console.log(value)) // 7
    .catch((error) => console.error(error));
  ```

### Promise static methods

- **Статические методы:** Promise.resolve(), Promise.reject(), Promise.all(), Promise.allSettled(), Promise.race(), Promise.any(), Promise.withResolvers().
- then(), catch() и finally() — методы экземпляра промиса, а не статические.

Пример:

```javascript
const a = Promise.resolve(1);
const b = Promise.resolve(2);

Promise.resolve(42).then(console.log); // 42
Promise.reject(new Error("Сбой")).catch((error) => console.log(error.message)); // "Сбой"

Promise.all([a, b]).then(console.log); // [1, 2]
Promise.allSettled([a, Promise.reject("сбой")]).then(console.log);
// [{ status: "fulfilled", value: 1 }, { status: "rejected", reason: "сбой" }]
Promise.race([a, b]).then(console.log); // 1: первый завершившийся
Promise.any([Promise.reject("сбой"), b]).then(console.log); // 2: первый успешный

const { promise, resolve } = Promise.withResolvers();
promise.then(console.log); // "Готово"
resolve("Готово");
```

### Обработка ошибок в Promise

- **Обработка ошибок в промисах:**
  ```javascript
  Promise.resolve(2)
    .then(() => {
      throw new Error("Сбой");
    })
    .catch((error) => {
      console.log(error.message); // "Сбой"
      return 0; // восстановление после ошибки
    })
    .then((value) => console.log(value)); // 0
  ```

### async/await

- **Описание:** `async` и `await` используются для работы с промисами в синхронном стиле.
  ```javascript
  async function example() {
    const result = await Promise.resolve(42);
    console.log(result); // 42
  }
  example();
  ```

### Event loop

- **Описание:** Event Loop — механизм, который позволяет JavaScript выполнять асинхронный код. Ниже будет приведен более подробный разбор:

1. **Стек вызовов** хранит активные вызовы. Последний вызов завершается первым (LIFO); текущая задача выполняется до завершения.
2. **Web APIs** выполняют операции платформы, например таймеры и сеть. Обычный вызов async-функции начинается синхронно и приостанавливается на await; функция не «передаётся в Web API» целиком.
3. **Задачи (tasks, часто «макрозадачи»)** включают колбэки таймеров и асинхронную обработку событий. У браузера может быть несколько очередей задач. fetch запускает сетевую операцию, но его then/catch — микрозадачи.
4. **Микрозадачи** — реакции промисов then/catch/finally, колбэки MutationObserver и queueMicrotask. Executor new Promise выполняется синхронно. На контрольной точке очередь микрозадач опустошается, включая добавленные при её обработке микрозадачи.
5. **Event loop** выбирает готовую задачу, после её выполнения обрабатывает микрозадачи, а при возможности обновляет отображение. Перерисовка не гарантирована после каждой задачи. Таймер задаёт минимальную задержку, а не точное время вызова.

Источник: [MDN: микрозадачи](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

Пример:

```javascript
console.log("начало");

setTimeout(() => console.log("таймер"), 0);

Promise.resolve().then(() => console.log("промис"));

queueMicrotask(() => console.log("микрозадача"));

console.log("конец");
// начало → конец → промис → микрозадача → таймер
```

## JavaScript в браузере

### Глобальный объект window

- **Описание:** В контексте страницы глобальный объект представлен Window (window); в веб-воркерах window отсутствует. globalThis даёт общий способ доступа к глобальному this.

Пример:

```javascript
console.log(window === globalThis); // true в контексте страницы
window.setTimeout(() => console.log("таймер"), 0);
// В worker используйте globalThis: объекта window там нет.
```

### Location

- `window.location` — объект Location с текущим URL; присваивание location.href или вызов assign() запускает навигацию. replace() заменяет текущую запись истории.

Пример:

```javascript
console.log(window.location.href); // текущий URL
// Следующие вызовы запускают навигацию:
// location.assign('/profile'); // добавляет запись истории
// location.replace('/login'); // заменяет текущую запись
```

Документация: [MDN: Location](https://developer.mozilla.org/ru/docs/Web/API/Location).

### Состав URL в Location

```javascript
console.log(location.href, location.origin, location.protocol);
console.log(location.hostname, location.port, location.pathname);
console.log(location.search, location.hash);
```

### History API

- **API истории:**
  ```javascript
  // Каждый вызов выполняйте отдельно: он запускает навигацию по истории.
  // window.history.back();
  // window.history.forward();
  // window.history.go(-1);
  const url = new URL(location.href);
  url.searchParams.set("page", "2");
  history.pushState({ page: 2 }, "", url);
  console.log(history.state.page); // 2: URL изменился без перезагрузки
  history.replaceState({ page: 3 }, "", location.href);
  console.log(history.state.page); // 3: текущая запись заменена
  ```

Документация: [History](https://developer.mozilla.org/ru/docs/Web/API/History).

### Navigator

- **Интерфейс Navigator:** Используется для получения информации о браузере и платформе.
  ```javascript
  console.log(navigator.userAgent);
  ```

Документация: [Navigator](https://developer.mozilla.org/ru/docs/Web/API/Navigator).

### Cookies

- **Работа с куки:**
  ```javascript
  document.cookie = "username=John Doe";
  let cookies = document.cookie;
  console.log(cookies);
  ```

## Жизненный цикл страницы

### Разбор HTML и CSS

- **Этапы парсинга:**

Пример:

```javascript
const doc = new DOMParser().parseFromString(
  '<p class="note">Привет</p>',
  "text/html",
);
console.log(doc.querySelector(".note").textContent); // "Привет"
// Этот разбор создаёт отдельный DOM; он не отображает документ на экране.
```

- Парсинг HTML и создание токенов

- Преобразование токенов в ноды

- Создание дерева DOM

- Парсинг CSS и создание CSSOM

- Построение дерева отображения на основе DOM и CSSOM — следующий этап после разбора, а не HTML-парсинг

### Reflow

- **Этап Reflow:**

Пример:

```javascript
const box = document.createElement("div");
box.style.width = "100px";
document.body.append(box);
box.style.width = "200px"; // меняется геометрия
console.log(box.getBoundingClientRect().width); // 200; чтение требует актуальной раскладки
box.remove();
```

- Определение координат и размеров элементов

### Repaint

- **Этап Repaint:**

Пример:

```javascript
const box = document.createElement("div");
box.textContent = "Пример";
document.body.append(box);
box.style.color = "red"; // изменение цвета требует paint, но не меняет геометрию
```

- Рисование видимых частей элементов по рассчитанным стилям и геометрии; затем слои могут быть скомпонованы

### Critical Rendering Path (CRP, дополнительно)

- **Описание CRP:**

Пример:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Пример CRP</title>
    <style>
      body {
        font-family: sans-serif;
      }
    </style>
    <!-- app.js загружается параллельно; выполняется после разбора HTML. -->
    <script src="app.js" defer></script>
  </head>
  <body>
    <h1>Страница готова к отображению</h1>
  </body>
</html>
```

Документация: [MDN: критический путь отрисовки](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path).

- Путь, который проходит браузер до того, как страница отрисовывается.

## Сетевые запросы

### Fetch API

- **Использование Fetch:**
  ```javascript
  fetch("/api/data")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Ошибка:", error));
  ```

Документация: [Fetch](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch).

## Web Storage API и cookies

Документация: [cookie](https://developer.mozilla.org/ru/docs/Web/HTTP/Guides/Cookies).

### Cookies

- **Описание Cookies:**
  ```javascript
  document.cookie = "username=John Doe";
  let cookies = document.cookie;
  console.log(cookies);
  ```

### Различия localStorage, sessionStorage и cookies

- **Различия:**
  - **localStorage:** Хранилище строк по origin без встроенного срока истечения; данные могут быть удалены пользователем или браузером.
  - **sessionStorage:** Изолировано по origin и вкладке (контексту верхнего уровня); переживает перезагрузку и обычно очищается при закрытии вкладки.
  - **cookies:** Бывают сеансовыми и постоянными (Expires/Max-Age). Отправляются только с подходящими запросами с учётом домена, пути, Secure, SameSite и credentials; HttpOnly недоступны через document.cookie. Web Storage автоматически с запросами не отправляется.

Пример:

```javascript
// Браузерная страница на HTTP(S); доступ к хранилищам должен быть разрешён.
localStorage.setItem("theme", "dark");

sessionStorage.setItem("draft", JSON.stringify({ text: "Черновик" }));

console.log(localStorage.getItem("theme")); // "dark"

console.log(JSON.parse(sessionStorage.getItem("draft")).text); // "Черновик"

document.cookie = "theme=dark; Path=/; SameSite=Lax";
// Cookie может отправляться серверу; значения Web Storage — только явно.
localStorage.removeItem("theme");
sessionStorage.removeItem("draft");
```

Документация: [localStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage).

Документация: [sessionStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/sessionStorage).

## TypeScript (TS)

Примеры независимы: не объединяйте повторяющиеся объявления `IUser` и `Season` в один файл. `readonly` проверяется компилятором и не замораживает объект во время выполнения.

Документация: [Дока: статическая типизация](https://doka.guide/tools/static-types/).

### Базовые типы

1. `string`

```typescript
let userName: string = "Alice";
```

2. `number`

```typescript
let age: number = 30;
```

3. `bigint`

```typescript
let bigNumber: bigint = 1234567890123456789012345678901234567890n;
```

4. `boolean`

```typescript
let isStudent: boolean = true;
```

5. `undefined`

```typescript
let notDefined: undefined = undefined;
```

6. `null`

```typescript
let nothing: null = null;
```

7. `symbol`

```typescript
let uniqueKey: symbol = Symbol("key");
```

8. `object`

```typescript
let person: { name: string; age: number } = { name: "Bob", age: 25 };
```

Документация: [официальный Handbook — типы](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

### enum

- Для определения перечисления применяется ключевое слово enum.

```typescript
enum Season {
  Winter = 5,
  Spring,
  Summer,
  Autumn,
} // 5, 6, 7, 8
```

```typescript
enum Season {
  Winter = 4,
  Spring = 8,
  Summer = 16,
  Autumn = 32,
} // 4, 8, 16, 32
```

```typescript
enum Season {
  Winter,
  Spring,
  Summer,
  Autumn,
}
```

Документация: [enums](https://www.typescriptlang.org/docs/handbook/enums.html).

### Различия `type` и `interface`

- `type` задаёт псевдоним любого типа, включая примитивы, объединения и объекты. interface описывает форму объекта, поддерживает extends и слияние деклараций; type не переоткрывается для слияния.
  ```typescript
  type UserName = string;
  ```
- `interface`
  - Интерфейс описывает свойства и методы объекта без их реализации.
    ```typescript
    interface IUser {
      id: number;
      name: string;
    }
    ```

### Свойства и методы интерфейсов: `?` и `readonly`

- необязательные свойства отмечаются `?`
  ```typescript
  interface IUser {
    id: number;
    name?: string;
  }
  ```
- только для чтения
  ```typescript
  interface IUser {
    readonly id: number;
    name: string;
  }
  ```
- определение методов
  ```typescript
  interface IUser {
    id: number;
    name: string;
    sayWords(words: string): void;
  }
  ```

### Типы функций

- Тип функции записывают как `(параметры) => типРезультата`.
  ```typescript
  let greet: (name: string) => string = (name) => `Hello, ${name}`;
  ```

### Utility Types (дополнительно)

- Встроенный Partial<T> делает все свойства необязательными. Ниже его учебный аналог MyPartial<T>; преобразование поверхностное.
  ```typescript
  type MyPartial<T> = {
    [P in keyof T]?: T[P];
  };

  interface IUser {
    id: number;
    name: string;
    age: number;
  }

  let partialUser: MyPartial<IUser> = { id: 1 };
  ```
- В прикладном коде используйте встроенный Partial<IUser>; переопределять имя Partial в глобальной области не нужно.

Документация: [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

### Type guards (дополнительно)

- Type guards — проверки, по результатам которых TypeScript сужает тип значения. Пользовательский предикат должен сам корректно проверять данные; компилятор не доказывает его истинность.
  ```typescript
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }
  ```

Документация: [сужение типов](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

Пример сужения типа:

```typescript
function length(value: unknown): number {
  if (typeof value === "string") return value.length;
  return 0;
}
console.log(length("Привет"), length(42)); // 6, 0
```

### Пользовательские типы

- `type` задаёт пользовательский тип.
  ```typescript
  type UserName = string;
  type User = {
    id: number;
    name: UserName;
  };
  ```

### Generics

- Параметры типа записывают в угловых скобках: `<T>` или `<T, U>`. Они связывают типы входных и выходных значений.
  ```typescript
  function identity<T>(value: T): T {
    return value;
  }

  let number = identity<number>(42);
  let word = identity<string>("Hello");
  ```

### Модули TypeScript

- TypeScript поддерживает синтаксис ES-модулей и разные среды выполнения. Разрешение путей и формат вывода зависят от module/moduleResolution и среды; ниже пример для среды со сборщиком.
  ```typescript
  // math.ts
  export const add = (a: number, b: number) => a + b;

  // app.ts
  import { add } from "./math";

  console.log(add(2, 3));
  ```

Документация: [модули](https://www.typescriptlang.org/docs/handbook/modules/theory.html).

## Паттерны проектирования

### Порождающие паттерны

Документация: [Дока: Observer и реактивность](https://doka.guide/tools/reactivity/).

Порождающие паттерны управляют созданием объектов и скрывают детали их инициализации.

- Singleton: Обеспечивает наличие только одного экземпляра класса и предоставляет к нему глобальную точку доступа.
  ```typescript
  class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  }

  const instance1 = Singleton.getInstance();
  const instance2 = Singleton.getInstance();
  console.log(instance1 === instance2); // true
  ```

### Структурные паттерны

Структурные шаблоны описывают композицию классов и объектов в более крупные структуры; наследование — лишь один из возможных инструментов.

- Adapter: Позволяет объектам с несовместимыми интерфейсами работать вместе.
  ```typescript
  interface EuropeanPlug {
    connect(): void;
  }

  class EuropeanPlugImpl implements EuropeanPlug {
    connect() {
      console.log("Connected with European plug");
    }
  }

  interface USPlug {
    connectUS(): void;
  }

  class Adapter implements USPlug {
    private europeanPlug: EuropeanPlug;

    constructor(europeanPlug: EuropeanPlug) {
      this.europeanPlug = europeanPlug;
    }

    connectUS() {
      this.europeanPlug.connect();
    }
  }

  const europeanPlug = new EuropeanPlugImpl();
  const adapter = new Adapter(europeanPlug);
  adapter.connectUS(); // Connected with European plug
  ```

### Поведенческие паттерны

Поведенческие шаблоны проектирования решают задачи эффективного и безопасного взаимодействия между объектами программы.

- Observer: Создает механизм подписки, позволяющий одним объектам следить и реагировать на события, происходящие в других объектах.
  ```typescript
  interface Observer {
    update(message: string): void;
  }

  class ConcreteObserver implements Observer {
    update(message: string) {
      console.log(`Observer received message: ${message}`);
    }
  }

  class Subject {
    private observers: Observer[] = [];

    addObserver(observer: Observer) {
      this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notifyObservers(message: string) {
      this.observers.forEach((observer) => observer.update(message));
    }
  }

  const observer1 = new ConcreteObserver();
  const observer2 = new ConcreteObserver();
  const subject = new Subject();
  subject.addObserver(observer1);
  subject.addObserver(observer2);
  subject.notifyObservers("Обновление");
  subject.removeObserver(observer1);
  ```

## Задачи на программирование

Ниже учебные реализации с явно ограниченной областью применимости, а не полные полифилы встроенных методов. Они не изменяют встроенные прототипы.

- `Function.prototype.bind`: привязать this и начальные аргументы для обычного вызова.

  ```javascript
  function myBind(func, context, ...args) {
    if (typeof func !== "function") throw new TypeError("Expected function");
    return (...rest) => Reflect.apply(func, context, [...args, ...rest]);
  }
  console.log(
    myBind(
      function (x) {
        return this.n + x;
      },
      { n: 2 },
      3,
    )(),
  ); // 5
  ```

  Встроенный bind также поддерживает new для конструируемой функции, корректирует name/length и имеет особую семантику instanceof. Эта версия поддерживает только обычный вызов.
  [MDN: bind](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

- `Object.create`: создать объект с указанным прототипом. Для null нельзя использовать трюк с конструктором — он даст Object.prototype. Встроенный метод также принимает дескрипторы свойств.

  ```javascript
  const animal = { eats: true };
  const rabbit = Object.create(animal, {
    jumps: {
      value: true,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  });
  console.log(Object.getPrototypeOf(rabbit) === animal); // true
  ```

  [MDN: Object.create](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

- `Array.prototype.flat`: версия для обычных массивов с глубиной по умолчанию 1 и пропуском пустых слотов.

  ```javascript
  function myFlat(array, depth = 1) {
    if (!Array.isArray(array)) throw new TypeError("Expected array");
    const numericDepth = +depth;
    const level = Number.isNaN(numericDepth)
      ? 0
      : Math.max(0, Math.trunc(numericDepth));
    const result = [];
    function flatten(input, remaining) {
      const length = input.length;
      for (let i = 0; i < length; i++) {
        if (!(i in input)) continue;
        const value = input[i];
        if (Array.isArray(value) && remaining > 0)
          flatten(value, remaining - 1);
        else result.push(value);
      }
    }
    flatten(array, level);
    return result;
  }
  console.log(myFlat([1, , [2, [3]]])); // [1, 2, [3]]
  console.log(myFlat([1, [2, [3]]], Infinity)); // [1, 2, 3]
  ```

  В отличие от встроенного flat эта версия не поддерживает array-like receiver и Array species; чрезмерная вложенность может переполнить стек.
  [MDN: flat](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/flat).

- `Array.prototype.reduce`: версия для обычных массивов; отсутствие initialValue отличается от явно переданного undefined.

  ```javascript
  function myReduce(array, callback, ...initial) {
    if (!Array.isArray(array)) throw new TypeError("Expected array");
    if (typeof callback !== "function")
      throw new TypeError("Expected function");
    const length = array.length;
    let index = 0;
    let accumulator;
    if (initial.length) accumulator = initial[0];
    else {
      while (index < length && !(index in array)) index++;
      if (index === length)
        throw new TypeError("Empty array without initial value");
      accumulator = array[index++];
    }
    for (; index < length; index++) {
      if (index in array)
        accumulator = callback(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  console.log(myReduce([1, 2, 3], (sum, n) => sum + n, 0)); // 6
  console.log(myReduce([], () => 1, undefined)); // undefined
  ```

  [MDN: reduce](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

- Повторить 'hello world' три раза через пробел:

  ```javascript
  function repeating(text, count) {
    if (!Number.isInteger(count) || count < 0)
      throw new RangeError("Invalid count");
    return Array(count).fill(text).join(" ");
  }
  console.log(repeating("hello world", 3)); // hello world hello world hello world
  ```

  Метод repeating не встроен в String; repeat повторяет строку без автоматического разделителя.

- `myFunc('!', 4, -10, 34, 0)` → '4!-10!34!0':

  ```javascript
  function myFunc(separator, ...values) {
    return values.join(separator);
  }
  console.log(myFunc("!", 4, -10, 34, 0)); // 4!-10!34!0
  ```

- `five(plus(seven(minus(three()))))` → 9:

  ```javascript
  function calc(num, operation) {
    return operation === undefined ? num : operation(num);
  }
  function three(operation) {
    return calc(3, operation);
  }
  function five(operation) {
    return calc(5, operation);
  }
  function seven(operation) {
    return calc(7, operation);
  }
  function plus(right) {
    return (left) => left + right;
  }
  function minus(right) {
    return (left) => left - right;
  }
  console.log(five(plus(seven(minus(three()))))); // 9
  ```

- `add(5)(9)(-4)(1)`: цепочка возвращает функцию; получить число можно явным приведением.

  ```javascript
  function add(total) {
    function next(value) {
      total += value;
      return next;
    }
    next[Symbol.toPrimitive] = (hint) =>
      hint === "string" ? String(total) : total;
    return next;
  }
  console.log(+add(5)(9)(-4)(1)); // 11
  ```

- `periodOutput(period)` выводит фактически прошедшее время примерно каждые period мс. Задержка таймера не гарантирует точный интервал.

  ```javascript
  function periodOutput(period) {
    if (!Number.isFinite(period) || period <= 0)
      throw new RangeError("Invalid period");
    const start = performance.now();
    const timer = setInterval(
      () => console.log(Math.round(performance.now() - start)),
      period,
    );
    return () => clearInterval(timer);
  }
  // const stop = periodOutput(100);
  // stop(); // остановка
  ```

- `extendedPeriodOutput(period)` увеличивает задержку: period, 2 × period, 3 × period. При period = 100 номинальное суммарное время — 100, 300, 600 мс, а не 100, 200, 300 мс.
  ```javascript
  function extendedPeriodOutput(period) {
    if (!Number.isFinite(period) || period <= 0)
      throw new RangeError("Invalid period");
    const start = performance.now();
    let step = 1;
    let timer;
    let stopped = false;
    function schedule() {
      timer = setTimeout(() => {
        console.log(Math.round(performance.now() - start));
        step++;
        if (!stopped) schedule();
      }, period * step);
    }
    schedule();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }
  ```
  [MDN: setTimeout](https://developer.mozilla.org/ru/docs/Web/API/Window/setTimeout).
