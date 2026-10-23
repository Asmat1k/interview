---
sidebar_position: 1
format: md
---

# Учебные реализации встроенных методов

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
