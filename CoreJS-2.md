# JavaScript:

- #### Objects Built-in methods.

  - Know static Object methods
    - ```Object.create()``` используется для создания новых объектов и их привязки к прототипу существующего объекта.
    - ```Object.keys()``` создает массив, содержащий ключи объекта.
    - ```Object.values()``` создает массив, содержащий значения объекта.
    - ```Object.entries()``` создает вложенный массив пар ключ-значение для объекта.
    - ```Object.assign()``` используется для копирования значений одного объекта в другой объект.
    - ```Object.freeze()``` предотвращает изменение свойств и значений объекта, а также добавление или удаление свойств объекта.
    - ```Object.seal()``` предотвращает добавление новых свойств к объекту, но допускает изменение существующих свойств
    - ```Object.getPrototypeOf()``` используется для получения внутреннего скрытого свойства [[Prototype]] объекта, которое также доступно через свойство __proto__.
  - Property flags & descriptors (student is able to set property via Object. defineProperty)
    - Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги», которые по умолчанию всегда true).
      - **writable** – если true, свойство можно изменить, иначе оно только для чтения.
      - **enumerable** – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
      - **configurable** – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
    - Метод **Object.getOwnPropertyDescriptor** позволяет получить полную информацию о свойстве. (obj - Объект, из которого мы получаем информацию. propertyName - Имя свойства.)
    - Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.
      - Object.defineProperty(obj, propertyName, descriptor)
      - obj, propertyName - Объект и его свойство, для которого нужно применить дескриптор.
      - descriptor - Применяемый дескриптор.
    - Как задать свойства?
      - Object.defineProperty(user, "name", {
          writable: false
        });
      - writable можно заменить на любое другое
  - Know how to create iterable objects, Symbol.iterator usage `(optional)` TODO

- #### ECMAScript Data Types & Expressions

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
    - Using a ```for...in``` loop
    - `Object.keys` method
    - `Object.values `method
    - `Object.entries` method
      
- #### Functional Scope

  - Know global scope and functional scope
    - Если переменная объявлена вне всех функций или фигурных скобок ({}), то считается, что она определена в глобальной области видимости.
    - Переменные, которые используются только в определенной части кода, считаются помещенными в локальную область видимости. Такие переменные называются локальными.
  - Know variables visibility areas
    - `VAR`
       - Объявления могут обладать функциональную область видимости
    - `LET` 
      - let имеет блочную область видимости,
    - `CONST`
      - const имеет блочную область видимости
  - Understand nested scopes and able work with them
    - Функция в функции, когда внутрняя обращается к переменным внешней

