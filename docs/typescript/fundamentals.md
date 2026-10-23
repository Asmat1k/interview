---
sidebar_position: 1
format: md
---

# Основы системы типов

## TypeScript (TS)

Примеры независимы: не объединяйте повторяющиеся объявления `IUser` и `Season` в один файл. `readonly` проверяется компилятором и не замораживает объект во время выполнения.

Документация: [Дока: статическая типизация](https://doka.guide/tools/static-types/).

### Базовые типы

TypeScript проверяет допустимые значения до выполнения программы; аннотации типов не проверяют данные с сервера во время работы. Для обычных значений используют имена в нижнем регистре: `string`, `number`, `boolean`. Тип часто выводится из начального значения.

`object` означает непримитивное значение, а не описание конкретных полей. При `strictNullChecks` значения `null` и `undefined` нужно явно учитывать в типе, например `string | null`.

Документация: [TypeScript — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

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

Документация: [официальный Handbook — типы](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

### enum

Перечисление объединяет именованные константы, например состояния заказа. Числовые элементы без явных значений нумеруются с нуля; строковым задают значения вручную. Обычный `enum` создаёт JavaScript-объект во время компиляции, в отличие от псевдонима типа.

Если нужны только допустимые строковые значения без отдельного объекта во время выполнения, подойдёт объединение литералов: `type Status = "pending" | "done"`.

Документация: [TypeScript — Enums](https://www.typescriptlang.org/docs/handbook/enums.html).

- Для определения перечисления применяется ключевое слово enum.

```typescript
enum Season {
  Winter = 5,
  Spring,
  Summer,
  Autumn,
} // 5, 6, 7, 8
```

```typescript
enum Season {
  Winter = 4,
  Spring = 8,
  Summer = 16,
  Autumn = 32,
} // 4, 8, 16, 32
```

```typescript
enum Season {
  Winter,
  Spring,
  Summer,
  Autumn,
}
```

Документация: [enums](https://www.typescriptlang.org/docs/handbook/enums.html).

### Различия `type` и `interface`

- `type` задаёт псевдоним любого типа, включая примитивы, объединения и [объекты](../javascript/objects-arrays.md). interface описывает форму объекта, поддерживает extends и слияние деклараций; type не переоткрывается для слияния.
  ```typescript
  type UserName = string;
  ```
- `interface`
  - Интерфейс описывает свойства и методы объекта без их реализации.
    ```typescript
    interface IUser {
      id: number;
      name: string;
    }
    ```

### Свойства и методы интерфейсов: `?` и `readonly`

`name?: string` разрешает отсутствие поля; при чтении со `strictNullChecks` нужно учитывать `undefined`. `readonly id: number` запрещает присваивание через этот тип, но не замораживает объект и не делает вложенные поля неизменяемыми. Сигнатура метода, например `save(): void`, описывает допустимый вызов без реализации.

Документация: [TypeScript — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html).

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

### Типы функций

Тип функции задаёт контракт вызова: какие аргументы передать и какой результат получить. Например, `(value: number) => string` подходит для форматирования числа. Такой тип удобно использовать для callback-параметров; `void` означает, что вызывающий код не использует возвращаемое значение.

Документация: [TypeScript — More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html).

- Тип функции записывают как `(параметры) => типРезультата`.
  ```typescript
  let greet: (name: string) => string = (name) => `Hello, ${name}`;
  ```

### Utility Types (дополнительно)

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

Документация: [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

### Type guards (дополнительно)

- Type guards — проверки, по результатам которых TypeScript сужает тип значения. Пользовательский предикат должен сам корректно проверять данные; компилятор не доказывает его истинность.
  ```typescript
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }
  ```

Документация: [сужение типов](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

Пример сужения типа:

```typescript
function length(value: unknown): number {
  if (typeof value === "string") return value.length;

  return 0;
}

console.log(length("Привет"), length(42)); // 6, 0
```

### Пользовательские типы

Псевдоним помогает один раз описать данные и переиспользовать описание в параметрах и результатах функций. Он может обозначать объект, объединение или кортеж. Например, `type Id = string | number` разрешает оба вида идентификатора, но не создаёт новый класс или проверку значения во время выполнения.

- `type` задаёт пользовательский тип.
  ```typescript
  type UserName = string;
  type User = {
    id: number;
    name: UserName;
  };
  ```

### Generics

Дженерик сохраняет связь между типами: в `identity<T>(value: T): T` результат имеет тот же тип, что аргумент. В отличие от `any`, конкретный тип не теряется. Обычно `T` выводится из аргумента, а ограничение `T extends ...` задаёт свойства, необходимые реализации.

Документация: [TypeScript — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

- Параметры типа записывают в угловых скобках: `<T>` или `<T, U>`. Они связывают типы входных и выходных значений.
  ```typescript
  function identity<T>(value: T): T {
    return value;
  }

  let number = identity<number>(42);
  let word = identity<string>("Hello");
  ```

### Модули TypeScript

- TypeScript поддерживает синтаксис [ES-модулей](../javascript/modules.md) и разные среды выполнения. Разрешение путей и формат вывода зависят от module/moduleResolution и среды; ниже пример для среды со сборщиком.
  ```typescript
  // math.ts
  export const add = (a: number, b: number) => a + b;

  // app.ts
  import { add } from "./math";

  console.log(add(2, 3));
  ```

Документация: [модули](https://www.typescriptlang.org/docs/handbook/modules/theory.html).

## Псевдонимы типов и интерфейсы

### Псевдонимы типов

- Псевдоним позволяет назвать тип и использовать это имя повторно.
- Запись `type Name = Type` задаёт имя для типа.
- Повторное объявление псевдонима с тем же именем вызывает ошибку компиляции.

```ts
type User = {
  firstName: string;
  pointsCount: number;
};

// Теперь можно удобно типизировать
function doSomething(user: User) {
  // ...
}
```

### Интерфейсы

- Интерфейс описывает свойства и методы объекта без их реализации.
- Интерфейсы определяются с помощью ключевого слова `interface`.
- Могут иметь несколько объявлений с объединением (declaration merging), а не заменой предыдущего
- Используются в том числе и для классов
- Если интерфейс переопределяется:
  - Если имеет разные свойства, то они сливаются в один интерфейс, то есть свойства из первого объявления сольются со свойствами из второго объявления
  - одинаковые свойства должны иметь совместимые идентичные типы; конфликтующие типы вызывают ошибку, методы допускают перегрузки

```ts
interface IUser {
  id: number;
  name: string;
  sayWords(words: string): void; // Метод
}
```

Документация: [TypeScript — типы объектов](https://www.typescriptlang.org/docs/handbook/2/objects.html).

Документация: [TypeScript — объединение деклараций](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

Пример:

```typescript
type Id = string | number;

interface User {
  id: Id;
}

interface User {
  name: string;
} // слияние объявлений

const user: User = { id: 1, name: "Анна" };

interface Named {
  name: string;
}

class Person implements Named {
  constructor(public name: string) {}
}
// type Id = boolean; // Ошибка: псевдоним нельзя объявить повторно
// interface User { id: boolean; } // Ошибка: несовместимый тип свойства
```

## Дополнительная информация по типам данных TS

- Кортеж — тип массива с заданными типами позиций; он не неизменяем по умолчанию. Для запрета изменений через эту ссылку используют readonly-кортеж.
- `Enum` (перечисления) Представляет собой набор логически связанных констант, в качестве значений которых могут выступать как числа, так и строки. В случае, когда идентификаторам констант значение не устанавливается явно, они ассоциируются с числовыми значениями, в порядке возрастания, начиная с нуля.

```ts
enum Fruits {
  Apple, // 0
  Pear = 1, // 1
  Banana, // 2
  Citrus = "Lemon",
}
```

- `Array` - означает массив
- `void` — результат функции не предполагается использовать; это не полный синоним undefined и не гарантия отсутствия значения в runtime
- Отличие типа `unknown` от `any` - главное отличие `unknown` от any связано с проверкой типов. `unknown` требует сужения/проверки типа для типозависимых операций; сравнения и присваивание в unknown допустимы, any отключает такие проверки
- `never` обозначает невозможное значение: например, результат функции, которая всегда бросает ошибку или не завершается

Пример:

```typescript
const pair: [string, number] = ["Анна", 25];

pair[1] = 26; // обычный кортеж допускает изменение

const fixed: readonly [string, number] = ["Анна", 25];
// fixed[1] = 26; // Ошибка компиляции
const values: Array<number> = [1, 2, 3];

function log(message: string): void {
  console.log(message);
}

let data: unknown = "строка";

if (typeof data === "string") console.log(data.toUpperCase()); // "СТРОКА"

let unchecked: any = 42;

// unchecked.missing(); // компилируется, но вызовет TypeError
function fail(message: string): never {
  throw new Error(message);
}
```
