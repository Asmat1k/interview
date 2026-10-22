# JavaScript:

### Objects Built-in methods.

  - Know static Object methods
    - `Object.create()` используется для создания новых объектов и их привязки к прототипу существующего объекта.
    - `Object.keys()` возвращает массив собственных перечисляемых строковых ключей объекта.
    - `Object.values()` возвращает значения собственных перечисляемых свойств со строковыми ключами.
    - `Object.entries()` возвращает массив пар [ключ, значение] для собственных перечисляемых свойств со строковыми ключами.
    - `Object.assign(target, ...sources)` поверхностно копирует собственные перечисляемые строковые и символьные свойства источников в target и возвращает target.
    - `Object.freeze()` запрещает добавление и удаление собственных свойств, делает их неконфигурируемыми, а свойства данных — незаписываемыми. Заморозка поверхностная: вложенные объекты и поведение сеттеров автоматически не замораживаются.
    - `Object.seal()` запрещает добавление и удаление собственных свойств и делает их неконфигурируемыми. Значения свойств данных можно менять, только если writable: true.
    - `Object.getPrototypeOf()` возвращает внутренний прототип [[Prototype]]. Устаревший аксессор `Object.prototype.__proto__` доступен не у всех объектов; используйте стандартные методы работы с прототипом.
  - Property flags & descriptors (student is able to set property via `Object.defineProperty`)
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
      - ```javascript
          const user = { name: "Анна" };
          Object.defineProperty(user, "name", {
              writable: false
          });
          ```
      - В дескрипторе можно отдельно настроить writable, enumerable и configurable; свойства-аксессоры используют get/set вместо value/writable.
  - Know how to create iterable objects, Symbol.iterator usage `(optional)`
    - Итерируемый объект имеет метод [Symbol.iterator](), возвращающий итератор с next(), который возвращает { value, done }.
      ```javascript
      const iterable = {
        *[Symbol.iterator]() { yield 1; yield 2; }
      };
      console.log([...iterable]); // [1, 2]
      ```

### ECMAScript Data Types & Expressions

  - Object computed props
      - Пусть имя некоторого свойства хранится в переменной:
        ```javascript
        let key = 'a';
        ```
        Давайте сделаем так, чтобы вместо имени свойства взялось значение из нашей переменной. Для этого переменную следует взять в квадратные скобки:
        ```javascript
        let obj = {
        	[key]: 1,
        	b: 2, 
        	c: 3
        };
        ```
  - Be able to loop through Object keys
    - `for...in` перечисляет перечисляемые строковые свойства, включая унаследованные; для собственных используйте Object.hasOwn(obj, key).
    - `Object.keys` method
    - `Object.values` method
    - `Object.entries` method
      
### Functional Scope

  - Know global scope and functional scope
    - В обычном скрипте объявления верхнего уровня относятся к глобальной области. В ES-модуле верхний уровень имеет область модуля. Глобальные let/const не становятся свойствами window.
    - Переменные, которые используются только в определенной части кода, считаются помещенными в локальную область видимости. Такие переменные называются локальными.
  - Know variables visibility areas
    - `VAR`
       - `var` имеет область функции либо верхнего уровня скрипта/модуля и не ограничивается обычным блоком.
    - `LET` 
      - `let` имеет блочную область видимости.
    - `CONST`
      - `const` имеет блочную область видимости.
  - Understand nested scopes and able to work with them
    - Функция в функции, когда внутренняя функция обращается к переменным внешней функции.

### Functions Parameters / Arguments

  - Know how to define Function parameters
    ```javascript
    function hello(param1, param2) {}
    ```
  - Know difference between parameters passing by value and by reference
    - Все аргументы JavaScript передаются по значению. Для примитивов копируется примитивное значение.
    - Для объектов и массивов копируется значение ссылки: изменение объекта видно вызывающему коду, а переназначение параметра другому объекту не меняет переменную вызывающего кода (передача с совместным доступом, не по ссылке).
  - Know how to handle dynamic amount of Function parameters
    - Доступ к ним осуществляется через «псевдо-массив» `arguments`.
    - Он содержит список аргументов по номерам: `arguments[0]`, `arguments[1]`…, а также свойство `length`.
    - `arguments` – это не массив; у стрелочных функций нет собственного arguments. Для переменного числа аргументов обычно используют rest-параметр ...args — настоящий массив.
   