- #### Functions Parameters / Arguments

  - Know how to define Function parameters
    ```javascript
    function Hello(param1, param2) {}
    ```
  - Know difference between parameters passing by value and by reference
    - Строки, числа, логические значения передаются в функцию по значению. Иными словами при передаче значения в функцию, эта функция получает копию данного значения.
    - Объекты и массивы передаются по ссылке. То есть функция получает сам объект или массив, а не их копию. Если что-то меняем в функции, то меняем в самом обьекте
  - Know how to handle dynamic amount of Function parameters
    - Доступ к ним осуществляется через «псевдо-массив» arguments.
    - Он содержит список аргументов по номерам: arguments[0], arguments[1]…, а также свойство length.
    - arguments – это не массив
    - ![image](https://github.com/Asmat1k/CoreJS-2/assets/113438950/1a2278ac-3fa2-4fb0-8c75-69de60f330a5)
   
- #### Closures Advanced

  - Context (lexical environment)
    - Словарь, который содержит в себе все переменные и ссылку на другое лексическое окружение (внешнее)
  - Understand function creation context (lexical environment) 
    - когда функция вызывается у нее создается свое окружение со скоупом (ссылкой на внешнее окружение)
    - если она вызыватся несколько раз, то это разные лексические окружения
  - Be able to explain difference between scope and context
    - **Область видимости** (scope) - ссылка на другое лекс. окружение (родительское)
    - **Контекст** описывает окружение в котором выполняется код (любой код имеет контекст выполнения). В каждый момент времени только один контекст выполнения выполняет код.
    - Несколько популярных видов контекста:
      - Global контекст 
      - Function контекст и тп
  - Inner/outer lexical environment ([link](https://learn.javascript.ru/closure#leksicheskoe-okruzhenie))
    - В процессе вызова функции у нас есть два лексических окружения: внутреннее (для вызываемой функции) и внешнее (глобальное):
    - Внутреннее лексическое окружение соответствует текущему выполнению функции.
    - Внешнее лексическое окружение – это глобальное лексическое окружение. В нём находятся  внешние переменные.
    - У внутреннего лексического окружения есть ссылка на внешнее outer.
    - Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во внешнем, затем в следующем и так далее, до глобального.
  - Understand connection between function and lexical environment
    - В процессе выполнения функции значения переменных могут меняться, что сразу же отражается в лексическом окружении. После выполнения функции ее лексическое окружение уничтожается, а занятая им память освобождается. Из этого поведения есть исключение — возврат функции.
   
- #### ECMAScript Intermediate
  
  - Function default parameters
    - ```javascript
      function Hello(param1 = 10, param2 = 'Tim');
      ```
  - Know how to use spread operator for Function arguments
    - Оператор `spread` — это конструкция в JavaScript, которая позволяет передавать элементы массива или свойства объекта в виде отдельных аргументов.
    - ```javascript
      function spredInFunc() {
        console.log(...arguments);
      }
      ```
  - Be able to compare `arguments` and `rest parameters`
    - Остаточные параметры (`rest parameters`) могут быть обозначены через три точки .... Буквально это значит: «собери оставшиеся параметры и положи их в массив»..
    - ```javascript
      function restinInFunc(...args) {
        console.log(args);
      }
      logArgs(1, 2, 3, 4, 5); /// 1, 2, 3, 4, 5
      ```
  - Spread operator for Array
    - Можно скопировать массив **const newArr = [...oldArr]**
  - Understand and able to use spread operator for Array concatenation
    - ```javascript
      const a = [1,2];
      const b = [3,4];
      const c = [...a, ...b]; // 1,2,3,4
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
    - перебор элементов в массиве/строке

  **Операторы легко отличить. Когда синтаксис ... используется для «распаковки» элементов массива или объекта в отдельные аргументы — это spread. А если три точки используются для сбора оставшихся аргументов в массив или объект — это оператор rest.**

#### Modules in JavaScript*

  - What is module / module pattern? For what purposes they were created?
    - Модуль — это переиспользуемая часть кода, содержащая в себе детали реализации и предоставляющая открытое API, что позволяет легко загрузить её и использовать в другом коде.
  - Modules types (AMD, ES6, CommonJS, UMD).
    - Асинхронное определение модуля (AMD)
      - Формат AMD используется в браузерах и применяет для определения модулей функцию define:
    - Формат CommonJS
      - Формат CommonJS применяется в Node.js и использует для определения зависимостей и модулей require и module.exports:
    - Универсальное определение модуля (UMD)
      - Формат UMD может быть использован как в браузере, так и в Node.js.
    - ES6
      - В ES6 JavaScript уже поддерживает нативный формат модулей. Он использует токен export для экспорта публичного API модуля:
  - Common modules features (export default, named exports, exports as, etc).
    - export default - экспорт по умолчанию
    - export as - алиас
      - ```javascript
          import { sayHello as say } from './lib';
          say();
        ```
  - Dynamic imports.
    - ```javascript
      let module = await import("путь_к_модулю");
      ```
    - [useful](https://metanit.com/web/javascript/19.6.php)

- #### Advanced Functions

  - `this` in functions
    - это ссылка на контекст исполнения функции.
    - Тезисы
      - Для функций, объявленных через `function f( ) { }`, `this` вычисляется в момент вызова и равен объекту перед точкой. Если такого объекта нет — тогда `this` будет указывать на глобальный контекст (`window`)
      - Для стрелочных функций this определяется в момент их создания и больше никогда не изменяется
  - Reference Type & losing `this` **in-work**
  - Understand difference between function and method
    - Разница между методом и функцией лишь в том, что методы - это функции, определённые внутри объектов
  - Understand how `this` works, realize `this` possible issues
    - [link](https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE-%D0%BE-%D1%82%D0%BE%D0%BC-%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%B5%D1%82-this-%D0%B2-javascript-a13b4b6ec9ac)
  - Manage `this`
  - Be able to replace `this` value
    - Можно использовать такие методы как `call`, `apply`, `bind`
  - Be able to use `call` and `apply` Function built-in methods
    - `Call` и `Apply`, каждый является функцией быстрого вызова.
      - `Call` берёт любое число параметров и также может принимать дополнительные аргументы.
      - Apply берет только два параметра: `this` и массив дополнительных аргументов.
  - Know how to bind `this` scope to function
    - `bind()` возвращает функцию с контекстом `this`, который уже связан. Из-за этого `bind()` полезен тогда, когда мы не знаем все аргументы наперед.

- #### Functional Patterns

  - Callback (Function as argument)
    - Колбэк-функция (или обратный вызов) - это функция, переданная в другую функцию в качестве аргумента, которая затем вызывается по завершению какого-либо действия.
  - Know callback pattern **in-work**
  - Know IIFE pattern `(optional)`
    - Immediately-Invoked Functional Expression(eng) - немедленно вызываемое функциональное выражение
    - ```javascript
      (function () {
        console.log('IIFE');
      })();
      ```
  - Carrying and partial functions
    - Карирование - это трансформация функций таким образом, чтобы они принимали аргументы не как f(a, b, c), а как f(a)(b)(c).
    - ```javascript
      function curry(f) {
        return function(a) {
          return function(b) {
            return a+b+f;
          };
        };
      }
      alert(curry(1)(2)(3) ); // 6
      ```
    - При вызове каррированной функции с передачей ей одного аргумента, она возвращает новую функцию, которая ожидает поступления следующего аргумента.
    - Частичная функция - это когда мы фиксируем один аргумуент, а отсальные карируем
      - ```javascript
        function volume(l) {
          return (w, h) => {
              return l * w * h
          }
        }
        const hV = volume(70);
        hV(203,142);
        ```

- #### Object Oriented Programming

  - `new` keyword
    - Функции-конструкторы следует вызывать только с помощью new. 
  - Understand how `new` keyword works
    - Такой вызов подразумевает создание пустого `this` в начале и возврат заполненного в конце.
    - Создается пустой `this` и возвращается заполненый
    - **HARD LVL***
      - встречая оператор `new` интерпретатор создаёт новый пустой объект, затем он вызывает конструктор, и передаёт ему новый созданный объект в качестве значения ключевого слова `this`. Внутри конструктора происходит инициализация свойств вновь созданного объекта. После того, как объект создан и инициализарован, оператор new возвращает созданный объект.
  - Function constructor
    - Функции-конструкторы технически являются обычными функциями. Но есть два соглашения:
      - Имя функции-конструктора должно начинаться с большой буквы.
      - Функция-конструктор должна выполняться только с помощью оператора "new".
  - Know function constructor concept
     - Когда функция вызывается как `new FunctionName(...)`, происходит следующее:
        - Создаётся новый пустой объект, и он присваивается `this`.
        - Выполняется тело функции. Обычно оно модифицирует `this`, добавляя туда новые свойства.
        - Возвращается значение `this`.
  - Able to create constructor functions
    ```javascript
    function User(name, password) {
      this.name = name;
      this.password = password;
    }

    let Ann = new User('Ann', '1234')
    ```
  - `Public`, `private`, `static` members
    - `Public`
      - И статические, и публичные поля являются изменяемыми, перечисляемыми, настраиваемыми свойствами. Таким образом, в отличие от приватных полей, они участвуют в прототипном наследовании.
    - Обычно **статические** методы / поля используются, когда они будут только в "главном" (основном) классе.
    - Приватные свойства и методы должны начинаться с #.
      - Они доступны только внутри класса.
      - Только класс, который определяет приватное статическое поле, может получить доступ к этому полю.
  - Know how to create `public`/`static`/`private` members
    - Преписка перед ними в ts
    - `Static`
      - Статические методы используются для функциональности, принадлежат классу «в целом»
    - Защищённые поля имеют префикс `_`. Это хорошо известное соглашение, не поддерживаемое на уровне языка. Программисты должны обращаться к полю, начинающемуся с `_`, только из его класса и классов, унаследованных от него.
      - Свойство или метод будут использоваться исключительно внутри класса
    - Приватные поля имеют префикс #.
      - Запрещает получение свойств / метода вне тела класса
      - Доступны только внутри класса
  - Understand OOP emulation patterns and conventions
    - [link](https://habr.com/ru/companies/ruvds/articles/665290/)
   
- #### ECMAScript Classes

  - Class declaration
    ```javascript
    class User = {
      constructor(name) {
        this.name = name;
      }
    }
    ```
  - Know `class` declaration syntax **наверху**
  - Understand difference between `class` and `constructor function`
    - Разница между объявлением функции (`function declaration`) и объявлением класса (`class declaration`) в том, что объявление функции совершает подъём (hoisted), в то время как объявление класса — нет. Поэтому начале необходимо объявить ваш класс и только затем работать с ним.
    - Функция конструктор заменяла классы до их появления
  - Getter/setter
    - Геттер, с синтаксисом get, связан с функцией, которая будет вызвана при обращении к рассматриваемому свойству и динамическом запросе.
      - Могут иметь идентификатор типа numeric или string.
      - У вас не должно быть никаких параметров.
      - Для одного и того же свойства не может использоваться более одного геттера, также не может быть общего свойства с тем же именем, что и геттер.
    - Обычно используются в сочетании с геттерами, сеттеры используются для установки значений для определенного свойства.
      - Может иметь идентификатор типа numeric или string.
      - У вас должен быть ровно один параметр.
      - Нельзя иметь одну и ту же номенклатуру для свойства и функции.
  - What does `super()` do and where we have to use it?
    - У классов есть ключевое слово "super" для таких случаев.
      - super.method(...) вызывает родительский метод.
      - super(...) для вызова родительского конструктора (работает только внутри нашего конструктора).
        - Если дочерний класс наследует какие-либо свойства от родительского, то он сначала должен присвоить эти свойства через вызов функции super() и лишь затем устанавливать свои.

- #### Prototypal Inheritance Basics

  - `__proto__` property
  - Understand `__proto__` object property
  - Able to use [Object.create] and define `__proto__` explicitly
  - `prototype` property
  - Know function `prototype` property
  - Understand dependency between function constructor `prototype` and instance `__proto__`
  - Able to create 'class' methods using function `prototype` property 
  - Able to set / get object prototype `(optional)`

  - #### ECMAScript Advanced Data Types & Expressions

  - `Set/Map` data types
    - **MAP**
      - это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.
      - Методы
        - `new Map()` – создаёт коллекцию.
        - `map.set(key, value)` – записывает по ключу key значение value.
        - `map.get(key)` – возвращает значение по ключу или undefined, если ключ key отсутствует.
        - `map.has(key)` – возвращает true, если ключ key присутствует в коллекции, иначе false.
        - `map.delete(key)` – удаляет элемент (пару «ключ/значение») по ключу key.
        - `map.clear()` – очищает коллекцию от всех элементов.
        - `map.size` – возвращает текущее количество элементов.
    - **SET**
      - коллекция уникальных значений, так называемое «множество».
      - Методы:
        - `new Set(iterable)` – создаёт Set, можно указать перебираемый объект со значениями для инициализации.
        - `set.add(value)` – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
        - `set.delete(value)` – удаляет значение, возвращает true если value было в множестве на момент вызова, иначе false.
        - `set.has(value)` – возвращает true, если значение присутствует в множестве, иначе false.
        - `set.clear()` – удаляет все имеющиеся значения.
        - `set.size` – возвращает количество элементов в множестве.
    - Перебор **Map** и **Set** всегда осуществляется в порядке добавления элементов, так что нельзя сказать, что это – неупорядоченные коллекции, но поменять порядок элементов или получить элемент напрямую по его номеру нельзя.
  - `WeakSet/WeakMap` data types
    - **WeakMap** – это Map-подобная коллекция, позволяющая использовать в качестве ключей только объекты, и автоматически удаляющая их вместе с соответствующими значениями, как только они становятся недостижимыми иными путями.
    - **WeakSet** – это Set-подобная коллекция, которая хранит только объекты и удаляет их, как только они становятся недостижимыми иными путями.
    - **WeakMap** и **WeakSet** используются как вспомогательные структуры данных в дополнение к «основному» месту хранения объекта. Если объект удаляется из основного хранилища и нигде не используется, кроме как в качестве ключа в `WeakMap` или в `WeakSet`, то он будет удалён автоматически.
    - Их приемущества в том, что они очищают память занятую ключем, при его удалении

- #### JavaScript Errors

  - JavaScript Errors (throw, Error class)
    - Инструкция throw позволяет генерировать исключения, определяемые пользователем. При этом выполнение текущей функции будет остановлено (инструкции после `throw` не будут выполнены), и управление будет передано в первый блок `catch` в стеке вызовов. Если `catch` блоков среди вызванных функций нет, выполнение программы будет остановлено.
    - Конструктор `Error` создаёт объект ошибки. Экземпляры объекта Error выбрасываются при возникновении ошибок во время выполнения. Объект Error также может использоваться в качестве базового для пользовательских исключений.
  - `try..catch` statement
    - В блоке try отлавливается ошибки в выполняемом коде, при их появлении, код переходит в `catch` блок
  - Error handling
    - `try..catch`
    - `throw`
  - Error class
    - Конструктор Error создаёт объект ошибки. Экземпляры объекта Error выбрасываются при возникновении ошибок во время выполнения. Объект Error также может использоваться в качестве базового для пользовательских исключений.
  - error logging
    - console.log() / console.info()
    - console.error() - выводит в конолсь текст как ошибку
    - console.warn() - выводит в коносоль текст как предупреждение
  - async error events
    - [link](https://learn.javascript.ru/async-await#obrabotka-oshibok)
 
- #### ECMAScript Advanced

  - Promises
    - Промис (`Promise`) — специальный объект **JavaScript**, который используется для написания и обработки асинхронного кода
    - Асинхронные функции возвращают объект Promise в качестве значения. Внутри промиса хранится результат вычисления, которое может быть уже выполнено или выполнится в будущем.
  - Promise states
    - `pending` — стартовое состояние, операция стартовала;
    - `fulfilled` — получен результат;
    - `rejected` — ошибка.
    - После создания, промис находится в состоянии ожидания pending. Когда асинхронная операция завершается, функция переводит промис в состояние успеха fulfilled или ошибки rejected.
  - Promise chaining
    - Поменять состояние можно только один раз: перейти из pending либо в fulfilled, либо в rejected
  - Promise static methods
    - С помощью методов `then()`, `catch()` и `finally()` мы можем реагировать на изменение состояния промиса и использовать результат его выполнения.
    -  принимает в качестве аргумента две функции-колбэка. Если промис в состоянии fulfilled то выполнится первая функция. Если в состоянии rejected — вторая. Хорошей практикой считается не использовать второй аргумент метода then() и обрабатывать ошибки при помощи метода catch().
  - Be able to handle errors in promises
    - Метод `catch()` принимает в качестве аргумента функцию-колбэк, которая выполняется сразу после того, как промис поменял состояние на `rejected`. Параметр колбэка содержит экземпляр ошибки:
  - `async/await`
    - Добавленное перед определением функции ключевое слово `async` делает функцию асинхронной
    - `await` блочит выполнение
    - [link](https://learn.javascript.ru/async-await)
  - event loop

### JavaScript in Browser:

- #### Global object window

  - Location
    - В браузере он называется window, в Node.js — `global`
    - Недавно `globalThis` был добавлен в язык как стандартизированное имя для глобального объекта, которое должно поддерживаться в любом окружении
  - Know browser location structure
  - History API (Global object window)
    - DOM-объект Window предоставляет доступ к истории текущей сессии браузера (не путать с историей браузерных расширений (en-US)) через объект `history`. Он предоставляет полезные методы и свойства, которые позволяют переходить назад и вперёд по истории пользователя и манипулировать её содержимым.
  - Know browser History APIconcept (наверху)
  - Be able to navigate within browser history
      - `window.history.back();`
      - `window.history.forward();`
      - `window.history.go(-1);`
  - Be able to use history state
    - смотреть выше
  - Navigator
    - Интерфейс Navigator представляет собой состояние и особенности(свойства) пользовательского агента. Это позволяет скриптам узнавать их и самостоятельно регистрироваться для выполнения некоторых действий.
  - Know how to parse user agent **in-work**
  - Know how to discover client platform, browser
    - `Window.navigator` является свойством только для чтения и возвращает ссылку на объект Navigator, который может запросить информацию о приложении, запустившем скрипт.
    - `Window.navigator` navigator.userAgent помогает распознать браузер
  - Cookies
    - `document.cookie` предоставляет доступ к куки.
    - Операция записи изменяет только то куки, которое было указано.
    - Имя и значение куки должны быть закодированы.
    - Одно куки вмещает **до 4kb данных**, разрешается более **20 куки на сайт** (зависит от браузера).
   
- #### Page Lifecycle

  - **Parsing**
    - Html парсится и разбивается на `токены`;
    - Токены преобразуются в `Ноды`;
    - Ноды собираются в `DOM` `(Document Object Model)` дерево;
    - Параллельно с этим процессом происходит парсинг CSS правил и строится `CSSOM` `(CSS Object Mode)`;
    - `CSSOM` и `DOM` объединяются в `Render Tree`, похожее на DOM дерево
  - **Reflow**
    - Итак, после того как браузер определил структуру документа и стили для каждой ноды, начинается Reflow.
    - Браузер проходит по рендер дереву (Render Tree), начиная от корневого элемента дерева и определяет координаты каждого элемента и пространство которое он занимает
    - Определение размеров и местоположений элементов происходит не за один проход по дереву, проход может происходить несколько раз, если элементы встречающиеся позже, влияют на предыдущие элементы.
    - Каждый раз когда вы меняете свойство стиля, которое отвечает за положение и размеры элемента, происходит повторный процесс расчета размеров и положений у всех элементов, на которые могут повлиять эти изменения, происходит Reflow
    - Просчитвает, что где находится и тп
  - **Repaint**
    - Размера и положения элементов не достаточно для того чтобы отобразить страницу, нужно знать каким образом «покрасить» эти элементы. На этапе `Paint`/`Repaint` браузер обходит Layout Tree и создает записи о том как будут отрисованы элементы на странице(позиция x,y, ширина, высота, цвет).
    - Вызвать `Repaint` могут изменения свойств color, background, visibility и подобных, в общем свойств которые не изменяют размеров и положения элемента
    - Также необходимо помнить, что каждый раз когда вызывается Reflow, за ним вероятнее всего последует `Repaint` элемента. То есть если вы измените элементу свойство width, произойдет Reflow, а затем и `Repaint` затронутых элементов.
  - Critical rendering path (CRP) `(optional)`
    - Critical rendering path — путь, который проходит браузер до того, как страница отрисовывается в браузере
    - [link](https://developer.mozilla.org/ru/docs/Web/Performance/Critical_rendering_path)

- #### Network requests

  - `Fetch` (with usage)
    - [link](https://learn.javascript.ru/fetch)

- #### Web Storage API & cookies

  - Cookies **in-work**
  - Difference between localStorage, sessionStorage and cookies **in-work**
 
### Typescript:

- #### Ability to write concise TypeScript code using its constructs
  - basic types
    1. `String` 
    2. `Number`
    3. `Bigint`
    4. `Boolean`
    5. `Undefined`
    6. `Null`
    7. `Symbol`
    8. `Object`
  - enums
    - Для определения перечисления применяется ключевое слово enum.
    - ```javascript
      enum Season { Winter=5, Spring, Summer, Autumn }; // 5, 6, 7, 8
      ```
    - ```javascript
      enum Season { Winter=4, Spring=8, Summer=16, Autumn=32 };  // 4, 8, 16, 32
      ```
    - ```javascript
      enum Season { Winter, Spring, Summer, Autumn };
      ```
  - `type` / `interface`, differences between them
    - `type` - кастомные типы
      - type UserName = string;
    - `interface`
      - Интерфейс определяет свойства и методы, которые объект должен реализовать. Другими словами, интерфейс - это определение кастомного типа данных, но без реализации.
        ```javascript
        interface IUser {
          id: number;
          name: string;
        }
        ```
  - using interfaces with optional properties, read-only properties, etc...
    - необязательные свойства отмечаются `?` (name`?`: string)
    - только для чтения (`readonly` name: string)
    - определение методов (`sayWords(words: string): void;`)
  - function types
    - Функциональный тип обозначается с помощью пары круглых скобок (), после которых располагается стрелка, а после неё обязательно указывается тип возвращаемого значения () => type. При наличии у функционального выражения параметров, их декларация заключается между круглых скобок `(p1: type, p2: type) => type`.
  - utitily types `(optional)`
  - typeguards `(optional)`
  - creating custom types
    - type - кастомные типы
    - type UserName = string;
  - generic types (concept)
    - Обобщения объявляются при помощи пары угловых скобок, в которые через запятую, заключены параметры типа, называемые также типо-заполнителями или универсальными параметрами Type<T0, T1>.
  - understanding TS (ES6) module system
 
### Design patterns:*

  - Creational Design Patterns
    -  шаблоны проектирования, которые имеют дело с процессом создания объектов. Они позволяют сделать систему независимой от способа создания, композиции и представления объектов. Шаблон, порождающий классы, использует наследование, чтобы изменять наследуемый класс, а шаблон, порождающий объекты, делегирует инстанцирование другому объекту.
  - Structural Design Patterns
    - Список структурных паттернов проектирования, которые отвечают за построение удобных в поддержке иерархий классов.
  - Behavioral Design Patterns
    - Список поведенческих паттернов проектирования, которые решают задачи эффективного и безопасного взаимодействия между объектами программы.
  - MVC `(optional)`

  - #### Intermediate knowledge of patterns and best practices:

    - SOLID principles
      - SOLID — это аббревиатура пяти основных принципов проектирования в объектно‑ориентированном программировании — Single responsibility, Open-closed, Liskov substitution, Interface segregation и Dependency inversion.
      - [link](https://web-creator.ru/articles/solid)

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
