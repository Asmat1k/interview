---
sidebar_position: 6
format: md
---

# Redux

## Redux

### Каковы основные принципы Redux?

Общее состояние Redux хранится в одном store. Внешний код описывает изменения через actions и `dispatch()`. Чистые reducers вычисляют следующее состояние. Локальное [состояние компонентов](components-state.md) можно оставлять в React. Redux Toolkit использует Immer, поэтому запись в draft не мутирует предыдущее состояние.

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

Компонент вызывает `dispatch(action)`. Middleware передают action дальше, reducer вычисляет состояние, store уведомляет подписчиков. `useSelector()` запрашивает [рендер](rendering.md), если выбранный результат изменился (по умолчанию сравнение `===`).

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
