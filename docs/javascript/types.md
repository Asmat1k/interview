---
sidebar_position: 1
format: md
---

# Типы данных и примитивы

## Типы данных
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

## Методы Number
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

## Методы String
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

## Template literals
- Шаблонные литералы - это строковые литералы, допускающие использование выражений внутри.
- Пример: `` `${value} is in string ${str}` `` (используются обратные кавычки).

Документация: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), [trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart), [устаревший substr](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr).

Пример:

```javascript
const name = "Анна";
const count = 2;
console.log(`${name}: ${count + 1} сообщения`); // "Анна: 3 сообщения"
```
