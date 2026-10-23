---
sidebar_position: 2
format: md
---

# Операторы, сравнение и преобразование типов

## Тернарный оператор
- Условный (тернарный) оператор возвращает одно из двух выражений в зависимости от истинности условия; его можно использовать, например, при инициализации переменной.
- Можно использовать несколько операторов подряд.
- Синтаксис: условие ? если верно : если неверно.
- `let result = условие ? значение1 : значение2;`

Пример:

```javascript
const age = 20;
const access = age >= 18 ? "Разрешён" : "Запрещён";
const category = age < 18 ? "Ребёнок" : age < 65 ? "Взрослый" : "Пенсионер";

console.log(access, category); // "Разрешён", "Взрослый"
```

## Операторы и преобразования типов

Документация: [MDN: операторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators), [сравнение `<`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than), [нестрогое равенство](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality), [сравнение значений](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

## Преобразование типов данных в Boolean, String, Number:
- Правила зависят от оператора и типов операндов; не все операторы преобразуют значения именно в `Number`:
  - `<`, `>`, `<=`, `>=` сравнивают две строки лексикографически; в других случаях применяются правила числового сравнения, включая `BigInt`.
  - Арифметические `-`, `*`, `/`, `%`, `**` и побитовые операторы работают с `Number` или `BigInt`; смешивание этих двух типов обычно вызывает `TypeError`.
  - Бинарный `+` после преобразования [объектов](objects-arrays.md) в примитивы выполняет конкатенацию, если один из них — строка; иначе выполняет числовое сложение.
  - Унарный `+` преобразует в `Number`, но для `BigInt` и `Symbol` вызывает `TypeError`.
  - `==` и `!=` используют отдельные правила абстрактного равенства; это не безусловное преобразование в число. Например, `null == undefined` равно `true`, а `null == 0` — `false`.

Пример:

```javascript
console.log("10" < "2"); // true: сравнение строк
console.log("10" - 2, "10" + 2); // 8, "102"
console.log(5n + 2n); // 7n
// 5n + 2; // TypeError: нельзя смешивать BigInt и Number
console.log(+"42"); // 42
console.log(null == undefined, null == 0); // true, false
```

## Явное преобразование типов
- `String(value)` — явное преобразование в строку; `value.toString()` вызывает метод значения и недоступен у `null` и `undefined`.
- `Number(value)` / `+value` — преобразование в число (`Number(1n)` допустимо, а `+1n` вызывает `TypeError`; преобразование `Symbol` в число также вызывает `TypeError`):
  - undefined => NaN
  - null => 0
  - true / false => 1 / 0
  - string => Пробельные символы (пробелы, знаки табуляции \t, знаки новой строки \n и т. д.) по краям обрезаются. Если остаётся пустая строка, то получаем 0, иначе из непустой строки «считывается» число. При ошибке результат NaN.
- `Boolean(value)` / `!!value` - преобразование в логический тип:
  - Ложные значения: `false`, `0`, `-0`, `0n`, `NaN`, `""`, `null`, `undefined`; в браузере также историческое исключение `document.all`.
  - Остальные значения истинные, в том числе непустые строки (`"0"`, `"false"`), массивы и объекты.

Пример:

```javascript
console.log(String(null), String(undefined)); // "null", "undefined"
console.log(Number(undefined), Number(null)); // NaN, 0
console.log(Number(true), Number(false)); // 1, 0
console.log(Number("  "), Number(" 12 "), Number("12px")); // 0, 12, NaN
console.log(Number(1n)); // 1; +1n вызвал бы TypeError
console.log(Boolean(0), Boolean(0n), Boolean("")); // false, false, false
console.log(Boolean("false"), Boolean([]), Boolean({})); // true, true, true
```

## Строгое равенство (`===`)
- Оператор строгого равенства `===` проверяет равенство без приведения типов. Если `a` и `b` имеют разные типы, то проверка `a === b` немедленно возвращает `false`.

Документация: [MDN: операторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators), [сравнение `<`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than), [нестрогое равенство](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality), [сравнение значений](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

Пример:

```javascript
console.log(1 === "1"); // false
console.log(NaN === NaN); // false
console.log(+0 === -0); // true

const user = {};

console.log(user === user, user === {}); // true, false
```

## Object.is():
- Метод `Object.is()` не выполняет приведение типов.
- Определяет, являются ли два значения одинаковыми. Два значения являются одинаковыми в следующих случаях:
  - оба равны `undefined`
  - оба равны `null`
  - оба равны `true`, либо оба равны `false`
  - оба являются строками с одинаковой длиной и одинаковыми символами
  - оба являются одним и тем же объектом
  - оба являются одним и тем же символом или значениями BigInt с одинаковым числовым значением
  - оба являются числами и:
    - оба равны +0
    - оба равны -0
    - оба равны NaN
    - либо оба не равны нулю или NaN и оба имеют одинаковое значение
- Не схож с `===`:
  - `Object.is` считает значения -0 и +0 разными и считает `NaN` равным `NaN` (в отличие от `===`).

Документация: [MDN: операторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators), [сравнение `<`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than), [нестрогое равенство](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality), [сравнение значений](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

Пример:

```javascript
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
console.log(Object.is(1, "1")); // false

const id = Symbol("id");

console.log(Object.is(id, id), Object.is(1n, 1n)); // true, true
```

## Типы данных, сравнение типов, преобразование типов

### Типы данных

- `number`
- `bigint`
- `string`
- `symbol`
- `boolean`
- `undefined`
- `null`
- `Object` _**(не примитив)**_

- Различие между undefined и null:
  - `undefined` - отсутствие значения (переменная объявлена, но не определена)
  - `null` - умышленное отсутствие значения (пустое)

- `typeof null == 'object'`
- `typeof NaN == 'number'`

Пример:

```javascript
const values = [1, 1n, "текст", Symbol("id"), true, undefined, null, {}];

console.log(values.map((value) => typeof value));
// ["number", "bigint", "string", "symbol", "boolean", "undefined", "object", "object"]
```

### Сравнение типов

- Операторы сравнения: `<` `<=` `>=` `==` `===` `!=`
- Результат: true или false
- Сравнение строк:
  - Чтобы определить, что одна строка больше другой, JavaScript использует «алфавитный» или «лексикографический» порядок.
- Сравнение разных типов:
  - Правила зависят от оператора: === не приводит типы; == имеет особые случаи для null/undefined, объектов и BigInt. < и > сравнивают две строки лексикографически, иначе используют числовое сравнение после преобразования примитивов.
- Строгое сравнение (`===`)
  - Проверяет равенство без приведения типов (обычное `==` делает приведение типов)
  - Если типы разные, то сразу возвращает false

```javascript
console.log(NaN === NaN);
// Вывод: false

console.log(+0 === -0);
// Вывод: true
```

- `Object.is(val1, val2)`
  - Сравнение SameValue: в отличие от ===, считает NaN равным NaN и различает +0 и -0.

```javascript
console.log(Object.is("1", 1));
// Вывод: false

console.log(Object.is(NaN, NaN));
// Вывод: true

console.log(Object.is(-0, 0));
// Вывод: false
```

- Оператор нулевого слияния - `??`
  - возвращает правый операнд, если левый равен `null` или `undefined`; иначе возвращает левый

- Дополнительная информация
  - **Строгое** сравнение undefined и null даёт `false`
  - **Нестрогое** сравнение undefined и null даёт `true`

### Преобразование типов

- Строковое преобразование (string) - представление чего-либо в виде строки
  - Явное: `String(value)`
- Числовое преобразование (number)
  - Явное: `Number(value)`
  - Неявное:
    - при арифметических операциях выполняется числовое преобразование (в Number или BigInt), кроме строковой конкатенации через `+`
      - если один из операндов при сложении(+) является строкой, то происходит конкатенация строк и возвращается строка (2 + '2' = '22')
    - используем унарный плюс: +'2' === 2;
    - `==` выполняет преобразования по специальным правилам, а не всегда приводит оба значения к числу.
  - Примеры:
    - undefined -> `NaN` (Not a Number)
    - null -> `0`
    - true / false -> `1` / `0`
    - string -> пробелы по краям отрезаются, если пустая строка, то `0`, если возникла ошибка - `NaN`
- Логическое
  - Явно: `Boolean(value)`, `!!value`
  - Неявно: `&&` и `||` проверяют истинность операндов, но возвращают сами значения, а не обязательно boolean.
    - Оператор `||` - берет первое true значение или последнее falsy (если все другие falsy);

Пример:

```javascript
const values = [42, 42n, "текст", Symbol("id"), true, undefined, null, {}];

console.log(values.map((value) => typeof value));
// ["number", "bigint", "string", "symbol", "boolean", "undefined", "object", "object"]
console.log("10" < "2", "10" < 2); // true, false
console.log(1 == "1", 1 === "1"); // true, false
console.log(null == undefined, null === undefined); // true, false
console.log(0 ?? 10, null ?? 10); // 0, 10
console.log(String(null), Number(" 12 "), Boolean("false")); // "null", 12, true
console.log(Number(undefined), Number(null), Number(true), Number("")); // NaN, 0, 1, 0
console.log("2" + 2, "2" - 2, +"2"); // "22", 0, 2
console.log("" || "запасное", "готово" && 42); // "запасное", 42
```
