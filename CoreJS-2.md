# JavaScript:

### Objects Built-in methods.

  - Know static Object methods
    - `Object.create()` используется для создания новых объектов и их привязки к прототипу существующего объекта.
    - `Object.keys()` создает массив, содержащий ключи объекта.
    - `Object.values()` создает массив, содержащий значения объекта.
    - `Object.entries()` создает вложенный массив пар ключ-значение для объекта.
    - `Object.assign()` используется для копирования значений одного объекта в другой объект.
    - `Object.freeze()` предотвращает изменение свойств и значений объекта, а также добавление или удаление свойств объекта.
    - `Object.seal()` предотвращает добавление новых свойств к объекту, но допускает изменение существующих свойств.
    - `Object.getPrototypeOf()` используется для получения внутреннего скрытого свойства [[Prototype]] объекта, которое также доступно через свойство `__proto__`.
  - Property flags & descriptors (student is able to set property via `Object.defineProperty`)
    - Помимо значения, свойства объекта имеют три специальных атрибута (так называемые «флаги», которые по умолчанию всегда true).
      - **writable** – если true, свойство можно изменить, иначе оно только для чтения.
      - **enumerable** – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
      - **configurable** – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
    - Метод **`Object.getOwnPropertyDescriptor`** позволяет получить полную информацию о свойстве. (obj - объект, из которого мы получаем информацию. propertyName - имя свойства.)
    - Чтобы изменить флаги, мы можем использовать метод `Object.defineProperty`.
      - `Object.defineProperty(obj, propertyName, descriptor)`
      - `obj, propertyName` - объект и его свойство, для которого нужно применить дескриптор.
      - `descriptor` - применяемый дескриптор.
    - Как задать свойства?
      - ```javascript
          Object.defineProperty(user, "name", {
              writable: false
          });
          ```
      - `writable` можно заменить на любое другое.
  - Know how to create iterable objects, Symbol.iterator usage `(optional)` TODO

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
    - Using a `for...in` loop
    - `Object.keys` method
    - `Object.values` method
    - `Object.entries` method
      
### Functional Scope

  - Know global scope and functional scope
    - Если переменная объявлена вне всех функций или фигурных скобок ({}), то считается, что она определена в глобальной области видимости.
    - Переменные, которые используются только в определенной части кода, считаются помещенными в локальную область видимости. Такие переменные называются локальными.
  - Know variables visibility areas
    - `VAR`
       - Объявления могут обладать функциональную область видимости.
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
    - Строки, числа, логические значения передаются в функцию по значению. Иными словами, при передаче значения в функцию, эта функция получает копию данного значения.
    - Объекты и массивы передаются по ссылке. То есть функция получает сам объект или массив, а не их копию. Если что-то меняем в функции, то меняем в самом объекте.
  - Know how to handle dynamic amount of Function parameters
    - Доступ к ним осуществляется через «псевдо-массив» `arguments`.
    - Он содержит список аргументов по номерам: `arguments[0]`, `arguments[1]`…, а также свойство `length`.
    - `arguments` – это не массив.
   