### Closures Advanced

  - Context (lexical environment)
    - Лексическое окружение — модель хранения привязок имён и ссылки на внешнее окружение; это не значение this и не обычный JS-объект.
  - Understand function creation context (lexical environment)
    - Когда функция вызывается, у неё создаётся своё окружение со скоупом (ссылкой на внешнее окружение).
    - Если она вызывается несколько раз, то это разные лексические окружения.
  - Be able to explain difference between scope and context
    - **Область видимости** (scope) определяет, где доступны имена переменных; поиск идёт по цепочке лексических окружений.
    - **Контекст** описывает окружение, в котором выполняется код (любой код имеет контекст выполнения). В пределах одного агента в каждый момент выполняется один контекст; воркеры могут работать параллельно.
    - Несколько популярных видов контекста:
      - Global контекст
      - Function контекст и т.п.
  - Inner/outer lexical environment ([link](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Closures))
    - При вызове функции создаётся локальное окружение, связанное с окружением, в котором функция была определена. В цепочке может быть несколько окружений функций, блоков и модулей.
    - Внутреннее лексическое окружение соответствует текущему выполнению функции.
    - Внешнее окружение не обязательно глобальное: это может быть окружение другой функции, блока или модуля.
    - У внутреннего лексического окружения есть ссылка на внешнее (outer).
    - Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во внешнем, затем в следующем и так далее, до глобального.
  - Understand connection between function and lexical environment
    - В процессе выполнения функции значения переменных могут меняться, что сразу же отражается в лексическом окружении. После выполнения функции недостижимые данные могут быть собраны сборщиком мусора; немедленное освобождение не гарантируется. Доступное замыкание сохраняет доступ к захваченным переменным, даже если его передали обработчику или сохранили без return.
   
### ECMAScript Intermediate
  
  - Function default parameters
    - ```javascript
      function hello(param1 = 10, param2 = 'Tim') {}
      ```
  - Know how to use spread operator for Function arguments
    - Синтаксис `spread` — это конструкция в JavaScript, которая распаковывает итерируемый объект в аргументы вызова или элементы массива; отдельная форма {...obj} копирует собственные перечисляемые свойства объекта. Обычный объект не обязательно итерируемый.
    - ```javascript
      function spredInFunc(...args) {
        console.log(...args);
      }
      ```
  - Be able to compare `arguments` and `rest parameters`
    - Остаточные параметры (`rest parameters`) могут быть обозначены через три точки .... Буквально это значит: «собери оставшиеся параметры и положи их в массив».
    - ```javascript
      function restInFunc(...args) {
        console.log(args);
      }
      restInFunc(1, 2, 3, 4, 5); /// [1, 2, 3, 4, 5]
      ```
  - Spread operator for Array
    - Можно поверхностно скопировать массив **`const newArr = [...oldArr]`**; вложенные объекты остаются общими.
  - Understand and able to use spread operator for Array concatenation
    - ```javascript
      const a = [1, 2];
      const b = [3, 4];
      const c = [...a, ...b]; // [1, 2, 3, 4]
      ```
  - Destructuring assignment
    - ```javascript
        let [firstName, lastName] = ["Илья", "Кантор"];
        console.log(firstName); // Илья
        console.log(lastName); // Кантор
      ```
    - [link](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring)
  - Be able to discover destructuring assignment concept
    - ```javascript
      let a, b;
      [a, b] = [10, 20];
      console.log(a); // 10
      console.log(b); // 20
      ```
  - Know how `for..of` loop works
    - `for...of` перебирает значения любого итерируемого объекта, например массива, строки, Map или Set; обычный объект без Symbol.iterator не подходит.

  **Spread распаковывает итерируемые значения в вызовах и массивах либо свойства в объектных литералах. Rest собирает оставшиеся аргументы в массив; в деструктуризации массивов/объектов собирает оставшиеся элементы/свойства. Это синтаксис, а не отдельные операторы.**

