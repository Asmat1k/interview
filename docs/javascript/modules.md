---
sidebar_position: 10
format: md
---

# Модули JavaScript

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

CommonJS — система модулей, используемая в Node.js. Каждый файл имеет собственную область видимости; `require()` получает экспорт через `module.exports`. Загруженные модули кешируются. Файл `.cjs` явно обозначает CommonJS; браузер не предоставляет `require()` без дополнительных инструментов.

Документация: [Node.js — CommonJS](https://nodejs.org/api/modules.html).

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

ES-модули — стандартная система модулей JavaScript с `import` и `export`. В браузере точку входа подключают через `<script type="module">`; модуль работает в строгом режиме. Именованный импорт соответствует имени экспорта, а default-импорту можно дать собственное локальное имя.

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

`export` делает выбранное объявление доступным другим модулям; остальные имена остаются локальными. `import { myFunc }` связывает локальное имя с именованным экспортом, а `import { myFunc as run }` позволяет переименовать его. Для загрузки модуля по условию используют `import()`, который возвращает Promise.

Документация: [MDN — Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

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
