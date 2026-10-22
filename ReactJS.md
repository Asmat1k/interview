# Вопросы к собеседованию: React

Примеры независимы друг от друга. JSX требует настроенной сборки и установленных пакетов `react` и `react-dom`. Импорты указаны в каждом примере, где они нужны. В примерах с `createRoot()` в HTML должен быть контейнер `<div id="root"></div>`.

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

## React DOM

### Что такое Virtual DOM?

Virtual DOM — представление интерфейса в памяти. React-элемент описывает тип элемента, props и дочерние элементы; он не является DOM-узлом.

```javascript
import { createElement } from "react";
const element = createElement("p", { className: "note" }, "Привет");
console.log(element.type, element.props.children); // "p", "Привет"
console.log(element instanceof Node); // false в браузере
```

Документация: [Render and Commit](https://react.dev/learn/render-and-commit).

### Как React обновляет интерфейс?

На этапе render React вызывает компоненты и вычисляет интерфейс. На этапе commit он вносит изменения в DOM. Тип, положение и `key` помогают сопоставить компоненты и сохранить их состояние. React не гарантирует математически минимальное число DOM-операций.

```jsx
import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Счёт: {count}</button>;
}
// После клика React вычисляет новый результат и обновляет текст кнопки.
```

Документация: [Render and Commit](https://react.dev/learn/render-and-commit), [сохранение состояния](https://react.dev/learn/preserving-and-resetting-state).

### Чем Virtual DOM отличается от Shadow DOM?

Virtual DOM описывает интерфейс в памяти. Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и стилей веб-компонента. Он не создаёт отдельную область видимости переменных JavaScript.

```javascript
const host = document.createElement("div");
document.body.append(host);
const shadow = host.attachShadow({ mode: "open" });
shadow.innerHTML = "<style>p { color: red; }</style><p>Внутри Shadow DOM</p>";
console.log(host.querySelector("p")); // null
console.log(shadow.querySelector("p").textContent); // "Внутри Shadow DOM"
```

Документация: [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

### Чем React-элемент отличается от DOM-узла?

React-элемент — описание интерфейса, а DOM-узел предоставляет браузерные методы и свойства для работы с документом.

```javascript
import { createElement } from "react";
const description = createElement("p", null, "Привет");
const node = document.createElement("p");
node.textContent = description.props.children;
document.body.append(node); // На странице появляется абзац.
console.log(typeof node.focus, typeof description.focus); // "function", "undefined"
```

Документация: [createElement](https://react.dev/reference/react/createElement).

## Рендеринг

### Когда компонент рендерится?

Первый рендер запускается при отображении корня. Повторный рендер может быть вызван изменением состояния, рендером родителя или изменением используемого контекста. Render вычисляет интерфейс; DOM меняется на этапе commit.

```jsx
import { useState } from "react";
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Child />
    </>
  );
}
function Child() {
  console.log("Child render");
  return <p>Дочерний компонент</p>;
}
// Клик обновляет Parent и обычно вызывает Child снова, хотя текст Child тот же.
```

Документация: [Render and Commit](https://react.dev/learn/render-and-commit).

### Как пропустить рендер при неизменных props?

`memo()` позволяет пропустить рендер, вызванный родителем, если props не изменились. По умолчанию каждый prop сравнивается через `Object.is`. Это оптимизация, а не гарантия; собственное состояние и контекст всё ещё могут вызвать рендер.

```jsx
import { memo, useState } from "react";
const Greeting = memo(function Greeting({ name }) {
  return <p>Привет, {name}</p>;
});
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Greeting name="Анна" />
    </>
  );
}
// При клике name остаётся прежним, поэтому Greeting может пропустить рендер.
```

Документация: [memo](https://react.dev/reference/react/memo).

### Можно ли использовать стрелочные функции при рендеринге?

Да. Каждый рендер создаёт новую функцию. Если передать её компоненту с `memo()`, новая ссылка может помешать пропуску рендера. `useCallback()` полезен, когда такая оптимизация нужна.

```jsx
function Item({ id, onSelect }) {
  return <button onClick={() => onSelect(id)}>Выбрать {id}</button>;
}
// Callback вызывается при клике; onSelect(id) не выполняется во время render.
```

Документация: [useCallback](https://react.dev/reference/react/useCallback).

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

Это передача props через промежуточные компоненты, которым данные не нужны. Такой поток данных явный и сам по себе не является ошибкой. При большой глубине можно пересмотреть расположение состояния, использовать композицию через `children` или Context. Prop drilling не означает автоматически лишние рендеры.

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

Нет. Props — снимки входных данных; нельзя мутировать и переданные объекты. Для изменения данных родителя вызывают callback. Собственное состояние обновляют через setter или `setState()`.

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

## Жизненный цикл и состояние

### Чем props отличаются от state?

Props приходят от родителя. State — память экземпляра компонента, которую React сохраняет между рендерами. Setter запрашивает обновление; React может пропустить его при том же значении по `Object.is`.

```jsx
import { useState } from "react";
function Counter({ step }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + step)}>{count}</button>;
}
// <Counter step={2} />: step — prop, count — state; клики дают 0 → 2 → 4.
```

Документация: [useState](https://react.dev/reference/react/useState).

### Как отличается state в классах и функциях?

В классе `this.setState()` поверхностно объединяет обновление с состоянием. Setter `useState()` заменяет значение целиком. В обоих случаях состояние связано с положением компонента в дереве. Для сложных переходов можно использовать `useReducer()`.

```jsx
import { Component, useState } from "react";
class ClassCounter extends Component {
  state = { count: 0, label: "Счёт" };
  render() {
    return (
      <button onClick={() => this.setState((s) => ({ count: s.count + 1 }))}>
        {this.state.label}: {this.state.count}
      </button>
    );
  }
}
function FunctionCounter() {
  const [state, setState] = useState({ count: 0, label: "Счёт" });
  return (
    <button onClick={() => setState((s) => ({ ...s, count: s.count + 1 }))}>
      {state.label}: {state.count}
    </button>
  );
}
// В функции spread сохраняет label; в классе объединение делает setState.
```

Документация: [Component](https://react.dev/reference/react/Component), [useState](https://react.dev/reference/react/useState), [useReducer](https://react.dev/reference/react/useReducer).

### Что такое жизненный цикл компонента?

Компонент монтируется, обновляется и размонтируется. У классов есть методы для реакции на эти этапы. Эффекты в функциях описывают синхронизацию с внешними системами и имеют собственный цикл запуска и очистки.

```jsx
import { Component } from "react";
class Status extends Component {
  componentDidMount() {
    console.log("Смонтирован");
  }
  componentDidUpdate() {
    console.log("Обновлён");
  }
  componentWillUnmount() {
    console.log("Размонтирован");
  }
  render() {
    return <p>{this.props.text}</p>;
  }
}
// Появление, изменение text и удаление Status вызывают соответствующие методы.
// В Strict Mode при разработке возможен дополнительный цикл монтирования и очистки.
```

Документация: [Component](https://react.dev/reference/react/Component), [жизненный цикл эффектов](https://react.dev/learn/lifecycle-of-reactive-effects).

### Как эффекты связаны с жизненным циклом?

`useEffect()` запускает синхронизацию после commit. При изменении зависимостей React вызывает прежнюю очистку и новый setup; при размонтировании — очистку. Без массива зависимостей эффект выполняется после каждого commit компонента, с `[]` — при монтировании. В Strict Mode при разработке есть дополнительный цикл setup → cleanup → setup. Эффекты работают только на клиенте и не являются точной заменой методов класса.

```jsx
import { useEffect } from "react";
function PageTitle({ title }) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
  return <h1>{title}</h1>;
}
// Новый title запускает очистку и повторный эффект; удаление возвращает прежний заголовок.
```

Документация: [useEffect](https://react.dev/reference/react/useEffect).

## Ref

### Чем ref отличается от state?

Оба сохраняют значения между рендерами. Изменение `ref.current` не запрашивает рендер; setter состояния запрашивает обновление. Данные для отображения храните в state.

```jsx
import { useRef, useState } from "react";
function Counter() {
  const clicks = useRef(0);
  const [visible, setVisible] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          clicks.current++;
        }}
      >
        Считать в ref
      </button>
      <button onClick={() => setVisible(clicks.current)}>
        Показать: {visible}
      </button>
    </>
  );
}
// Первая кнопка меняет ref без обновления экрана; вторая копирует число в state.
```

Документация: [useRef](https://react.dev/reference/react/useRef).

### Когда полезны refs?

Для управления фокусом, выделением, медиа и императивной анимацией, интеграции с DOM-библиотеками и хранения данных, не участвующих в рендеринге.

```jsx
import { useRef } from "react";
function Search() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} aria-label="Поиск" />
      <button onClick={() => inputRef.current.focus()}>Перейти к поиску</button>
    </>
  );
}
// Клик переводит фокус в поле ввода.
```

Документация: [useRef](https://react.dev/reference/react/useRef).

### Как обновлять ref в функциональном компоненте?

Присваивайте `ref.current` в обработчике или эффекте. Не читайте и не меняйте его во время render, кроме предсказуемой инициализации. DOM-ссылку через prop `ref` устанавливает сам React.

```jsx
import { useRef } from "react";
function SaveTime() {
  const lastSaved = useRef(null);
  return (
    <button
      onClick={() => {
        lastSaved.current = Date.now();
        console.log(lastSaved.current); // время последнего клика
      }}
    >
      Запомнить время
    </button>
  );
}
```

Документация: [useRef](https://react.dev/reference/react/useRef).

## Context

### Чем Context API отличается от Prop drilling?

Context передаёт данные потомкам без промежуточных props. `useContext()` читает ближайший провайдер выше по дереву, а без него — `defaultValue`. Изменяемое значение обычно хранится в state провайдера.

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

## Redux

### Каковы основные принципы Redux?

Общее состояние Redux хранится в одном store. Внешний код описывает изменения через actions и `dispatch()`. Чистые reducers вычисляют следующее состояние. Локальное состояние компонентов можно оставлять в React. Redux Toolkit использует Immer, поэтому запись в draft не мутирует предыдущее состояние.

```javascript
import { configureStore, createSlice } from "@reduxjs/toolkit";
const counter = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value++;
    },
  }, // изменение draft через Immer
});
const store = configureStore({ reducer: counter.reducer });
const previous = store.getState();
store.dispatch(counter.actions.increment());
console.log(previous.value, store.getState().value); // 0, 1
```

Документация: [три принципа](https://redux.js.org/understanding/thinking-in-redux/three-principles), [Immer в reducers](https://redux.js.org/toolkit/usage/immer-reducers).

### Как данные проходят через React и Redux?

Компонент вызывает `dispatch(action)`. Middleware передают action дальше, reducer вычисляет состояние, store уведомляет подписчиков. `useSelector()` запрашивает рендер, если выбранный результат изменился (по умолчанию сравнение `===`).

```jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: { increment: (state) => state + 1 },
});
const store = configureStore({ reducer: counter.reducer });
function Counter() {
  const value = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(counter.actions.increment())}>
      {value}
    </button>
  );
}
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
// Клик: dispatch → reducer → store → useSelector → новый текст кнопки.
```

Документация: [поток данных](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow), [useSelector](https://react-redux.js.org/api/hooks#useselector).

### Какие преимущества даёт Redux?

Redux централизует общее состояние, делает переходы явными и предоставляет инструменты отладки, включая Redux DevTools. Эти преимущества полезны при сложном общем состоянии; библиотека добавляет концепции и код и нужна не каждому приложению.

```javascript
import { configureStore, createSlice } from "@reduxjs/toolkit";
const cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    added: (state, action) => {
      state.push(action.payload);
    },
  },
});
const store = configureStore({ reducer: { cart: cart.reducer } });
store.dispatch(cart.actions.added({ id: 1, title: "Книга" }));
console.log(store.getState().cart); // [{ id: 1, title: 'Книга' }]
// В Redux DevTools можно увидеть action cart/added и изменение состояния.
```

Документация: [когда нужен Redux](https://redux.js.org/faq/general).