### Modules in JavaScript*

  - What is module / module pattern? For what purposes they were created?
    - Модуль — это переиспользуемая часть кода, содержащая в себе детали реализации и предоставляющая открытое API, что позволяет

 изолировать и скрыть детали реализации от внешнего окружения.
  - `CommonJS`
    - Для импорта `const foo = require('foo');`
    - Для экспорта `module.exports = { myFunc, myVar };`
  - `ES6`
    - Для именованного экспорта ниже: `import { myFunc } from './myFunc.js';`. Импорт без фигурных скобок требует export default.
    - Для экспорта `export { myFunc, myVar };`
  - Know how to import / export module members
    - ```javascript
      // app.js
      import { myFunc } from './myFunc.js';
      ```
    - ```javascript
      // myFunc.js (отдельный файл)
      export const myFunc = () => { console.log('Hello'); };
      ```
      
### (Prototypal Inheritance Basics) Прототипное наследование в JavaScript

Прототипное наследование — это механизм, с помощью которого объекты могут наследовать свойства и методы друг от друга. Рассмотрим основные аспекты прототипного наследования.

#### Свойство `__proto__`
  - **Что это такое?** `__proto__` — устаревший аксессор Object.prototype для внутреннего [[Prototype]], а не само внутреннее свойство. Он может отсутствовать или быть перекрыт; предпочтительны Object.getPrototypeOf, Object.setPrototypeOf и Object.create.

  - **Как работает?** Когда вы пытаетесь получить доступ к свойству объекта, и это свойство не найдено у самого объекта, JavaScript ищет его в прототипе, указанном в `__proto__`.

#### Понимание свойства объекта `__proto__`
  - **Пример:**
    ```javascript
    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true
    };

    rabbit.__proto__ = animal;

    console.log(rabbit.eats); // true
    ```

  - **Объяснение:** Здесь объект `rabbit` наследует свойство `eats` от объекта `animal`, так как `rabbit.__proto__` указывает на `animal`.

#### Использование [Object.create] и явное определение `__proto__`
  - **Object.create:** Этот метод используется для создания нового объекта с указанным прототипом.
  - **Пример:**
    ```javascript
    let animal = {
      eats: true
    };

    let rabbit = Object.create(animal);

    console.log(rabbit.eats); // true
    ```

  - **Явное определение `__proto__`:**
    ```javascript
    let animal = {
      eats: true
    };

    let rabbit = {};
    rabbit.__proto__ = animal;

    console.log(rabbit.eats); // true
    ```

#### Свойство `prototype`
  - **Что это такое?** Свойство `prototype` у функций-конструкторов используется для реализации наследования. При обычном вызове new, если prototype — объект, он становится прототипом создаваемого экземпляра; явный возврат другого объекта из конструктора может изменить результат.

  - **Пример:**
    ```javascript
    function Animal() {}

    Animal.prototype.eats = true;

    let rabbit = new Animal();

    console.log(rabbit.eats); // true
    ```

#### Понимание зависимости между свойством конструктора функции `prototype` и свойством экземпляра `__proto__`
  - **Пример:**
    ```javascript
    function Animal() {}

    Animal.prototype.eats = true;

    let rabbit = new Animal();

    console.log(rabbit.__proto__ === Animal.prototype); // true
    ```

  - **Объяснение:** В этом примере Object.getPrototypeOf(rabbit) === Animal.prototype. Это отношение внутреннего [[Prototype]] экземпляра к свойству prototype конструктора; оно не требует доступа через __proto__.

#### Создание методов 'class' с использованием свойства `prototype` функции
  - **Пример:**
    ```javascript
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.speak = function() {
      console.log(`${this.name} говорит.`);
    };

    let rabbit = new Animal('Кролик');
    rabbit.speak(); // Кролик говорит.
    ```

