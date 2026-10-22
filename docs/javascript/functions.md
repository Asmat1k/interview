---
sidebar_position: 4
format: md
---

# Функции и аргументы

## Виды функций, сходства и отличия

### Виды функций

- `«Anonymous Function Expression»` (анонимное функциональное выражение):
  - Объявление функции в контексте какого-либо выражения, например присваивания.
  - Функция создаётся при вычислении выражения. Доступ к переменной до этого зависит от `var`, `let` или `const`.
  - Имеет собственную привязку `this`

```javascript
const funcExp = function (params) {
  console.log("Its func exp body");
};
```

- `«Named Function Expression»` (названное функциональное выражение):
  - Имя Named Function Expression доступно только внутри самой функции.
  - Удобно использовать для надежного вызова рекурсии

```javascript
const funcExp = function namedFunc(n) {
  if (n <= 0) return;
  console.log(n);
  namedFunc(n - 1);
};
```

- `«Function Declaration»` (объявление функции):
  - Функция, объявленная в основном потоке кода.
  - **Всплывает: инициализирована до исполнения тела области видимости, поэтому доступна до строки объявления**.
  - Имеет собственную привязку `this`.

```javascript
function funcDec(params) {
  console.log("Its func declar body");
}
```

- `«Arrow Function»` (стрелочная функция):
  - Стрелочная функция не имеет собственного `this`: он берётся из внешнего лексического окружения. Это не означает отсутствия собственного вызова и локальной области видимости.
  - `this` берется не в момент вызова функции, а в момент ее создания!
  - Никогда не могут использоваться в качестве функций-конструкторов и никогда не могут вызываться с помощью оператора `new`
  - Не имеют собственного arguments; при обращении используется внешнее лексическое окружение
  - Функция создаётся при вычислении выражения. Доступ к переменной до этого зависит от `var`, `let` или `const`.
  - Если не указывать {} (скобки) после =>, то идет неявный возврат результата

```javascript
const funcArr = (params) => {
  console.log("Its arrow func body");
};
```

- Из-за того, что у них нет собственного this, то и привязать его, используя специальные методы (см. ниже), нельзя

- `IIFE` (Immediately Invoked Function Expression)
  - Функция, которая выполняется сразу же после того, как она была определена
  - Изолируют локальные переменные от внешней области видимости; возвращённые замыкания могут сохранять к ним доступ
  - Память освобождается сборщиком мусора, когда значения становятся недостижимыми; немедленная очистка не гарантируется

```js
(function () {
  const message = "Локальная переменная";
  console.log(message);
})();
```

- Дополнительная информация:
  - Функция **высшего порядка** - функция, которая принимает в качестве параметра функцию (колбэк) или возвращает функцию

Пример:

```javascript
function applyTwice(fn, value) {
  return fn(fn(value));
} // функция высшего порядка
console.log(applyTwice((n) => n + 1, 0)); // 2
const user = {
  name: "Анна",
  makeGreeting() {
    return () => this.name;
  }, // this стрелки взят из вызова метода
};
const greet = user.makeGreeting();
console.log(greet.call({ name: "Иван" })); // "Анна": call не меняет this стрелки
```

## Функции
- `«Function Expression»` (функциональное выражение):
  - Объявление функции в контексте какого-либо выражения, например присваивания.
  - Создаётся при вычислении выражения; доступность переменной до этого зависит от её объявления (`var`, `let` или `const`).
  - Имеет собственный `this`.

- `«Function Declaration»`:
  - Функция, объявленная самостоятельной инструкцией `function name() {}`. Область видимости зависит от места объявления; в строгом режиме функции внутри блока имеют блочную область видимости.
  - **Всплывает**.
  - Имеет собственный `this`.

- `«Arrow Function»`:
  - При вызове создаётся контекст выполнения, но нет собственной привязки `this`: используется `this` внешней лексической области.
  - Стрелочные функции не могут быть использованы как конструкторы. Они не могут быть вызваны с `new`.
  - Не имеют собственного `arguments`; обращение к нему ищет привязку во внешней области.

Документация: [MDN: стрелочные функции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).

Пример:

```javascript
console.log(declared(2)); // 4: Function Declaration доступна заранее

function declared(n) { return n * 2; }

const expression = function (n) { return n * 2; }; // Function Expression

const arrow = n => n * 2; // Arrow Function

console.log(expression(2), arrow(2)); // 4, 4

const user = {
  name: "Анна",
  greet() { return (() => this.name)(); } // стрелка использует this метода
};

console.log(user.greet()); // "Анна"

function first() { return (() => arguments[0])(); }

console.log(first("аргумент")); // "аргумент": arguments внешней функции
// new arrow(); // TypeError: стрелка не конструктор
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
