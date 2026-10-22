---
sidebar_position: 2
format: md
---

# React DOM и рендеринг

## Virtual DOM, reconciliation

1. Virtual DOM — представление интерфейса в памяти, связанное с реальным DOM через рендерер React; это не полная копия DOM.
2. Reconciliation сопоставляет элементы по типу, позиции и ключу. При одинаковом типе и позиции состояние обычно сохраняется; другой тип или key сбрасывает состояние соответствующего поддерева.
3. Стабильный key помогает сопоставлять соседние элементы списка при перестановке. Он не гарантирует отсутствие перемонтирования при переносе к другому родителю.
4. Глубокое сравнение пропсов не является общим правилом reconciliation. `memo` по умолчанию сравнивает каждое свойство через `Object.is`.
5. Приоритет обновления определяется срочностью, а не вычислительной сложностью: ввод пользователя может иметь приоритет над переходом. Внутренние Fiber-деревья current/work-in-progress — детали реализации, а не два DOM-дерева.

Источники: [React — сохранение состояния](https://react.dev/learn/preserving-and-resetting-state), [React — memo](https://react.dev/reference/react/memo).

Пример:

```jsx
import { useState } from "react";
function Counter({ name }) {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {name}: {count}
    </button>
  );
}
function App() {
  const [name, setName] = useState("Анна");
  return (
    <>
      <button onClick={() => setName((n) => (n === "Анна" ? "Иван" : "Анна"))}>
        Сменить
      </button>
      <Counter key={name} name={name} />
    </>
  );
}
// Смена key сбрасывает состояние Counter; без key в этой позиции счёт сохранялся бы.
```

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

:::note[Что гарантирует memo]

`memo()` позволяет пропустить рендер, вызванный родителем, если props не изменились. По умолчанию каждый prop сравнивается через `Object.is`. Это оптимизация, а не гарантия; собственное состояние и контекст всё ещё могут вызвать рендер.

:::

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