#### Установка и получение прототипа объекта `(optional)`
  - **Object.setPrototypeOf:** Устанавливает прототип объекта.
    
  - **Пример:**
    ```javascript
    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true
    };

    Object.setPrototypeOf(rabbit, animal);

    console.log(rabbit.eats); // true
    ```

  - **Object.getPrototypeOf:** Возвращает прототип объекта.
    
  - **Пример:**
    ```javascript
    let animal = {
      eats: true
    };

    let rabbit = Object.create(animal);

    console.log(Object.getPrototypeOf(rabbit) === animal); // true
    ```

### ECMAScript Advanced Data Types & Expressions

#### Set/Map Data Types

##### **MAP**

- **Описание:** Map — это коллекция ключ/значение, похожая на Object, но с возможностью использовать ключи любого типа.
  
- **Методы:**
  - `new Map()`: создаёт пустую коллекцию.
    ```javascript
    let map = new Map();
    ```
  - `map.set(key, value)`: добавляет пару ключ/значение.
    ```javascript
    map.set('name', 'John');
    ```
  - `map.get(key)`: возвращает значение по ключу или `undefined`, если ключ отсутствует.
    ```javascript
    console.log(map.get('name')); // 'John'
    ```
  - `map.has(key)`: возвращает `true`, если ключ присутствует в коллекции, иначе `false`.
    ```javascript
    console.log(map.has('name')); // true
    ```
  - `map.delete(key)`: удаляет элемент по ключу.
    ```javascript
    map.delete('name');
    ```
  - `map.clear()`: очищает коллекцию от всех элементов.
    ```javascript
    map.clear();
    ```
  - `map.size`: возвращает текущее количество элементов.
    ```javascript
    console.log(map.size); // 0
    ```

##### **SET**

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

#### WeakSet/WeakMap Data Types

##### **WeakMap**

- **Описание:** WeakMap хранит пары с ключами-объектами или незарегистрированными символами (не Symbol.for) и не удерживает ключи от сборки мусора. Момент сборки не гарантирован; перечисления ключей нет.
  
- **Примеры использования:**
  ```javascript
  let weakMap = new WeakMap();
  let obj = {};

  weakMap.set(obj, 'value');
  console.log(weakMap.get(obj)); // 'value'

  obj = null; // теперь объект может быть удален сборщиком мусора
  ```

##### **WeakSet**

- **Описание:** WeakSet хранит объекты и незарегистрированные символы слабо: наличие в коллекции не препятствует сборке мусора. Коллекция не перечисляется и не имеет size.

- **Примеры использования:**
  ```javascript
  let weakSet = new WeakSet();
  let obj = {};

  weakSet.add(obj);
  console.log(weakSet.has(obj)); // true

  obj = null; // теперь объект может быть удален сборщиком мусора
  ```

### JavaScript Errors

#### JavaScript Errors (throw, Error class)

- **throw:** Инструкция `throw` генерирует исключение.
  ```javascript
  throw new Error('Что-то пошло не так');
  ```

- **Error class:** Конструктор `Error` создаёт объект ошибки.
  ```javascript
  let error = new Error('Ошибка');
  console.log(error.message); // 'Ошибка'
  ```

#### try..catch statement

- **try..catch:** Блок `catch` перехватывает исключения, возникшие при выполнении try. Ошибки будущих колбэков таймеров он не перехватит; отклонение промиса нужно await внутри try или обработать через catch().
  ```javascript
  try {
    // код, который может вызвать ошибку
  } catch (e) {
    console.log(e.message);
  }
  ```

#### Error handling

- **Обработка ошибок:**
  - `try..catch`
  - `throw`

#### Error class

- **Конструктор Error:** Создаёт объект ошибки.
  ```javascript
  let error = new Error('Ошибка');
  console.log(error.message); // 'Ошибка'
  ```

#### Error logging

- **Логирование ошибок:**
  - `console.log()`
  - `console.info()`
  - `console.error()`
  - `console.warn()`

