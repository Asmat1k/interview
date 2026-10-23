---
sidebar_position: 4
format: md
---

# Взаимодействие компонентов и Context

## Взаимодействие компонентов

### Как передать данные от родителя ребёнку?

Через props. Значение в кавычках — строка; выражение в фигурных скобках сохраняет свой тип.

```jsx
function Profile({ name, age }) {
  return (
    <p>
      {name}: {age + 1}
    </p>
  );
}

function App() {
  return <Profile name="Анна" age={20} />;
}
// На странице: «Анна: 21». При age="20" получилось бы «Анна: 201».
```

Документация: [props](https://react.dev/learn/passing-props-to-a-component).

### Как передать данные от ребёнка родителю?

Родитель передаёт callback, ребёнок вызывает его с новым значением. Родитель обновляет состояние и передаёт новые props.

```jsx
import { useState } from "react";

function Child({ onChoose }) {
  return <button onClick={() => onChoose("Анна")}>Выбрать Анну</button>;
}

function Parent() {
  const [name, setName] = useState("Никто");

  return (
    <>
      <p>{name}</p>
      <Child onChoose={setName} />
    </>
  );
}
// Клик меняет текст родителя с «Никто» на «Анна».
```

Документация: [поднятие состояния](https://react.dev/learn/sharing-state-between-components).

### Что такое Prop drilling?

Это передача props через промежуточные компоненты, которым данные не нужны. Такой поток данных явный и сам по себе не является ошибкой. При большой глубине можно пересмотреть расположение состояния, использовать композицию через `children` или Context. Prop drilling не означает автоматически лишние [рендеры](rendering.md).

```jsx
function App() {
  return <Layout name="Анна" />;
}

function Layout({ name }) {
  return <Profile name={name} />;
}

function Profile({ name }) {
  return <p>{name}</p>;
}
// Layout только передаёт name дальше.
```

Документация: [Context и альтернативы](https://react.dev/learn/passing-data-deeply-with-context).

### Может ли компонент изменять свои props?

Нет. Props — снимки входных данных; нельзя мутировать и переданные [объекты](../javascript/objects-arrays.md). Для изменения данных родителя вызывают callback. Собственное состояние обновляют через setter или `setState()`.

```jsx
function Editor({ user, onChange }) {
  return (
    <button onClick={() => onChange({ ...user, name: "Иван" })}>
      Переименовать
    </button>
  );
}
// Создаём новый объект, затем родитель передаст его как user.
// user.name = 'Иван' нарушило бы правило неизменяемости props.
```

Документация: [неизменяемость props и state](https://react.dev/reference/rules/components-and-hooks-must-be-pure).

### Как передать данные между соседними компонентами?

Поднимите общее состояние в ближайшего общего родителя и передайте данные и обработчики через props.

```jsx
import { useState } from "react";

function Input({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function Preview({ text }) {
  return <p>{text}</p>;
}

function App() {
  const [text, setText] = useState("Привет");

  return (
    <>
      <Input value={text} onChange={setText} />
      <Preview text={text} />
    </>
  );
}
// Ввод в Input сразу отображается в соседнем Preview.
```

Документация: [поднятие состояния](https://react.dev/learn/sharing-state-between-components).

## Context

### Чем Context API отличается от Prop drilling?

Context передаёт данные потомкам без промежуточных props. `useContext()` читает ближайший провайдер выше по дереву, а без него — `defaultValue`. Изменяемое значение обычно хранится в [state](components-state.md) провайдера.

```jsx
import { createContext, useContext, useState } from "react";
const Theme = createContext("light");

function Label() {
  return <p>Тема: {useContext(Theme)}</p>;
}

function Layout() {
  return <Label />;
}

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <Theme.Provider value={theme}>
      <Layout />
      <button
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        Сменить тему
      </button>
    </Theme.Provider>
  );
}
// Layout не передаёт тему; Label получает её из Context.
```

Документация: [useContext](https://react.dev/reference/react/useContext).

### Когда Context излишен?

Если достаточно props или композиции, Context усложнит решение. Изменение value по `Object.is` обновляет потребителей, даже обёрнутых в `memo()`. Для производительности можно разделить контексты и стабилизировать value. Запрета на часто меняющиеся данные нет.

```jsx
function Layout({ children }) {
  return <main>{children}</main>;
}

function Profile({ name }) {
  return <p>{name}</p>;
}

function App() {
  return (
    <Layout>
      <Profile name="Анна" />
    </Layout>
  );
}
// Композиция позволяет передать готовый элемент без Context и промежуточного name.
```

Документация: [Context и альтернативы](https://react.dev/learn/passing-data-deeply-with-context).