### Closures Advanced

  - Context (lexical environment)
    - Словарь, который содержит в себе все переменные и ссылку на другое лексическое окружение (внешнее).
  - Understand function creation context (lexical environment)
    - Когда функция вызывается, у неё создаётся своё окружение со скоупом (ссылкой на внешнее окружение).
    - Если она вызывается несколько раз, то это разные лексические окружения.
  - Be able to explain difference between scope and context
    - **Область видимости** (scope) - ссылка на другое лексическое окружение (родительское).
    - **Контекст** описывает окружение, в котором выполняется код (любой код имеет контекст выполнения). В каждый момент времени только один контекст выполнения выполняет код.
    - Несколько популярных видов контекста:
      - Global контекст
      - Function контекст и т.п.
  - Inner/outer lexical environment ([link](https://learn.javascript.ru/closure#leksicheskoe-okruzhenie))
    - В процессе вызова функции у нас есть два лексических окружения: внутреннее (для вызываемой функции) и внешнее (глобальное).
    - Внутреннее лексическое окружение соответствует текущему выполнению функции.
    - Внешнее лексическое окружение – это глобальное лексическое окружение. В нём находятся внешние переменные.
    - У внутреннего лексического окружения есть ссылка на внешнее (outer).
    - Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во внешнем, затем в следующем и так далее, до глобального.
  - Understand connection between function and lexical environment
    - В процессе выполнения функции значения переменных могут меняться, что сразу же отражается в лексическом окружении. После выполнения функции её лексическое окружение уничтожается, а занятая им память освобождается. Из этого поведения есть исключение — возврат функции.
   
### ECMAScript Intermediate
  
  - Function default parameters
    - ```javascript
      function hello(param1 = 10, param2 = 'Tim') {}
      ```
  - Know how to use spread operator for Function arguments
    - Оператор `spread` — это конструкция в JavaScript, которая позволяет передавать элементы массива или свойства объекта в виде отдельных аргументов.
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
    - Можно скопировать массив **`const newArr = [...oldArr]`**
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
    - [link](https://learn.javascript.ru/destructuring)
  - Be able to discover destructuring assignment concept
    - ```javascript
      let a, b;
      [a, b] = [10, 20];
      console.log(a); // 10
      console.log(b); // 20
      ```
  - Know how `for..of` loop works
    - Перебор элементов в массиве/строке.

  **Операторы легко отличить. Когда синтаксис ... используется для «распаковки» элементов массива или объекта в отдельные аргументы — это spread. А если три точки используются для сбора оставшихся аргументов в массив или объект — это оператор rest.**

### Modules in JavaScript*

  - What is module / module pattern? For what purposes they were created?
    - Модуль — это переиспользуемая часть кода, содержащая в себе детали реализации и предоставляющая открытое API, что позволяет

 изолировать и скрыть детали реализации от внешнего окружения.
  - `CommonJS`
    - Для импорта `const foo = require('foo');`
    - Для экспорта `module.exports = { myFunc, myVar };`
  - `ES6`
    - Для импорта `import myFunc from './myFunc.js';`
    - Для экспорта `export { myFunc, myVar };`
  - Know how to import / export module members
    - ```javascript
      import { myFunc } from './myFunc.js';
      export const myFunc = () => { console.log('Hello'); };
      ```
      
### (Prototypal Inheritance Basics) Прототипное наследование в JavaScript

Прототипное наследование — это механизм, с помощью которого объекты могут наследовать свойства и методы друг от друга. Рассмотрим основные аспекты прототипного наследования.

#### Свойство `__proto__`
  - **Что это такое?** `__proto__` — это внутреннее свойство объекта, которое указывает на его прототип (другой объект, от которого он наследует свойства и методы).

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
  - **Что это такое?** Свойство `prototype` у функций-конструкторов используется для реализации наследования. Это свойство указывает на объект, который будет прототипом для всех объектов, созданных этой функцией.

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

  - **Объяснение:** У каждого экземпляра, созданного с помощью конструктора `Animal`, свойство `__proto__` указывает на `Animal.prototype`.

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

- **Описание:** WeakMap — это коллекция, где ключами могут быть только объекты, и автоматически удаляющая их при недоступности.
  
- **Примеры использования:**
  ```javascript
  let weakMap = new WeakMap();
  let obj = {};

  weakMap.set(obj, 'value');
  console.log(weakMap.get(obj)); // 'value'

  obj = null; // теперь объект может быть удален сборщиком мусора
  ```

##### **WeakSet**

- **Описание:** WeakSet — это коллекция, которая хранит только объекты и удаляет их, когда они становятся недостижимыми.

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

- **try..catch:** Блок `try` выполняет код, и если возникает ошибка, она перехватывается блоком `catch`.
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
      let response = await fetch('url');
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
    // асинхронный код
  });
  ```

#### Promise states

- **Состояния Promise:**
  - `pending` — операция началась
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

- **Методы:**
  - `then()`
  - `catch()`
  - `finally()`

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

1. **Call Stack (Стек вызовов)**:
   - Это структура данных, которая отслеживает, где мы находимся в исполнении кода.
   - Каждая функция, вызванная в JavaScript, помещается в вершину стека, и исполняется в порядке добавления.
   - Когда функция завершает свою работу, она удаляется из стека.

2. **Web APIs (Веб-API)**:
   - Это набор браузерных API, таких как `setTimeout`, `fetch`, `XMLHttpRequest`, которые предоставляются браузером для выполнения асинхронных операций.
   - Когда вызывается асинхронная функция, она передается в Web API для выполнения.
      - **Макрозадачи (Macro Tasks)**:
        - Это задачи, которые добавляются в очередь обратных вызовов (Callback Queue) и выполняются после того, как стек вызовов станет пустым.
        - К макрозадачам относятся:
          - Обработка событий DOM (например, клики, загрузка ресурсов)
          - Выполнение кода через `setTimeout`, `setInterval`
          - Сетевые запросы (`fetch`, `XMLHttpRequest`)
          - **мАкро - тАймаут**

      - **Микрозадачи (Micro Tasks)**:
        - Это задачи, которые выполняются после завершения текущей макрозадачи и до того, как браузер перерисует экран.
        - Микрозадачи позволяют выполнить небольшой кусочек кода до того, как браузер начнет выполнение следующей макрозадачи.
        - К микрозадачам относятся:
          - Выполнение промисов (`then`, `catch`, `finally`)
          - Обработка MutationObserver
          - `queueMicrotask` (добавление задачи в очередь микрозадач)
          - **мИкро - промИс**

3. **Callback Queue (Очередь обратных вызовов)**:
   - Здесь хранятся асинхронные функции и обратные вызовы, которые должны быть выполнены после завершения асинхронных операций.
   - Когда Web API завершает выполнение асинхронной операции, связанный с ней обратный вызов помещается в очередь.

4. **Event Loop (Цикл событий)**:
   - Это механизм, который следит за стеком вызовов и очередью обратных вызовов.
   - Когда стек вызовов становится пустым, Event Loop проверяет, есть ли что-то в очереди обратных вызовов.
   - Если в очереди есть обратный вызов, он перемещается в стек вызовов и выполняется.

### JavaScript in Browser:

#### Global object window

- **Описание:** В браузере глобальный объект называется `window`.

#### Location

- **Глобальный объект window в браузере и Node.js:**
  - В браузере: `window`
  - В Node.js: `global`
  - Везде: `globalThis`

#### Know browser location structure

- **Структура location:**
  ```javascript
  console.log(window.location);
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
  - Объединение CSSOM и DOM в Render Tree

#### Reflow

- **Этап Reflow:**
  - Определение координат и размеров элементов

#### Repaint

- **Этап Repaint:**
  - Определение, как будут отрисованы элементы на странице

#### Critical rendering path (CRP) `(optional)`

- **Описание CRP:**
  - Путь, который проходит браузер до того, как страница отрисовывается.

### Network requests

#### Fetch (with usage)

- **Использование Fetch:**
  ```javascript
  fetch('url')
    .then(response => response.json())
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
  - **localStorage:** Хранит данные без срока действия.
  - **sessionStorage:** Хранит данные в течение сессии браузера.
  - **cookies:** Хранит данные с указанием срока действия, передаются на сервер с каждым запросом.
 
Я отвечу как всемирно извест

I'll answer as a world-famous expert in TypeScript and design patterns.

### Typescript (TS):

- #### Ability to write concise TypeScript code using its constructs
  - basic types
    1. `String` 
      ```typescript
      let name: string = "Alice";
      ```
    2. `Number`
      ```typescript
      let age: number = 30;
      ```
    3. `Bigint`
      ```typescript
      let bigNumber: bigint = 1234567890123456789012345678901234567890n;
      ```
    4. `Boolean`
      ```typescript
      let isStudent: boolean = true;
      ```
    5. `Undefined`
      ```typescript
      let notDefined: undefined = undefined;
      ```
    6. `Null`
      ```typescript
      let nothing: null = null;
      ```
    7. `Symbol`
      ```typescript
      let uniqueKey: symbol = Symbol("key");
      ```
    8. `Object`
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
    - `type` - кастомные типы
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
    - Утилитные типы предоставляют встроенные преобразования типов, которые можно использовать для манипулирования типами.
      ```typescript
      type Partial<T> = {
        [P in keyof T]?: T[P];
      };

      interface IUser {
        id: number;
        name: string;
        age: number;
      }

      let partialUser: Partial<IUser> = { id: 1 };
      ```

  - typeguards `(optional)`
    - Типовые охранники (type guards) позволяют выполнять проверки типов во время выполнения, чтобы убедиться, что объект соответствует определенному типу.
      ```typescript
      function isString(value: any): value is string {
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
    - Система модулей TypeScript основана на модулях ES6. Модули помогают организовывать код, разбивая его на файлы и компоненты.
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
  - Структурные шаблоны проектирования отвечают за построение удобных в поддержке иерархий классов.
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
      const observer2 = new Concrete

### Coding tasks:

  - `Function.prototype.bind` implement polyfill
    ```javascript
    Function.prototype.myBind = function (obj, ...args) {
      let func = this;
      return function (...newArgs) {
        func.apply(obj, [...args, ...newArgs]);
      };
    };
    ```
  - `Object.create` implement polyfill
  - `Array.flat` implement polyfill
    ```javascript
    Array.prototype.myFlat = function(){
    const output = []
    function flattenArray(arr){
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])){
                    flattenArray(arr[i]);
                } else{
                    output.push(arr[i]);
                }
            }
            return output;
        }
       return flattenArray(this);
    }
    // const inputArray = [0, 1, 2, [3, 4, [5,6]], 7];
    // console.log(inputArray.myFlat());
    ```
  - `Array.reduce` implement polyfill
    ```javascript
    Array.prototype.myReduce = function(fn, initial) {
        let values = this;
    
        values.forEach(item => {
            initial = initial !== undefined ? fn(initial, item) : item
        })
    
        return initial;
    }
    ```
  - `'hello world'.repeating(3)` -> 'hello world hello world hello world'. How to implement?
    ```javascript
    'hello world'+' '.repeat(3)
    ```
  - `myFunc('!', 4, -10, 34, 0)` -> '4!-10!34!0`. How to implement?
    ```javascript
    function myFunc() {
      let result = '';
      const sym = arguments[0];
      for(let i = 1; i < arguments.length; i++) {
          result += arguments[i] + sym;
        }
        return result.slice(0, result.length -1);
      }
    
    // console.log(myFunc('!', 4, -10, 34, 0));
    ```
  - `five(plus(seven(minus(three()))))` -> 9. How to implement?
    ```javascript
    function calc(num, func) {
      if (func === undefined) {
    		return num;
    	} else {
    		return func(num);
    	}
    }
    
    function three(func) {
    	return calc(3,func);
    }
    function five(func) {
    	return calc(5,func);
    }
    function seven(func) {
    	return calc(7,func);
    }
    
    function plus(right) {
      return function(left) { return left + right; };
    }
    function minus(right) {
      return function(left) {
    		return left - right;
    	};
    }
    
    console.log(five(plus(seven(minus(three())))));
    ```
  - add(5)(9)(-4)(1) -> 11. How to implement?
    ```javascript
    function add(x) {
      function insideFunc(y) {
        x += y;
        return insideFunc;
      }
      insideFunc.toString = function() {
        return x;
      };
      return insideFunc;
    }
    
    console.log( add(1)(2)(3).toString() ); 
    ```
  - `periodOutput(period)` method should output in the console once per every period how mach time has passed since the first function call.
    Example:
    `periodOutput(100) -> 100(after 100 ms), 200(after 100 ms), 300(after 100 ms), ...`
    ```javascript
    function periodOutput(period) {
      let sum = 0;
      setInterval(() => {
          console.log(`${sum += period}(after ${period}ms)`);
        }, period);
    }
    periodOutput(1000);
    ```
  - `extendedPeriodOutput(period)` method should output in the console once per period how mach time has passed since the first function call and then increase the period. Example: `// extendedPeriodOutput(100) -> 100(after 100 ms), 200(after 200 ms), 300(after 300 ms)`