#### Async error events

- **Обработка ошибок в асинхронном коде:** Использование `try..catch` с `async/await`.
  ```javascript
  async function fetchData() {
    try {
      let response = await fetch('/api/data');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      let data = await response.json();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  ```

### ECMAScript Advanced

#### Promises

- **Описание:** Promise — объект для написания и обработки асинхронного кода.
  ```javascript
  let promise = new Promise(function(resolve, reject) {
    // executor вызывается синхронно; resolve/reject завершают промис
    resolve(42);
  });
  ```

#### Promise states

- **Состояния Promise:**
  - `pending` — начальное состояние: промис ещё не fulfilled и не rejected
  - `fulfilled` — операция завершилась успешно
  - `rejected` — произошла ошибка

#### Promise chaining

- **Цепочки промисов:**
  ```javascript
  promise
    .then(result => {
      // обработка результата
    })
    .catch(error => {
      // обработка ошибки
    });
  ```

#### Promise static methods

- **Статические методы:** Promise.resolve(), Promise.reject(), Promise.all(), Promise.allSettled(), Promise.race(), Promise.any(), Promise.withResolvers().
- then(), catch() и finally() — методы экземпляра промиса, а не статические.

#### Handle errors in promises

- **Обработка ошибок в промисах:**
  ```javascript
  promise
    .then(result => {
      // обработка результата
    })
    .catch(error => {
      // обработка ошибки
    });
  ```

#### async/await

- **Описание:** `async` и `await` используются для работы с промисами в синхронном стиле.
  ```javascript
  async function example() {
    let result = await someAsyncFunction();
    console.log(result);
  }
  ```

#### Event loop

- **Описание:** Event Loop — механизм, который позволяет JavaScript выполнять асинхронный код. Ниже будет приведен более подробный разбор:

1. **Стек вызовов** хранит активные вызовы. Последний вызов завершается первым (LIFO); текущая задача выполняется до завершения.
2. **Web APIs** выполняют операции платформы, например таймеры и сеть. Обычный вызов async-функции начинается синхронно и приостанавливается на await; функция не «передаётся в Web API» целиком.
3. **Задачи (tasks, часто «макрозадачи»)** включают колбэки таймеров и асинхронную обработку событий. У браузера может быть несколько очередей задач. fetch запускает сетевую операцию, но его then/catch — микрозадачи.
4. **Микрозадачи** — реакции промисов then/catch/finally, колбэки MutationObserver и queueMicrotask. Executor new Promise выполняется синхронно. На контрольной точке очередь микрозадач опустошается, включая добавленные при её обработке микрозадачи.
5. **Event loop** выбирает готовую задачу, после её выполнения обрабатывает микрозадачи, а при возможности обновляет отображение. Перерисовка не гарантирована после каждой задачи. Таймер задаёт минимальную задержку, а не точное время вызова.

