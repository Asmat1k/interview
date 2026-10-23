---
sidebar_position: 7
format: md
---

# Map, Set и слабые коллекции

## Map и Set, отличия от объектов и массивов

### Map

- Map — это коллекция ключ/значение, похожая на Object, но с возможностью использовать ключи любого типа.
- **Методы:**
  - `new Map()`: создаёт пустую коллекцию.
  - `map.set(key, value)`: добавляет пару ключ/значение.
  - `map.get(key)`: возвращает значение по ключу или `undefined`, если ключ отсутствует.
  - `map.has(key)`: возвращает `true`, если ключ присутствует в коллекции, иначе `false`.
  - `map.delete(key)`: удаляет элемент по ключу.
  - `map.clear()`: очищает коллекцию от всех элементов.
  - `map.size`: возвращает текущее количество элементов.

Пример:

```javascript
const key = {};
const map = new Map([[key, "значение"]]);

console.log(map.get(key), map.has(key), map.size); // "значение", true, 1
map.set("name", "Анна");
console.log(map.delete(key)); // true
map.clear();
console.log(map.size); // 0
```

### Set

- Set — это коллекция уникальных значений.
- **Методы:**
  - `new Set(iterable)`: создаёт Set, можно передать перебираемый объект для инициализации.
  - `set.add(value)`: добавляет значение, возвращает тот же объект set.
  - `set.delete(value)`: удаляет значение, возвращает `true`, если значение было в множестве, иначе `false`.
  - `set.has(value)`: возвращает `true`, если значение присутствует в множестве, иначе `false`.
  - `set.clear()`: удаляет все значения.
  - `set.size`: возвращает количество элементов в множестве.

Пример:

```javascript
const set = new Set([1, 1, 2]);

set.add(3);
console.log(set.size, set.has(2)); // 3, true
console.log(set.delete(2)); // true
set.clear();
console.log(set.size); // 0
```

### Немного про WeakMap и WeakSet

- WeakMap хранит ключи-объекты и незарегистрированные символы без сильной ссылки на них; сборка мусора возможна при их недостижимости
- WeakSet хранит [объекты](objects-arrays.md) и незарегистрированные символы слабо; перечислить его содержимое нельзя
- **То есть их преимущество в очистке от мусора при недостижимости данных**

Пример:

```javascript
let key = {};

const metadata = new WeakMap([[key, "метаданные"]]);
const visited = new WeakSet([key]);

console.log(metadata.get(key), visited.has(key)); // "метаданные", true
key = null; // если других ссылок нет, объект может быть собран
```

Документация: [MDN — WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

### Отличия объектов и массивов

- У каждого свои методы
- Массив задаёт индексированную последовательность; порядок собственных ключей обычного объекта также определён: индексы по возрастанию, остальные строки и символы — по созданию (набор ключей зависит от метода обхода)
- Ключи свойств и массива, и обычного объекта — строки или символы; индексы массива представлены строковыми ключами. Map допускает ключи любых типов

Пример:

```javascript
const key = {};
const map = new Map();

map.set(key, "значение");
console.log(map.get(key), map.has(key), map.size); // "значение", true, 1
console.log(map.delete(key)); // true

map.set("name", "Анна");
map.clear();
console.log(map.size); // 0

const set = new Set([1, 1, 2]);

set.add(3);
console.log(set.has(2), set.size); // true, 3
console.log(set.delete(2)); // true

set.clear();
console.log(set.size); // 0

let object = {};
const weakMap = new WeakMap([[object, "метаданные"]]);
const weakSet = new WeakSet([object]);

console.log(weakMap.get(object), weakSet.has(object)); // "метаданные", true

object = null; // ключ теперь может быть собран; момент сборки не гарантирован

const record = { 2: "б", 1: "а", name: "Анна" };

console.log(Object.keys(record)); // ["1", "2", "name"]
console.log([
  ...new Map([
    [2, "б"],
    [1, "а"],
  ]).keys(),
]); // [2, 1]: порядок вставки
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
