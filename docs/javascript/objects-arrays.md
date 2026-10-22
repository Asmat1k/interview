---
sidebar_position: 6
format: md
---

# Объекты, массивы и ссылки

## Объекты, массивы и работа со ссылками

### Объекты (Object - не примитивный тип данных)

- Объекты используются для хранения коллекций различных значений и более сложных сущностей
- Объект состоит из свойств: пар «ключ — значение».
- Вычисляемые свойства
  - Мы можем использовать квадратные скобки в литеральной нотации для создания вычисляемого свойства.

```js
let fruit = prompt("Какой фрукт купить?", "apple");
let bag = {
  [fruit]: 5,
};
alert(bag.apple); // 5, если fruit="apple"
```

- Смысл вычисляемого свойства прост: запись [fruit] означает, что имя свойства необходимо взять из переменной fruit.

- Для удаления используют - `delete` , например `delete user.age`
- Проверка на существование при помощи оператора `in`

```js
const object = { key: 1 };
console.log("key" in object); // true
```

- `for...in` - используется для перебора ключей

```js
const obj = { name: "Анна", age: 25 };
for (let key in obj) {
  console.log(key);
  console.log(obj[key]);
}
```

- for...in перебирает перечисляемые строковые ключи, включая унаследованные; символы пропускает. Для каждого объекта в цепочке индексы идут по возрастанию, остальные строки — по созданию.

- **Копирование** объектов:
  - Для неглубокого (поверхностного) копирования используется `Object.assign()` (см. ниже)

```js
const dest = {};
const src1 = { name: "Анна" };
const src2 = { age: 25 };
const src3 = { active: true };
Object.assign(dest, src1, src2, src3);
console.log(dest); // { name: "Анна", age: 25, active: true }
// dest - целевой объект
// src1, src2... - исходные объекты
```

- Для глубокого можно реализовать рекурсию или глобальный метод `structuredClone()` для поддерживаемых типов: он сохраняет циклические ссылки, но не копирует функции, DOM-узлы и произвольные цепочки прототипов. (Либо можно прибегнуть к сторонним библиотекам)

- **Методы** объекта (Objects Built-in methods)
- `Object.create(proto)` создаёт объект с заданным прототипом, которым может быть объект или null.

```javascript
const prototype = { active: true };
const user = Object.create(prototype);
console.log(user.active); // true: свойство найдено в прототипе
```

- `Object.keys()` возвращает собственные перечисляемые строковые ключи объекта.

```javascript
console.log(Object.keys({ name: "Анна", age: 25 })); // ["name", "age"]
```

- `Object.values()` возвращает значения собственных перечисляемых строковых свойств объекта.

```javascript
console.log(Object.values({ name: "Анна", age: 25 })); // ["Анна", 25]
```

- `Object.entries()` возвращает пары собственных перечисляемых строковых ключей и их значений.

```javascript
console.log(Object.entries({ age: 25 })); // [["age", 25]]
```

- `Object.assign()` копирует значения собственных перечисляемых строковых и символьных свойств источников в целевой объект; вложенные объекты не клонируются.

```javascript
const source = { nested: { count: 1 } };
const copy = Object.assign({}, source);
copy.nested.count = 2;
console.log(source.nested.count); // 2: вложенный объект общий
```

- Также для поверхностного копирования можно использовать spread-синтаксис.

```js
const source = {
  method2() {
    return "method2";
  },
};
const target = { ...source };
target.method2(); // 'method2'
```

- `Object.assign()` и spread не копируют унаследованные методы: они остаются в прототипе.

- `Object.freeze()` - запрещает добавление/удаление собственных свойств и изменение собственных свойств данных; заморозка поверхностная, вложенные объекты не замораживаются.

```javascript
const user = Object.freeze({ name: "Анна", settings: { dark: false } });
user.settings.dark = true; // вложенный объект не заморожен
console.log(Reflect.set(user, "name", "Иван")); // false
```

- `Object.seal()` - запрещает добавление и удаление собственных свойств и делает их неконфигурируемыми; writable-свойства можно изменять.

```javascript
const user = Object.seal({ name: "Анна" });
user.name = "Иван";
console.log(Reflect.deleteProperty(user, "name")); // false
console.log(Reflect.set(user, "age", 25)); // false
```

- `Object.getPrototypeOf()` возвращает прототип объекта или null.

```javascript
const user = Object.create(null);
console.log(Object.getPrototypeOf(user)); // null
```

### Массивы и методы массивов

- Массив – это особый тип объекта, предназначенный для работы с упорядоченным набором элементов.
- Методы массивов (достаточно запомнить мутирующие)
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

