---
sidebar_position: 3
format: md
---

# Компоненты, состояние и жизненный цикл

## Функциональные и классовые компоненты

- **Классовые** компоненты пишутся как наследники React.Component
  - у них есть методы для отслеживания жизненного цикла
  - возврат компонента происходит при помощи метода `render`
- Функциональные компоненты основаны на функциях; хуки добавили им состояние и эффекты. Для нового кода React рекомендует функции
  - для управления состоянием используются хуки
  - функция возвращает описание интерфейса через `return` или неявный возврат стрелочной функции

- Дополнительная информация по компонентам
  - Есть **управляемые** и **неуправляемые** компоненты
    1. Управляемый компонент принимает свое текущее значение в качестве пропсов, а также коллбэк для изменения этого значения.

```jsx
<input value={someValue} onChange={handleChange} />
```

    1. Неуправляемые компоненты выглядят как обычная HTML-форма, доступ к данным которой можно получить на submit

```jsx
class Form extends Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}
```

Пример:

```jsx
import { Component, useState } from "react";
class ClassGreeting extends Component {
  render() {
    return <p>Привет, {this.props.name}</p>;
  }
}
function Greeting({ name }) {
  return <p>Привет, {name}</p>;
}
function Form() {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(new FormData(event.currentTarget).get("comment"));
      }}
    >
      <label>
        Имя
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Комментарий
        <input name="comment" defaultValue="Привет" />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
}
// Имя управляется state; неуправляемый comment читается из DOM при submit.
```

## Жизненный цикл классового компонента

- Кратко:
  1. Создание компонента
  2. Монтирование в DOM
  3. Обновление
  4. Размонтирование
- Подробно:
  1. Монтирование (Mounting):
  - constructor(): Вызывается при создании компонента. Используется для инициализации состояния и привязки методов.
  - static getDerivedStateFromProps(): Вызывается перед render при монтировании и каждом обновлении, включая обновления локального состояния. Позволяет обновлять состояние на основе новых свойств.
  - render(): Обязательный метод, который возвращает элементы React для отображения в DOM.
  - componentDidMount(): Вызывается сразу после того, как компонент был вставлен в DOM. Здесь можно выполнять запросы к API и другие инициализационные задачи.
  1. Обновление (Updating):
  - static getDerivedStateFromProps(): Вызывается при обновлении компонента, перед рендерингом. Позволяет обновлять состояние на основе новых свойств.
  - shouldComponentUpdate(): Определяет, нужно ли компоненту перерисовываться. Позволяет оптимизировать производительность.
  - render(): Вызывается для вычисления следующего интерфейса; вызов не означает обязательного изменения DOM.
  - getSnapshotBeforeUpdate(): Читает данные DOM перед его обновлением, возвращённый снимок передаётся в componentDidUpdate.
  - componentDidUpdate(): Вызывается после обновления компонента и обновления DOM. Здесь можно выполнять дополнительные действия после обновления.
  1. Размонтирование (Unmounting):
  - componentWillUnmount(): Вызывается перед тем, как компонент будет удален из DOM. Здесь можно очищать ресурсы, отписываться от событий и т. д.
  1. Обработка ошибок (Error Handling):
  - static getDerivedStateFromError(): Вызывается при возникновении ошибки в методах жизненного цикла ниже в дереве компонентов. Позволяет обновить состояние компонента в ответ на ошибку.
  - componentDidCatch(): Вызывается после возникновения ошибки. Позволяет логировать ошибки или выполнять другие действия по их обработке.

Схема относится к классовым компонентам на клиенте. В Strict Mode при разработке React может дополнительно выполнить цикл componentDidMount → componentWillUnmount → componentDidMount для проверки очистки ресурсов.

![жизненный цикл классового компонента](../../img/telegram-cloud-photo-size-2-5197575358273150275-y.jpg)

