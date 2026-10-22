# Вопросы к собеседованию: CoreJS № 1

## Основы
### Типы данных
В JavaScript семь примитивных типов и тип Object; названия ниже обозначают типы, а не результат `typeof` (для `null` он равен `"object"`).

1. `String`
2. `Number`
3. `BigInt`
4. `Boolean`
5. `Undefined`
6. `Null`
7. `Symbol`
8. `Object`

Документация: [MDN: типы данных](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

Пример:

```javascript
const values = ["текст", 42, 42n, true, undefined, null, Symbol("id"), {}];
console.log(values.map(value => typeof value));
// ["string", "number", "bigint", "boolean", "undefined", "object", "symbol", "object"]
console.log(null === null); // true: null — отдельный примитивный тип
```

### Методы Number
- `.toString(base)` - возвращает число как строку, также возвращает строковое представление числа num в системе счисления.
- `.toExponential(fractionDigits)` - возвращает строку с числом в экспоненциальной нотации с указанным количеством знаков после десятичной точки.
- `.toFixed(digits)` - возвращает строку с числом, записанным с заданным количеством знаков после десятичной точки.
- `.valueOf()` - возвращает примитивное значение числа.
Дополнительно:
- `isNaN(value)` - преобразует значение в число и проверяет является ли оно NaN.
- `isFinite(value)` - преобразует аргумент в число и возвращает true, если оно является обычным числом, то есть не NaN/Infinity/-Infinity.
- `parseInt` и `parseFloat` - они «читают» число из строки. Разбор останавливается на первом недопустимом символе; если допустимого числового начала нет, возвращается `NaN`. Функция parseInt возвращает целое число, а parseFloat возвращает число с плавающей точкой (удобно читать числа с единицей измерения).

Документация: [MDN: типы данных](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

Пример:

```javascript
const value = 12.345;
console.log(value.toString(), (255).toString(16)); // "12.345", "ff"
console.log(value.toExponential(2)); // "1.23e+1"
console.log(value.toFixed(2)); // "12.35"
console.log(new Number(5).valueOf()); // 5
console.log(isNaN("текст"), isNaN("")); // true, false
console.log(isFinite("10"), isFinite(Infinity)); // true, false
console.log(parseInt("12px", 10), parseFloat("12.5px")); // 12, 12.5
```

### Методы String
- `length` — свойство, содержащее длину строки в кодовых единицах UTF-16; она может отличаться от количества видимых символов.
- `toLowerCase()`/`toUpperCase()` - смена регистра строки.
- `split(separator)` — возвращает **массив**, разбивая строку по разделителю (строке или регулярному выражению).
- `repeat(count)` - возвращает **новую строку**, повторяет строку count раз.
- `includes(searchString)` - возвращает **true/false**, проверяет строку на наличие фразы/символа.
- `startsWith(value)` и `endsWith(value)` - проверяют, соответственно, начинается ли и заканчивается ли строка определённой строкой.
- `indexOf(searchValue)`/`lastIndexOf(searchValue)` — возвращают индекс первого / последнего вхождения подстроки или `-1`, если она не найдена.
- `slice(start, end)` — возвращает **новую строку** от `start` включительно до `end` исключительно (по умолчанию до конца строки); отрицательные индексы отсчитываются от конца.
- `str.substring(start [, end])` - возвращает часть строки между start и end (не включая) end. Отрицательные значения считаются равными `0`.
Если `start > end`, `substring()` меняет аргументы местами; `slice()` в этом случае возвращает пустую строку.
- `str.substr(start [, length])` — возвращает часть строки от `start` длины `length`. Метод устарел; для нового кода используйте `slice()` или `substring()`.
- `replace(searchValue, newValue)` — возвращает **новую строку** с заменой. Строковый шаблон заменяет только первое вхождение; регулярное выражение с флагом `g` — все. Второй аргумент может быть строкой или функцией.
- `replaceAll(searchValue, newValue)` — заменяет все найденные совпадения строкой или результатом функции и возвращает **новую строку**. Если шаблон — регулярное выражение, обязателен флаг `g`.
- `trim()`/`trimEnd()`/`trimStart()` — возвращают новую строку без пробельных символов с обоих концов / в конце / в начале соответственно.

Документация: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), [trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart), [устаревший substr](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr).

Пример:

```javascript
console.log("😀".length); // 2 кодовые единицы UTF-16
console.log("ПрИвЕт".toLowerCase(), "Привет".toUpperCase()); // "привет", "ПРИВЕТ"
console.log("а,б".split(",")); // ["а", "б"]
console.log("ха".repeat(2)); // "хаха"
console.log("JavaScript".includes("Script")); // true
console.log("index.js".startsWith("index"), "index.js".endsWith(".js")); // true, true
console.log("банан".indexOf("а"), "банан".lastIndexOf("а")); // 1, 3
console.log("abcdef".slice(1, 3), "abcdef".slice(-2)); // "bc", "ef"
console.log("abcdef".substring(3, 1), "abc".substring(-1, 2)); // "bc", "ab"
console.log("abcdef".substr(1, 2)); // "bc"; устаревший метод
console.log("а-а".replace("а", "б")); // "б-а"
console.log("а-а".replaceAll("а", "б")); // "б-б"
console.log("  а  ".trim(), "  а  ".trimStart(), "  а  ".trimEnd()); // "а", "а  ", "  а"
```

### Template literals
- Шаблонные литералы - это строковые литералы, допускающие использование выражений внутри.
- Пример: `` `${value} is in string ${str}` `` (используются обратные кавычки).

Документация: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), [trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart), [устаревший substr](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr).

