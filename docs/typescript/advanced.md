---
sidebar_position: 2
format: md
---

# Дженерики и преобразование типов

## Дженерики

- Дженерики (generic) помогают писать универсальный, переиспользуемый код, а также в некоторых случаях позволяют отказаться от any.
- **Главная** задача дженериков — помочь разработчику писать код, который одинаково будет работать со значениями разных типов.

```ts
function include<T>(array: T[], query: T): boolean {
  for (const value of array) {
    if (value === query) {
      return true;
    }
  }

  return false;
}
```

- Вместо конкретного типа, мы как будто объявляем «переменную», а затем передаём в неё нужный тип. Таким образом, получается код, который может работать с разными типами

Пример вызова:

```typescript
function identity<T>(value: T): T {
  return value;
}

const number = identity(42); // number
const text = identity("Привет"); // string

console.log(number, text); // 42, "Привет"
```

## Utility Types

- это набор встроенных типов, которые можно использовать для манипулирования типами данных в коде. Рассмотрим их подробнее.
- Примеры:
  1. `Partial<T>` — делает все свойства типа T необязательными.
  2. `Required<T>` - Делает все свойства типа T обязательными.
  3. `Readonly<T>` - Делает свойства типа T доступными только для чтения через этот тип; ограничение поверхностное и не замораживает объект в runtime.
  4. `Pick<T, K>` - Создает новый тип, выбирая набор свойств K из типа T.
  5. `Omit<T, K>` - Создает новый тип, исключая набор свойств K из типа T.
  6. `Record<K, T>` - Создает тип объекта, ключи которого типа K, а значения типа T.
  7. `Exclude<T, U>` - Создает тип, исключая из типа T все типы, которые присваиваются типу U.
  8. `Extract<T, U>` - Создает тип, который содержит только те типы из T, которые присваиваются типу U.
  9. `NonNullable<T>` - Исключает null и undefined из типа T.

Документация: [TypeScript — Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

Пример:

```typescript
type User = { id: number; name?: string; active: boolean };
const patch: Partial<User> = { active: false };
const full: Required<User> = { id: 1, name: "Анна", active: true };
const fixed: Readonly<User> = { id: 1, active: true };
// fixed.id = 2; // Ошибка компиляции
const summary: Pick<User, "id" | "name"> = { id: 1 };
const withoutId: Omit<User, "id"> = { active: true };
const roles: Record<"admin" | "guest", boolean> = { admin: true, guest: false };
const numberOnly: Exclude<string | number, string> = 42;
const stringOnly: Extract<string | number, string> = "текст";
const present: NonNullable<string | null | undefined> = "есть значение";
```

## Условные типы (Conditional Types)

Запись `T extends U ? X : Y` выбирает тип `X`, если `T` присваивается `U`, иначе `Y`. Это вычисление системы типов, а не ветвление выполняемого JavaScript. Если слева стоит параметр типа и ему передан union, условие обычно применяется отдельно к каждому участнику объединения.

Документация: [TypeScript — Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html).

- это типы, способные принимать одно из двух значений, основываясь на принадлежности одного типа к другому. Условные типы семантически схожи с [тернарным оператором](../javascript/operators.md).

```ts
interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
```

Пример результата условного типа:

```typescript
type IsString<T> = T extends string ? "да" : "нет";
const first: IsString<string> = "да";
const second: IsString<number> = "нет";
```

## Перегрузка функций (Function Overloads)

Перегрузки полезны, когда тип результата зависит от формы аргументов. Компилятор выбирает доступную сигнатуру вызова, а общая реализация должна поддерживать их все. Если разные входные типы не меняют контракт результата, параметр с union-типом часто проще нескольких перегрузок.

- это несколько сигнатур вызова одной реализации; сигнатура реализации извне недоступна как дополнительная перегрузка.

```ts
export function myFunction(input: string): string;

export function myFunction(input: number): number;

/**
 * Overloads
 * @param input
 * @returns number|string
 */
export function myFunction(input: unknown): unknown {
  return input;
}
```

Документация: [TypeScript — функции](https://www.typescriptlang.org/docs/handbook/2/functions.html).

Пример вызова перегрузок:

```typescript
function echo(value: string): string;

function echo(value: number): number;

function echo(value: string | number) {
  return value;
}

console.log(echo("Привет").toUpperCase(), echo(42).toFixed(1)); // "ПРИВЕТ", "42.0"
// echo(true); // Ошибка: нет перегрузки для boolean
```

## Операторы

Эти операторы работают во время выполнения по правилам JavaScript и возвращают один из операндов. `&&` останавливается на первом falsy-значении, `||` — на первом truthy-значении. `??` использует правую часть только при `null` или `undefined`, сохраняя `0`, `false` и пустую строку. Правая часть вычисляется только при необходимости.

Документация: [MDN — Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

- И (&&), логическое ИЛИ (||) и оператор нулевого слияния (??).

Пример:

```typescript
const name: string | null = null;
const count = 0;

console.log(name ?? "Гость"); // "Гость"
console.log(count || 10, count ?? 10); // 10, 0
console.log(true && "Готово"); // "Готово": && возвращает операнд
```
