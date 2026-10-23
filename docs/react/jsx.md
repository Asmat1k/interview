---
sidebar_position: 1
format: md
---

# JSX и TSX

## JSX и TSX

### JSX (JavaScript XML)

- Расширение синтаксиса JavaScript для описания разметки; JSX похож на [HTML](../web/html.md), но имеет собственные правила
- После компиляции каждое JSX-выражение становится обычным вызовом JavaScript-функции, результат которого — объект JavaScript (см картинку ниже)
  ![итог компиляции js](../../img/telegram-cloud-photo-size-2-5471919284818139555-y.jpg)
- Классическое преобразование использует React.createElement; автоматический JSX runtime использует функции jsx/jsxs
- Есть ограничения, например: для CSS-класса DOM-элемента используется className; это соглашение [React DOM](rendering.md), а не запрет зарезервированного слова в объекте
- Соседние JSX-теги в одном выражении оборачивают контейнером или фрагментом. Компонент также может вернуть массив элементов, строку, число или null
  - есть искусственный тег `<React.Fragment></React.Fragment>`, либо более привычный синтаксис `<></>` (если мы хотим задать какой-то атрибут, например, key, то нужно указывать `<React.Fragment></React.Fragment>`, а не пустой тег)

Пример:

```jsx
function Greeting({ name }) {
  return (
    <>
      <h1 className="title">Привет, {name}</h1>
      <p>Добро пожаловать</p>
    </>
  );
}
// <Greeting name="Анна" /> описывает заголовок и абзац внутри Fragment.
```

Документация: [JSX](https://react.dev/learn/writing-markup-with-jsx).

### TSX

- является расширением JSX, предназначенным специально для [TypeScript](../typescript/fundamentals.md)
- Добавляет статическую типизацию
- Добавляет все возможности TypeScript ([дженерики](../typescript/advanced.md), утилити типы и т. п.)
- Типизация помогает находить ошибки до запуска программы.

Пример:

```tsx
import { Fragment } from "react";
type Props = { name: string };
function Greeting({ name }: Props) {
  return (
    <>
      <h1 className="title">Привет, {name}</h1>
      <p>JSX с типами</p>
    </>
  );
}
function List() {
  return ["Анна", "Иван"].map((name) => (
    <Fragment key={name}>
      <Greeting name={name} />
    </Fragment>
  ));
}
// <Greeting name={42} />; // Ошибка TypeScript: ожидается string
```

## JSX

### Что такое JSX?

JSX — расширение синтаксиса JavaScript для описания разметки. Классическое преобразование использует `React.createElement`, автоматическое — функции из `react/jsx-runtime`. Способ преобразования зависит от настроек сборки.

```jsx
import { createElement } from "react";
const jsxElement = <button className="primary">Нажмите</button>;
// Эквивалент при классическом преобразовании:
const element = createElement("button", { className: "primary" }, "Нажмите");
// Оба выражения описывают кнопку; сами по себе они не вставляют её в DOM.
```

Документация: [JSX](https://react.dev/learn/writing-markup-with-jsx), [преобразование JSX](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

### Можно ли использовать React без JSX?

Да. `createElement()` создаёт React-элементы без JSX.

```javascript
import { createElement } from "react";
import { createRoot } from "react-dom/client";

function Hello({ name }) {
  return createElement("p", null, `Привет, ${name}`);
}

createRoot(document.getElementById("root")).render(
  createElement(Hello, { name: "Анна" }),
);
// На странице: «Привет, Анна».
```

Документация: [createElement](https://react.dev/reference/react/createElement), [createRoot](https://react.dev/reference/react-dom/client/createRoot).