Пример:

```javascript
const name = "Анна";
const count = 2;
console.log(`${name}: ${count + 1} сообщения`); // "Анна: 3 сообщения"
```

### Тернарный оператор
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

### Преобразование типов данных в Boolean, String, Number:
- Правила зависят от оператора и типов операндов; не все операторы преобразуют значения именно в `Number`:
  - `<`, `>`, `<=`, `>=` сравнивают две строки лексикографически; в других случаях применяются правила числового сравнения, включая `BigInt`.
  - Арифметические `-`, `*`, `/`, `%`, `**` и побитовые операторы работают с `Number` или `BigInt`; смешивание этих двух типов обычно вызывает `TypeError`.
  - Бинарный `+` после преобразования объектов в примитивы выполняет конкатенацию, если один из них — строка; иначе выполняет числовое сложение.
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

### Явное преобразование типов
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

### Строгое равенство (`===`)
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

### Object.is():
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

### var / let / const:
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

### Temporal Dead Zone (TDZ):
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

### Hoisting:
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

### Что такое полифилы (polyfills)?
- Термин **«полифил»** означает, что скрипт «заполняет» пробелы и добавляет современные функции.
- Полифил - это фрагмент кода (обычно JavaScript), который позволяет использовать современную функциональность в более старых браузерах, которые не поддерживают ее по умолчанию.
- Новые возможности языка могут включать встроенные функции и синтаксические конструкции. Транспилер переписывает код, преобразовывая новые синтаксические конструкции в старые. Но что касается новых встроенных функций, их нужно как-то реализовать. Полифил может реализовать отсутствующий API, если среда предоставляет нужные возможности; не любую функциональность можно полноценно воспроизвести на JavaScript.

Документация: [MDN: polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill).

Пример:

