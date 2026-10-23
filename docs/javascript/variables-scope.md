---
sidebar_position: 3
format: md
---

# Переменные и области видимости

## var, let, const, hoisting и TDZ

### Переменные var, let, const

- VAR (не deprecated; в новом коде обычно предпочитают let/const):
  - Объявления могут обладать глобальной или локальной (функциональной) областью видимости.
  - Переменные var могут быть объявлены повторно или обновлены.
  - Переменные var поднимаются в верхнюю часть своей области видимости и инициализируются со значением undefined (без ошибки).
- LET:
  - Имеет блочную область видимости.
  - Переменные let можно переназначать, но нельзя повторно объявить в той же области видимости.
  - Всплывает
  - Привязка let до выполнения объявления не инициализирована. Если попытаться использовать переменную let до ее объявления, будет ошибка `ReferenceError`.

```javascript
let a;

console.log(a);
// undefined
```

- CONST:
  - Имеет блочную область видимости.
  - Привязки const нельзя переназначать или повторно объявлять в той же области видимости.
    Нельзя присвоить привязке `const` другой объект; свойства текущего объекта можно изменять.
  - Всплывает
  - Привязка const создаётся при входе в область видимости, но до выполнения объявления не инициализирована; чтение вызывает ReferenceError.

### Всплытие (Hoisting)

- Термин для поведения объявлений до строки их появления; код физически не перемещается. `var` заранее инициализирована `undefined`, function declaration — функцией, а `let`, `const` и `class` остаются неинициализированными в TDZ.
- JavaScript сначала объявляет, а затем инициализирует переменные.
- Присваивания выполняются по порядку исполнения и могут перезаписать значение ранее инициализированной функции или переменной.

Пример:

```javascript
console.log(sum(2, 3)); // 5: Function Declaration доступна заранее
console.log(value); // undefined

function sum(a, b) {
  return a + b;
}

var value = 10;
```

### Temporal Dead Zone (TDZ)

- TDZ — период от входа в область видимости до инициализации лексической привязки: она уже объявлена, но доступ вызывает `ReferenceError`.
- Переменная, объявленная с помощью let или const, не может быть доступна до ее объявления в пределах области видимости. Это вызовет ошибку ссылки или инициализации.
- Также нельзя обращаться к классам до их инициализации
- Function declaration обычно доступна до строки объявления; функция в `const`/`let` недоступна до инициализации привязки.

Пример поведения hoisting:

```js
console.log(value); // undefined

if (true) {
  var value = 1;
} // var не ограничена блоком if

// console.log(later); // ReferenceError: TDZ
let later = 2;
```

Пример:

```javascript
function demo() {
  console.log(value); // undefined: var инициализирована заранее

  if (true) {
    var value = 1;
  }

  console.log(value); // 1: var не ограничена блоком

  let count = 0;

  count++;

  const user = { name: "Анна" };

  user.name = "Иван"; // const запрещает переназначение, но не изменение свойств
  // user = {}; // TypeError
  {
    // console.log(count); // ReferenceError: локальная count находится в TDZ
    let count = 10;

    console.log(count); // 10
  }
}

demo();
```

## var / let / const:
- **VAR**:
  - Объявления имеют область видимости функции, а вне функции — глобального скрипта или модуля. Блок `{}` сам по себе не создаёт область видимости для `var`.
  - Переменные `var` могут быть объявлены повторно или обновлены.
  - Переменные `var` поднимаются в верхнюю часть своей области видимости и инициализируются со значением `undefined`.

- **LET**:
  - Имеет блочную область видимости.
  - Значения переменных `let` можно переназначать; повторное объявление в той же области видимости запрещено.
  - Привязка `let` создаётся при входе в область видимости, но остаётся неинициализированной до выполнения объявления (TDZ). Обращение к ней до этого вызывает `ReferenceError`.

- **CONST**:
  - Имеет блочную область видимости.
  - Привязки `const` нельзя переназначать или повторно объявлять в той же области видимости. Обычное объявление требует инициализатора (исключение — заголовок `for...of` / `for...in`).
  - `const` запрещает заменить ссылку на объект, но допускает изменение его свойств.
  - Привязка `const` создаётся при входе в область видимости, но до выполнения объявления находится в TDZ.

Документация: [MDN: грамматика и типы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).

Пример:

```javascript
function demo() {
  if (true) {
    var visible = 1;
    let local = 2;
    const user = { name: "Анна" };

    local = 3;
    user.name = "Иван"; // изменение свойства разрешено
    // user = {}; // TypeError при выполнении
  }

  console.log(visible); // 1
  // console.log(local); // ReferenceError: переменная вне области видимости
}

demo();
```

## Temporal Dead Zone (TDZ):
- **TDZ** — период от начала выполнения области видимости до инициализации привязки `let` / `const` / `class`.
- Доступ к такой привязке в TDZ, в том числе через `typeof`, вызывает `ReferenceError`.

Документация: [MDN: грамматика и типы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).

Пример:

```javascript
const value = "внешнее значение";

{
  // console.log(value); // ReferenceError: затеняющая привязка ещё в TDZ
  // console.log(typeof value); // тоже ReferenceError
  let value = "локальное значение";

  console.log(value); // "локальное значение"
}
```

## Hoisting:
- Hoisting («поднятие») — описание наблюдаемого поведения объявлений, а не физическое перемещение строк исходного кода.
- Объявление функции позволяет вызвать её до места объявления; привязка `var` до выполнения присваивания содержит `undefined`. Присваивания не поднимаются.
- Лексические объявления `let`, `const`, `class` затрагивают всю область видимости, но до инициализации недоступны из-за TDZ.

Документация: [MDN: грамматика и типы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).

Пример:

```javascript
console.log(value); // undefined
console.log(sum(2, 3)); // 5

var value = 10;

function sum(a, b) { return a + b; }

// console.log(later); // ReferenceError
const later = 20;
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
