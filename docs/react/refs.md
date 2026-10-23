---
sidebar_position: 5
format: md
---

# Refs

## Ref

### Чем ref отличается от state?

Оба сохраняют значения между рендерами. Изменение `ref.current` не запрашивает [рендер](rendering.md); setter состояния запрашивает обновление. Данные для отображения храните в [state](components-state.md).

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