```javascript
// Учебный полифил: добавляем API, если среда не предоставляет его.
if (!Number.isNaN) {
  Object.defineProperty(Number, "isNaN", {
    value: function (value) { return typeof value === "number" && value !== value; },
    writable: true,
    configurable: true
  });
}

console.log(Number.isNaN(NaN), Number.isNaN("текст")); // true, false
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

## Встроенные методы Object
- `Object.create(proto)` — создаёт объект с указанным прототипом `proto` (объектом или `null`).

  ```javascript
  const prototype = { active: true };
  const user = Object.create(prototype);
  console.log(user.active); // true: свойство найдено в прототипе
  ```
- `Object.keys()` — возвращает массив собственных перечисляемых строковых ключей объекта.

  ```javascript
  console.log(Object.keys({ name: "Анна", age: 25 })); // ["name", "age"]
  ```
- `Object.values()` — возвращает значения собственных перечисляемых свойств со строковыми ключами.

  ```javascript
  console.log(Object.values({ name: "Анна", age: 25 })); // ["Анна", 25]
  ```
- `Object.entries()` — возвращает массив пар `[ключ, значение]` собственных перечисляемых свойств со строковыми ключами.

  ```javascript
  console.log(Object.entries({ age: 25 })); // [["age", 25]]
  ```
- `Object.assign(target, ...sources)` — поверхностно копирует собственные перечисляемые свойства (в том числе символьные) источников в `target` и возвращает `target`; вложенные объекты не клонируются.

  ```javascript
  const source = { nested: { count: 1 } };
  const copy = Object.assign({}, source);
  copy.nested.count = 2;
  console.log(source.nested.count); // 2: вложенный объект общий
  ```
- `Object.freeze()` — запрещает добавление/удаление собственных свойств, изменение их конфигурации и значений свойств данных. Заморозка поверхностная: вложенные объекты не замораживаются автоматически.

  ```javascript
  const user = Object.freeze({ name: "Анна", settings: { dark: false } });
  user.settings.dark = true; // вложенный объект не заморожен
  console.log(Reflect.set(user, "name", "Иван")); // false
  ```
- `Object.seal()` — запрещает добавление и удаление собственных свойств и делает их неконфигурируемыми; значения можно менять, если свойство доступно для записи.

  ```javascript
  const user = Object.seal({ name: "Анна" });
  user.name = "Иван";
  console.log(Reflect.deleteProperty(user, "name")); // false
  console.log(Reflect.set(user, "age", 25)); // false
  ```
- `Object.getPrototypeOf()` — возвращает прототип объекта (`[[Prototype]]`). Устаревший аксессор `__proto__` доступен не у всех объектов; используйте стандартный метод.

  ```javascript
  const user = Object.create(null);
  console.log(Object.getPrototypeOf(user)); // null
  ```

Документация: [MDN: Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), [перечисляемость и принадлежность свойств](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties), [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), [seal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal).

## Встроенные методы Array
- **МУТИРУЮТ:**
  - `push(...items)` - добавляет элементы в конец.

    ```javascript
    const values = [1, 2];
    console.log(values.push(3)); // 3 — новая длина
    console.log(values); // [1, 2, 3]
    ```
  - `pop()` - извлекает элемент с конца.

    ```javascript
    const values = [1, 2];
    console.log(values.pop(), values); // 2, [1]
    ```
  - `shift()` - извлекает элемент с начала.

    ```javascript
    const values = [1, 2];
    console.log(values.shift(), values); // 1, [2]
    ```
  - `unshift(...items)` - добавляет элементы в начало.

    ```javascript
    const values = [2];
    console.log(values.unshift(1), values); // 2, [1, 2]
    ```
  - `sort(func)` - сортирует массив «на месте» и возвращает его. Без функции сравнения сортирует по строковому представлению (порядку кодовых единиц UTF-16). Чтобы сравнивать элементы как числа, то надо писать свой callback.

    ```javascript
    const values = [10, 2, 1];
    values.sort((a, b) => a - b);
    console.log(values); // [1, 2, 10]
    ```
  - `splice(start, deleteCount, ...items)` - изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые.

    ```javascript
    const values = [1, 2, 3];
    console.log(values.splice(1, 1, 9)); // [2] — удалённые элементы
    console.log(values); // [1, 9, 3]
    ```
  - `reverse()` - меняет порядок следования элементов на противоположный и возвращает изменённый массив.

    ```javascript
    const values = [1, 2, 3];
    values.reverse();
    console.log(values); // [3, 2, 1]
    ```

- **ВОЗВРАЩАЮТ НОВЫЙ:**
  - `slice(start, end)` - копирует заданную часть массива и возвращает её в виде нового массива. Этот метод не трогает оригинальный массив. (`start` включается, `end` не включается; копирование поверхностное)

    ```javascript
    const values = [1, 2, 3];
    console.log(values.slice(1, 2)); // [2]
    console.log(values); // [1, 2, 3]
    ```
  - `concat(...items)` - возвращает новый массив, копирует все элементы текущего массива и добавляет к нему items. Если какой-то из items является массивом, добавляются его элементы.

    ```javascript
    console.log([1].concat([2, 3], 4)); // [1, 2, 3, 4]
    ```
  - `map(func)` - создаёт новый массив из результатов вызова func для каждого элемента.

    ```javascript
    console.log([1, 2].map(n => n * 2)); // [2, 4]
    ```
  - `filter(func)` — возвращает новый массив элементов, для которых результат `func` истинен после преобразования к Boolean.

    ```javascript
    console.log([1, 2, 3].filter(n => n > 1)); // [2, 3]
    ```

- **ПОИСК И ОБРАБОТКА:**
  - `indexOf(searchElement, fromIndex)` - ищет элемент, начиная с позиции fromIndex, и возвращает его индекс или -1, если элемент не найден.

    ```javascript
    console.log([1, 2, 1].indexOf(1, 1)); // 2
    ```
  - `includes(searchElement, fromIndex)` — возвращает `true`, если элемент найден, иначе `false`; умеет находить `NaN`.

    ```javascript
    console.log([NaN].includes(NaN)); // true
    ```
  - `lastIndexOf(searchElement, fromIndex)` — ищет справа налево и возвращает индекс последнего найденного элемента или `-1`; использует строгое равенство.

    ```javascript
    console.log([1, 2, 1].lastIndexOf(1)); // 2
    ```
  - `find(callback)` - возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию, переданному в callback функции. В противном случае возвращается undefined. Callback принимает (element, index, array).

    ```javascript
    console.log([1, 2, 3].find(n => n > 1)); // 2
    console.log([1].find(n => n > 1)); // undefined
    ```
  - `findIndex(callback)` — похож на `find`, но возвращает индекс элемента или `-1`, если совпадений нет.

    ```javascript
    console.log([1, 2].findIndex(n => n > 1)); // 1
    console.log([1].findIndex(n => n > 1)); // -1
    ```
  - `reduce(callback, initialValue)` - вычисляет одно значение на основе всего массива, вызывая callback для каждого элемента и передавая промежуточный результат между вызовами.

    ```javascript
    console.log([1, 2, 3].reduce((sum, n) => sum + n, 0)); // 6
    ```
  - `some(fn)` — возвращает `true` и прекращает перебор при первом истинном результате `fn`; иначе возвращает `false` (в том числе для пустого массива).

    ```javascript
    console.log([1, 2].some(n => n > 1)); // true
    console.log([].some(Boolean)); // false
    ```
  - `every(fn)` — возвращает `false` и прекращает перебор при первом ложном результате `fn`; иначе возвращает `true` (в том числе для пустого массива).

    ```javascript
    console.log([1, 2].every(n => n > 0)); // true
    console.log([].every(Boolean)); // true
    ```
  - `arr.fill(value, start, end)` — **мутирует** массив, заполняя его значением `value` от `start` включительно до `end` исключительно; возвращает исходный массив.

    ```javascript
    const values = [1, 2, 3];
    values.fill(0, 1, 3);
    console.log(values); // [1, 0, 0]
    ```
  - `arr.copyWithin(target, start, end)` — **мутирует** массив, копируя участок от `start` включительно до `end` исключительно на позицию `target`; длина не меняется.

    ```javascript
    const values = [1, 2, 3, 4];
    values.copyWithin(0, 2, 4);
    console.log(values); // [3, 4, 3, 4]
    ```
  - `arr.flat(depth)` — возвращает новый массив, раскрывая вложенные массивы до заданной глубины (по умолчанию `1`). `flatMap(fn)` сначала применяет `fn`, затем раскрывает результат на один уровень.

    ```javascript
    console.log([1, [2, [3]]].flat()); // [1, 2, [3]]
    console.log([1, 2].flatMap(n => [n, n * 10])); // [1, 10, 2, 20]
    ```

- **ПЕРЕБОР:**
  - `forEach(callback)` — вызывает callback для каждого существующего элемента (пропускает пустые слоты) и возвращает `undefined`.

    ```javascript
    const result = [1, 2].forEach(n => console.log(n)); // 1, затем 2
    console.log(result); // undefined
    ```

- **ПРЕОБРАЗОВАНИЯ:**
  - `split/join` - преобразует строку в массив и обратно.

    ```javascript
    const words = "один два".split(" ");
    console.log(words); // ["один", "два"]
    console.log(words.join("-")); // "один-два"
    ```

- **ПРОВЕРКА:**
  - `Array.isArray(arr)` - проверяет, является ли arr массивом.

    ```javascript
    console.log(Array.isArray([])); // true
    console.log(Array.isArray({ length: 0 })); // false
    ```

Документация: [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some), [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every), [lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf), [flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap).

## Браузер
### События
- События мыши:
  - `click` — активация элемента основной кнопкой мыши, касанием или клавиатурой (для поддерживающих такую активацию элементов).
  - `contextmenu` — запрос контекстного меню, обычно правой кнопкой мыши или клавишей контекстного меню.
  - `mouseover` / `mouseout` - когда мышь наводится на элемент / покидает элемент.
  - `mousedown` / `mouseup` - когда нажали / отпустили кнопку мыши на элементе.
  - `mousemove` - при движении мыши.

- События на элементах управления:
  - `submit` — событие на форме при попытке отправки, прошедшей встроенную валидацию; возникает также при `requestSubmit()`, но не при прямом вызове `form.submit()`.
  - `focus` — элемент получил фокус (мышью, клавиатурой или программно).

- Клавиатурные события:
  - `keydown` / `keyup` - когда пользователь нажимает / отпускает клавишу.

- События документа:
  - `DOMContentLoaded` — HTML разобран, DOM построен и отложенные (`defer` и обычные модульные) скрипты выполнены; загрузки изображений событие не ждёт.

- CSS-события:
  - `transitionend` — завершён CSS-переход (`transition`); завершение CSS-анимации (`animation`) обозначает `animationend`. При отмене перехода `transitionend` не возникает.

Документация: [MDN: click](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event), [contextmenu](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event), [submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event), [transitionend](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event).

Пример:

```javascript
// Выполните в браузере после разбора HTML.
const button = document.createElement("button");
button.type = "button";
button.textContent = "Нажмите";
document.body.append(button);

