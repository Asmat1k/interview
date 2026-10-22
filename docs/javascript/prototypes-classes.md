---
sidebar_position: 9
format: md
---

# Прототипы, наследование и классы

## Классы

- представляют собой синтаксический сахар над существующим в JavaScript механизмом прототипного наследования (см. ниже)
- Создание - new MyNewClass()

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

let user = new User("Иван");
user.sayHi();
```

- Классы - это не просто синтаксический сахар
  - Конструктор класса нельзя вызвать без new; тела классов выполняются в строгом режиме. Поэтому class не полностью эквивалентен ручному присваиванию методов прототипу.
  - Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype". И это хорошо, так как если мы проходимся циклом for..in по объекту, то обычно мы не хотим при этом получать методы класса.
  - Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.
- Классы можно создавать через class Expression (как function expression)
- **Наследование классов** - Наследование классов – это способ расширения одного класса другим классом. Таким образом, мы можем добавить новый функционал к уже существующему.
  - В явно заданном конструкторе наследника вызывают `super()` до доступа к `this`; без собственного конструктора вызов добавляется автоматически. Конструктор может вместо этого явно вернуть другой объект.
- В классах можно переопределять методы наследуемых классов (родителей)
- Статические методы
  - Принадлежат классу в целом, а не относятся к конкретному объекту класса
  - Наследуются
  - Статические свойства используются в тех случаях, когда мы хотели бы сохранить данные на уровне класса, а не какого-то одного объекта.

```js
class MyClass {
  static property = 0;

  static method() {
    return this.property;
  }
}
```

- Условно защищённые поля
  - Префикс `_` — соглашение об именовании; JavaScript не ограничивает доступ извне. Встроенного модификатора protected нет.
- Приватные поля (Private)
  - имеют префикс `#`
  - не можем получить к нему доступ извне или из наследуемых классов
  - Приватные элементы базового класса могут присутствовать на экземпляре наследника, но код наследника не имеет к ним прямого доступа.

Пример:

```javascript
class Counter {
  #value = 0; // настоящее приватное поле

  _label = "Счёт"; // соглашение: доступ извне технически разрешён

  static description = "Счётчик";

  increment() {
    return ++this.#value;
  }

  read() {
    return this.#value;
  }
}

class DoubleCounter extends Counter {
  increment() {
    super.increment();
    return super.increment();
  } // переопределение
}

const counter = new DoubleCounter();
console.log(counter.increment(), counter.read()); // 2, 2
console.log(DoubleCounter.description); // "Счётчик": статическое свойство наследуется
console.log(Object.keys(Counter.prototype)); // []: методы неперечислимы

// counter.#value; // SyntaxError: прямой доступ к приватному полю запрещён

const Named = class {
  value = 1;
}; // class expression
console.log(new Named().value); // 1
```

## Наследование: `__proto__` и `prototype`

- `[[Prototype]]` — внутренняя ссылка объекта на его прототип или `null`. Читать её следует через `Object.getPrototypeOf(obj)`; `__proto__` — устаревший аксессор, отсутствующий у некоторых объектов.
- `Constructor.prototype` — обычное свойство функции, используемое `new` для установки прототипа экземпляра. У стрелочных функций такого свойства нет; наличие `prototype` само по себе не гарантирует возможность вызова с `new` (например, генераторы).
- Прототип можно задать через `Object.create(proto)` без конструктора. Поиск отсутствующего свойства идёт по цепочке прототипов до `null`.
- Примитивы не являются объектами, но доступ к свойствам большинства примитивов использует временную обёртку; `null` и `undefined` её не имеют.

Источник: [MDN — наследование и цепочка прототипов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain).

Пример:

```javascript
function Animal() {}

Animal.prototype.eat = function () {
  return "Ест";
};

const rabbit = new Animal();
console.log(Object.getPrototypeOf(rabbit) === Animal.prototype); // true
console.log(rabbit.eat()); // "Ест": метод найден в прототипе

const child = Object.create(rabbit);
console.log(child.eat()); // "Ест": поиск проходит по цепочке
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

## Прототипное наследование в JavaScript

Прототипное наследование — это механизм, с помощью которого объекты могут наследовать свойства и методы друг от друга. Рассмотрим основные аспекты прототипного наследования.

Документация: [прототипы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

### Свойство `__proto__`

- **Что это такое?** `__proto__` — устаревший аксессор Object.prototype для внутреннего [[Prototype]], а не само внутреннее свойство. Он может отсутствовать или быть перекрыт; предпочтительны Object.getPrototypeOf, Object.setPrototypeOf и Object.create.

- **Как работает?** Когда вы пытаетесь получить доступ к свойству объекта, и это свойство не найдено у самого объекта, JavaScript ищет его в прототипе, указанном в `__proto__`.

Пример:

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(Object.getPrototypeOf(rabbit) === animal); // true
console.log(rabbit.eats); // true: поиск продолжается в прототипе
```

### Прототип объекта `__proto__`

- **Пример:**

  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = {
    jumps: true,
  };

  rabbit.__proto__ = animal;

  console.log(rabbit.eats); // true
  ```

- **Объяснение:** Здесь объект `rabbit` наследует свойство `eats` от объекта `animal`, так как `rabbit.__proto__` указывает на `animal`.

### Использование `Object.create()` и `__proto__`

- **Object.create:** Этот метод используется для создания нового объекта с указанным прототипом.
- **Пример:**

  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = Object.create(animal);

  console.log(rabbit.eats); // true
  ```

- **Явное определение `__proto__`:**
  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = {};
  rabbit.__proto__ = animal;

  console.log(rabbit.eats); // true
  ```

### Свойство `prototype`

- **Что это такое?** Свойство `prototype` у функций-конструкторов используется для реализации наследования. При обычном вызове new, если prototype — объект, он становится прототипом создаваемого экземпляра; явный возврат другого объекта из конструктора может изменить результат.

- **Пример:**
  ```javascript
  function Animal() {}

  Animal.prototype.eats = true;

  let rabbit = new Animal();

  console.log(rabbit.eats); // true
  ```

### Связь `Constructor.prototype` и прототипа экземпляра

- **Пример:**

  ```javascript
  function Animal() {}

  Animal.prototype.eats = true;

  let rabbit = new Animal();

  console.log(rabbit.__proto__ === Animal.prototype); // true
  ```

- **Объяснение:** В этом примере Object.getPrototypeOf(rabbit) === Animal.prototype. Это отношение внутреннего [[Prototype]] экземпляра к свойству prototype конструктора; оно не требует доступа через **proto**.

### Методы в `Constructor.prototype`

- **Пример:**
  ```javascript
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.speak = function () {
    console.log(`${this.name} говорит.`);
  };

  let rabbit = new Animal("Кролик");
  rabbit.speak(); // Кролик говорит.
  ```

### Установка и получение прототипа объекта (дополнительно)

- **Object.setPrototypeOf:** Устанавливает прототип объекта.

- **Пример:**

  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = {
    jumps: true,
  };

  Object.setPrototypeOf(rabbit, animal);

  console.log(rabbit.eats); // true
  ```

- **Object.getPrototypeOf:** Возвращает прототип объекта.

- **Пример:**
  ```javascript
  let animal = {
    eats: true,
  };

  let rabbit = Object.create(animal);

  console.log(Object.getPrototypeOf(rabbit) === animal); // true
  ```