- `sort(compareFn)` мутирует и возвращает массив. Без compareFn сравнивает строковые представления по кодовым единицам UTF-16; для чисел обычно используют (a, b) => a - b.

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
  - `slice(start, end)` - копирует заданную часть массива и возвращает её в виде нового массива. Этот метод не трогает оригинальный массив. (Включает start, не включает end)

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
console.log([1, 2].map((n) => n * 2)); // [2, 4]
```

- `filter(func)` - фильтрует элементы через функцию и возвращает все значения, для которых функция возвращает истинное (truthy) значение.

```javascript
console.log([1, 2, 3].filter((n) => n > 1)); // [2, 3]
```

- **ПОИСК:**
  - `indexOf(searchElement, fromIndex)` - ищет элемент, начиная с позиции fromIndex, и возвращает его индекс или -1, если элемент не найден.

```javascript
console.log([1, 2, 1].indexOf(1, 1)); // 2
```

- `includes(searchElement, fromIndex)` возвращает boolean; `lastIndexOf(searchElement, fromIndex)` ищет с конца и возвращает индекс или `-1`.

```javascript
console.log([NaN].includes(NaN)); // true
console.log([1, 2, 1].lastIndexOf(1)); // 2
```

- `find(callback)` - возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию, переданному в callback функции. В противном случае возвращается undefined. Callback принимает (element, index, array).

```javascript
console.log([1, 2, 3].find((n) => n > 1)); // 2
console.log([1].find((n) => n > 1)); // undefined
```

- `findIndex(callback)` - похож на `find`, но возвращает индекс элемента вместо его значения.

```javascript
console.log([1, 2].findIndex((n) => n > 1)); // 1
console.log([1].findIndex((n) => n > 1)); // -1
```

- `reduce(callback, initialValue)` - вычисляет одно значение на основе всего массива, вызывая callback для каждого элемента и передавая промежуточный результат между вызовами.

```javascript
console.log([1, 2, 3].reduce((sum, n) => sum + n, 0)); // 6
```

- `some(fn)` - немедленно возвращает true и останавливает перебор остальных элементов, если fn возвращает истинное значение; иначе возвращает false.

```javascript
console.log([1, 2].some((n) => n > 1)); // true
console.log([].some(Boolean)); // false
```

- `every(fn)` возвращает false при первом ложном результате fn; иначе true (в том числе для пустого массива).

```javascript
console.log([1, 2].every((n) => n > 0)); // true
console.log([].every(Boolean)); // true
```

- `arr.fill(value, start, end)` мутирует массив, заполняя диапазон `[start, end)` значением value.

```javascript
const values = [1, 2, 3];
values.fill(0, 1, 3);
console.log(values); // [1, 0, 0]
```

- `arr.copyWithin(target, start, end)` мутирует массив: копирует диапазон `[start, end)` в позицию target без изменения длины.

```javascript
const values = [1, 2, 3, 4];
values.copyWithin(0, 2, 4);
console.log(values); // [3, 4, 3, 4]
```

- `arr.flat(depth)` разворачивает вложенность на заданную глубину (по умолчанию 1); `flatMap(fn)` совмещает map и разворачивание на один уровень.

```javascript
console.log([1, [2, [3]]].flat()); // [1, 2, [3]]
console.log([1, 2].flatMap((n) => [n, n * 10])); // [1, 10, 2, 20]
```

- **ПЕРЕБОР:**
  - `forEach(callback)` вызывает callback для существующих элементов, пропуская пустые слоты; возвращает undefined.

```javascript
const result = [1, 2].forEach((n) => console.log(n)); // 1, затем 2
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

Документация: [MDN — Array](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array).

### Особенности работы со ссылочными типами данных

- Примитивные значения (например, числа или строки) хранятся в переменной как есть
- присваивание копирует значение; представление в памяти определяется реализацией движка.
- Объекты, массивы и функции — по ссылке на место в памяти.
- компьютер отдаёт нам ссылку на место, где данные хранятся, и самостоятельно будет работать с ними по инструкциям, которые мы ему даём. Таким образом в переменную мы получаем лишь ссылку на данные.

Пример:

```javascript
const original = { nested: { value: 1 } };
const alias = original;
alias.nested.value = 2;
console.log(original.nested.value); // 2: один объект
const shallow = { ...original };
console.log(shallow === original, shallow.nested === original.nested); // false, true
const deep = structuredClone(original);
deep.nested.value = 3;
console.log(original.nested.value); // 2: вложенный объект скопирован
const user = { name: "Анна", age: 25 };
console.log("age" in user); // true
delete user.age;
console.log("age" in user); // false
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

## Встроенные методы Object — дополнительные примеры

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

- Итерируемый объект имеет метод [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator), возвращающий итератор с next(), который возвращает { value, done }.
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