for (const type of ["click", "contextmenu", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "focus", "keydown", "keyup"]) {
  button.addEventListener(type, event => console.log(event.type));
}

const form = document.createElement("form");
form.innerHTML = '<button type="submit">Отправить</button>';
form.addEventListener("submit", event => {
  event.preventDefault();
  console.log("submit: форма готова к отправке");
});

document.body.append(form);
const onReady = () => console.log("DOM готов");
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onReady, { once: true });
} else {
  onReady();
}

button.style.transition = "opacity 0.2s";
button.addEventListener("transitionend", event => console.log(event.propertyName));
// При потере фокуса меняется opacity; после перехода выводится "opacity".
button.addEventListener("blur", () => { button.style.opacity = "0.5"; });
```

## Принципы проектирования
Эти принципы помогают выбирать решения при разработке; они не являются требованиями JavaScript или веб-стандартов.

- `KISS` (Keep It Simple and Straightforward) - провозглашает, что следует избегать ненужной сложности.
- `YAGNI` (You Aren’t Gonna Need It) - принцип, согласно которому следует писать код только тогда, когда в нем есть необходимость, а не исходя из предположений о будущих потребностях.

Пример:

```javascript
// KISS: простое вычисление вместо лишней иерархии классов.
const total = prices => prices.reduce((sum, price) => sum + price, 0);
console.log(total([10, 20])); // 30
// YAGNI: реализуем нужный формат отчёта; другие добавим при появлении задачи.
const report = rows => rows.join("\n");
console.log(report(["Продажи: 30", "Расходы: 10"]));
```