Документация: [Component](https://react.dev/reference/react/Component).

Пример:

```jsx
import { Component } from "react";
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = { previous: props.text };
  }
  static getDerivedStateFromProps(props, state) {
    return props.text !== state.previous ? { previous: props.text } : null;
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text;
  }
  componentDidMount() {
    console.log("Монтирование");
  }
  getSnapshotBeforeUpdate() {
    return document.title;
  }
  componentDidUpdate(previousProps, previousState, snapshot) {
    console.log("Обновление", previousProps.text, snapshot);
  }
  componentWillUnmount() {
    console.log("Очистка");
  }
  render() {
    return <p>{this.props.text}</p>;
  }
}
class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }
  render() {
    return this.state.failed ? <p>Ошибка</p> : this.props.children;
  }
}
// <ErrorBoundary><Status text="Готово" /></ErrorBoundary>
// Изменение text вызывает обновление; удаление Status — очистку.
```

## Хуки и методы классовых компонентов

- Хуки:
  - Обычные хуки вызывают на верхнем уровне функционального компонента или пользовательского хука, а не внутри условий, циклов или обработчиков событий.
  - `useState(initValue)` используется для добавления локального состояния
    - Возвращает массив из двух элементов: текущее состояние и функцию обновления. Этот массив не является автоматически неизменяемым; менять состояние нужно через setter.
  - `useEffect(cb, [dep])` позволяет выполнять побочные эффекты (запросы к API, подписки) в функциональных компонентах
    - Выполняется после фиксации изменений DOM; обычно браузер сначала рисует экран, но для эффектов, вызванных взаимодействием, это не гарантируется. Долгий синхронный код эффекта занимает основной поток.
  - `useLayoutEffect(cb, [dep])` имеет такой же функционал и синтаксис, но выполняется после обновления DOM, до следующей отрисовки экрана; это не привязка к внутреннему этапу Layout браузера
    - сначала отрабатывает, а потом отображает страницу
  - Сходства:
    - Если в useEffect не указать зависимости, то эффект будет выполняться после каждого commit компонента
    - Эффекты синхронизируют компонент с внешней системой; cleanup выполняется перед повторным setup при изменении зависимостей и при размонтировании. Это не точная замена методов жизненного цикла. В StrictMode в разработке возможен дополнительный цикл setup/cleanup.
    - Подписки на события очищайте в функции, возвращаемой эффектом.

```ts
useEffect(() => {
  window.addEventListener("scroll", updateSticky);
  return () => {
    window.removeEventListener("scroll", updateSticky);
  };
}, [updateSticky]);
```

- `useContext(context)` читает ближайшее значение контекста от провайдера выше в дереве; контекст сам по себе не является хранилищем состояния
  - `createContext(defaultValue)` создаёт контекст; defaultValue — запасное значение при отсутствии провайдера
  - Нужно обернуть приложение в `myContext.Provider` с value

```tsx
<UserContext.Provider value={user}>
  <MyComponent />
</UserContext.Provider>
```

    - `useContext(context)` — чтение значения контекста.

- `useMemo(func, [dep])` - мемоизирует результат функции, принимает также массив зависимостей (но стоит использовать с умом, при использовании создается функция + массив зависимостей)
- `useCallback(func, [dep])` возвращает сохранённую ссылку на функцию, пока зависимости не изменились. Создание переданного функционального выражения при рендере при этом не предотвращается.
- `useMemo` и `useCallback` — оптимизации производительности; React может сбросить кеш, поэтому от него не должна зависеть корректность программы.
- Стабильная ссылка полезна при передаче callback в дочерний компонент с `memo()`.
- `useRef(initialValue)` возвращает стабильный объект с полем current; изменение current не запускает рендер. Используется для DOM-ссылок и данных между рендерами.
- `memo(component)` позволяет пропускать рендер при неизменных пропсах; это оптимизация, а не гарантия отсутствия рендеров
  - будет сравнивать текущие пропсы компонента с предыдущими. Одинаковые пропсы позволяют пропустить обновление от родителя; собственное состояние и используемый контекст всё равно могут вызвать рендер.
  - используется в компонентах, которые рендерятся часто или получают пропсы, которые редко изменяются.
  - По умолчанию React.memo использует поверхностное сравнение пропсов. Если вам нужно более сложное сравнение, вы можете передать свою функцию сравнения вторым аргументом:

```jsx
function areEqual(prevProps, nextProps) {
  // Сравнение пропсов
  return prevProps.name === nextProps.name;
}

const MyComponent = React.memo(function MyComponent({ name }) {
  console.log("Rendering MyComponent");
  return <div>Hello, {name}!</div>;
}, areEqual);

export default MyComponent;
```

- Сходства:
  1. Использование для управления состоянием:
  - Классовые компоненты: this.state и this.setState() для управления состоянием.
  1. Работа с эффектами:
  - Классовые компоненты используют методы жизненного цикла (componentDidMount(), componentDidUpdate(), componentWillUnmount()).
  1. Работа со ссылками:
  - Классовые компоненты: Работа со ссылками выполняется через React.createRef() и ref атрибуты.
  1. Контекст:
  - Классовые компоненты: Контекст читают через static contextType или Context.Consumer; createContext создаёт объект контекста.

- Отличия
  - Классовые компоненты не используют хуки; для оптимизаций есть PureComponent, shouldComponentUpdate и ручное кеширование.
  - Собственную границу ошибок средствами React реализуют классом с getDerivedStateFromError/componentDidCatch; функция может использовать уже готовую границу
    - Используется для отлавливания ошибок (возвращает страницу ошибки), чтобы пользователь при критической ошибке, не смотрел в белый экран
    - Не ловит ошибки обработчиков событий, большинства асинхронных callback, серверного рендеринга и самой границы. Синхронная ошибка, брошенная React при выполнении setup/cleanup эффекта потомка, может быть поймана границей; отклонение отдельного асинхронного запроса нужно обработать явно.
    - Методы:
      - static getDerivedStateFromError(): Вызывается при возникновении ошибки в методах жизненного цикла ниже в дереве компонентов. Позволяет обновить состояние компонента в ответ на ошибку.
      - componentDidCatch(): Вызывается после возникновения ошибки. Позволяет логировать ошибки или выполнять другие действия по их обработке.

Документация: [useState](https://react.dev/reference/react/useState).

Документация: [useEffect](https://react.dev/reference/react/useEffect).

Документация: [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect).

Документация: [useRef](https://react.dev/reference/react/useRef).

Документация: [useContext](https://react.dev/reference/react/useContext).

Документация: [useMemo](https://react.dev/reference/react/useMemo).

Документация: [useCallback](https://react.dev/reference/react/useCallback).

Пример:

```jsx
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
const Theme = createContext("light");
const AddButton = memo(function AddButton({ onAdd }) {
  return <button onClick={onAdd}>Добавить</button>;
});
function Counter() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const theme = useContext(Theme);
  const doubled = useMemo(() => count * 2, [count]);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  useEffect(() => {
    const onResize = () => console.log(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []); // подписка и очистка
  useLayoutEffect(() => {
    console.log(inputRef.current.getBoundingClientRect().width);
  }, []); // измерение после commit, до paint
  return (
    <section data-theme={theme}>
      <label>
        Заметка
        <input ref={inputRef} />
      </label>
      <button onClick={() => inputRef.current.focus()}>Фокус</button>
      <AddButton onAdd={increment} />
      <p>
        {count}; удвоено: {doubled}
      </p>
    </section>
  );
}
function App() {
  return (
    <Theme.Provider value="dark">
      <Counter />
    </Theme.Provider>
  );
}
// useState хранит счёт, useRef — DOM-узел, useContext читает тему.
// useMemo/useCallback сохраняют результат/ссылку; memo может пропустить рендер AddButton.
```

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