Источник: [MDN: микрозадачи](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

### JavaScript in Browser:

#### Global object window

- **Описание:** В контексте страницы глобальный объект представлен Window (window); в веб-воркерах window отсутствует. globalThis даёт общий способ доступа к глобальному this.

#### Location

- `window.location` — объект Location с текущим URL; присваивание location.href или вызов assign() запускает навигацию. replace() заменяет текущую запись истории.

#### Know browser location structure

```javascript
console.log(location.href, location.origin, location.protocol);
console.log(location.hostname, location.port, location.pathname);
console.log(location.search, location.hash);
```

#### History API (Global object window)

- **API истории:**
  ```javascript
  window.history.back();
  window.history.forward();
  window.history.go(-1);
  ```

#### Navigator

- **Интерфейс Navigator:** Используется для получения информации о браузере и платформе.
  ```javascript
  console.log(navigator.userAgent);
  ```

#### Cookies

- **Работа с куки:**
  ```javascript
  document.cookie = "username=John Doe";
  let cookies = document.cookie;
  console.log(cookies);
  ```

### Page Lifecycle

#### Parsing

- **Этапы парсинга:**
  - Парсинг HTML и создание токенов
  - Преобразование токенов в ноды
  - Создание дерева DOM
  - Парсинг CSS и создание CSSOM
  - Построение дерева отображения на основе DOM и CSSOM — следующий этап после разбора, а не HTML-парсинг

#### Reflow

- **Этап Reflow:**
  - Определение координат и размеров элементов

#### Repaint

- **Этап Repaint:**
  - Рисование видимых частей элементов по рассчитанным стилям и геометрии; затем слои могут быть скомпонованы

#### Critical rendering path (CRP) `(optional)`

- **Описание CRP:**
  - Путь, который проходит браузер до того, как страница отрисовывается.

### Network requests

#### Fetch (with usage)

- **Использование Fetch:**
  ```javascript
  fetch('/api/data')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
  ```

### Web Storage API & cookies

#### Cookies

- **Описание Cookies:**
  ```javascript
  document.cookie = "username=John Doe";
  let cookies = document.cookie;
  console.log(cookies);
  ```

#### Difference between localStorage, sessionStorage and cookies

- **Различия:**
  - **localStorage:** Хранилище строк по origin без встроенного срока истечения; данные могут быть удалены пользователем или браузером.
  - **sessionStorage:** Изолировано по origin и вкладке (контексту верхнего уровня); переживает перезагрузку и обычно очищается при закрытии вкладки.
  - **cookies:** Бывают сеансовыми и постоянными (Expires/Max-Age). Отправляются только с подходящими запросами с учётом домена, пути, Secure, SameSite и credentials; HttpOnly недоступны через document.cookie. Web Storage автоматически с запросами не отправляется.
 
### TypeScript (TS):

Примеры ниже — отдельные фрагменты: повторяющиеся объявления IUser и Season не следует объединять в один файл без переименования. readonly проверяется компилятором и не замораживает объект во время выполнения.

- #### Ability to write concise TypeScript code using its constructs
  - basic types
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

  - enums
    - Для определения перечисления применяется ключевое слово enum.
    - ```typescript
      enum Season { Winter=5, Spring, Summer, Autumn }; // 5, 6, 7, 8
      ```
    - ```typescript
      enum Season { Winter=4, Spring=8, Summer=16, Autumn=32 };  // 4, 8, 16, 32
      ```
    - ```typescript
      enum Season { Winter, Spring, Summer, Autumn };
      ```

  - `type` / `interface`, differences between them
    - `type` задаёт псевдоним любого типа, включая примитивы, объединения и объекты. interface описывает форму объекта, поддерживает extends и слияние деклараций; type не переоткрывается для слияния.
      ```typescript
      type UserName = string;
      ```
    - `interface`
      - Интерфейс определяет свойства и методы, которые объект должен реализовать. Другими словами, интерфейс - это определение кастомного типа данных, но без реализации.
        ```typescript
        interface IUser {
          id: number;
          name: string;
        }
        ```
  - using interfaces with optional properties, read-only properties, etc...
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

  - function types
    - Функциональный тип обозначается с помощью пары круглых скобок (), после которых располагается стрелка, а после неё обязательно указывается тип возвращаемого значения () => type. При наличии у функционального выражения параметров, их декларация заключается между круглых скобок.
      ```typescript
      let greet: (name: string) => string = (name) => `Hello, ${name}`;
      ```

  - utility types `(optional)`
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

  - typeguards `(optional)`
    - Типовые охранники (type guards) позволяют выполнять проверки типов во время выполнения, и сужают статический тип по результатам проверки. Пользовательский предикат должен сам корректно проверять данные; компилятор не доказывает его истинность.
      ```typescript
      function isString(value: unknown): value is string {
        return typeof value === 'string';
      }
      ```

  - creating custom types
    - type - кастомные типы
      ```typescript
      type UserName = string;
      type User = {
        id: number;
        name: UserName;
      };
      ```

  - generic types (concept)
    - Обобщения объявляются при помощи пары угловых скобок, в которые через запятую, заключены параметры типа, называемые также типо-заполнителями или универсальными параметрами.
      ```typescript
      function identity<T>(value: T): T {
        return value;
      }

      let number = identity<number>(42);
      let word = identity<string>("Hello");
      ```

  - understanding TS (ES6) module system
    - TypeScript поддерживает синтаксис ES-модулей и разные среды выполнения. Разрешение путей и формат вывода зависят от module/moduleResolution и среды; ниже пример для среды со сборщиком.
      ```typescript
      // math.ts
      export const add = (a: number, b: number) => a + b;

      // app.ts
      import { add } from './math';

      console.log(add(2, 3));
      ```

### Design patterns:

- Creational Design Patterns
  - Шаблоны проектирования, которые имеют дело с процессом создания объектов. Они позволяют сделать систему независимой от способа создания, композиции и представления объектов. Шаблон, порождающий классы, использует наследование, чтобы изменять наследуемый класс, а шаблон, порождающий объекты, делегирует инстанцирование другому объекту.
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

- Structural Design Patterns
  - Структурные шаблоны описывают композицию классов и объектов в более крупные структуры; наследование — лишь один из возможных инструментов.
    - Adapter: Позволяет объектам с несовместимыми интерфейсами работать вместе.
      ```typescript
      interface EuropeanPlug {
        connect(): void;
      }

      class EuropeanPlugImpl implements EuropeanPlug {
        connect() {
          console.log('Connected with European plug');
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

- Behavioral Design Patterns
  - Поведенческие шаблоны проектирования решают задачи эффективного и безопасного взаимодействия между объектами программы.
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
          this.observers = this.observers.filter(obs => obs !== observer);
        }

        notifyObservers(message: string) {
          this.observers.forEach(observer => observer.update(message));
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

### Coding tasks:

Ниже учебные реализации с явно ограниченной областью применимости, а не полные полифилы встроенных методов. Они не изменяют встроенные прототипы.

- `Function.prototype.bind`: привязать this и начальные аргументы для обычного вызова.
  ```javascript
  function myBind(func, context, ...args) {
    if (typeof func !== 'function') throw new TypeError('Expected function');
    return (...rest) => Reflect.apply(func, context, [...args, ...rest]);
  }
  console.log(myBind(function (x) { return this.n + x; }, { n: 2 }, 3)()); // 5
  ```
  Встроенный bind также поддерживает new для конструируемой функции, корректирует name/length и имеет особую семантику instanceof. Эта версия поддерживает только обычный вызов.
  [MDN: bind](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

- `Object.create`: создать объект с указанным прототипом. Для null нельзя использовать трюк с конструктором — он даст Object.prototype. Встроенный метод также принимает дескрипторы свойств.
  ```javascript
  const animal = { eats: true };
  const rabbit = Object.create(animal, {
    jumps: { value: true, writable: true, enumerable: true, configurable: true }
  });
  console.log(Object.getPrototypeOf(rabbit) === animal); // true
  ```
  [MDN: Object.create](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

- `Array.prototype.flat`: версия для обычных массивов с глубиной по умолчанию 1 и пропуском пустых слотов.
  ```javascript
  function myFlat(array, depth = 1) {
    if (!Array.isArray(array)) throw new TypeError('Expected array');
    const numericDepth = +depth;
    const level = Number.isNaN(numericDepth) ? 0 : Math.max(0, Math.trunc(numericDepth));
    const result = [];
    function flatten(input, remaining) {
      const length = input.length;
      for (let i = 0; i < length; i++) {
        if (!(i in input)) continue;
        const value = input[i];
        if (Array.isArray(value) && remaining > 0) flatten(value, remaining - 1);
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
    if (!Array.isArray(array)) throw new TypeError('Expected array');
    if (typeof callback !== 'function') throw new TypeError('Expected function');
    const length = array.length;
    let index = 0;
    let accumulator;
    if (initial.length) accumulator = initial[0];
    else {
      while (index < length && !(index in array)) index++;
      if (index === length) throw new TypeError('Empty array without initial value');
      accumulator = array[index++];
    }
    for (; index < length; index++) {
      if (index in array) accumulator = callback(accumulator, array[index], index, array);
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
    if (!Number.isInteger(count) || count < 0) throw new RangeError('Invalid count');
    return Array(count).fill(text).join(' ');
  }
  console.log(repeating('hello world', 3)); // hello world hello world hello world
  ```
  Метод repeating не встроен в String; repeat повторяет строку без автоматического разделителя.

- `myFunc('!', 4, -10, 34, 0)` → '4!-10!34!0':
  ```javascript
  function myFunc(separator, ...values) {
    return values.join(separator);
  }
  console.log(myFunc('!', 4, -10, 34, 0)); // 4!-10!34!0
  ```

- `five(plus(seven(minus(three()))))` → 9:
  ```javascript
  function calc(num, operation) { return operation === undefined ? num : operation(num); }
  function three(operation) { return calc(3, operation); }
  function five(operation) { return calc(5, operation); }
  function seven(operation) { return calc(7, operation); }
  function plus(right) { return left => left + right; }
  function minus(right) { return left => left - right; }
  console.log(five(plus(seven(minus(three()))))); // 9
  ```

- `add(5)(9)(-4)(1)`: цепочка возвращает функцию; получить число можно явным приведением.
  ```javascript
  function add(total) {
    function next(value) { total += value; return next; }
    next[Symbol.toPrimitive] = hint => hint === 'string' ? String(total) : total;
    return next;
  }
  console.log(+add(5)(9)(-4)(1)); // 11
  ```

- `periodOutput(period)` выводит фактически прошедшее время примерно каждые period мс. Задержка таймера не гарантирует точный интервал.
  ```javascript
  function periodOutput(period) {
    if (!Number.isFinite(period) || period <= 0) throw new RangeError('Invalid period');
    const start = performance.now();
    const timer = setInterval(() => console.log(Math.round(performance.now() - start)), period);
    return () => clearInterval(timer);
  }
  // const stop = periodOutput(100);
  // stop(); // остановка
  ```

- `extendedPeriodOutput(period)` увеличивает задержку: period, 2 × period, 3 × period. При period = 100 номинальное суммарное время — 100, 300, 600 мс, а не 100, 200, 300 мс.
  ```javascript
  function extendedPeriodOutput(period) {
    if (!Number.isFinite(period) || period <= 0) throw new RangeError('Invalid period');
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
    return () => { stopped = true; clearTimeout(timer); };
  }
  ```
  [MDN: setTimeout](https://developer.mozilla.org/ru/docs/Web/API/Window/setTimeout).

### Источники проверки

- [MDN: Object и статические методы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object), [дескрипторы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [прототипы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).
- [MDN: функции и аргументы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions), [замыкания](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Closures), [spread](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [итераторы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_generators), [модули](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules).
- [MDN: коллекции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections), [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [обработка ошибок](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Control_flow_and_error_handling).
- [MDN: Location](https://developer.mozilla.org/ru/docs/Web/API/Location), [History](https://developer.mozilla.org/ru/docs/Web/API/History), [Navigator](https://developer.mozilla.org/ru/docs/Web/API/Navigator), [Fetch](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch).
- [MDN: критический путь отрисовки](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path), [localStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage), [sessionStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/sessionStorage), [cookie](https://developer.mozilla.org/ru/docs/Web/HTTP/Guides/Cookies).
- [Дока: статическая типизация](https://doka.guide/tools/static-types/). Для деталей TypeScript: [официальный Handbook — типы](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [enums](https://www.typescriptlang.org/docs/handbook/enums.html), [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html), [сужение типов](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [модули](https://www.typescriptlang.org/docs/handbook/modules/theory.html).
- [Дока: Observer и реактивность](https://doka.guide/tools/reactivity/). Singleton и Adapter выше — учебные примеры организации объектов, а не требования стандарта JavaScript.
