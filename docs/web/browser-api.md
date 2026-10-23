---
sidebar_position: 5
format: md
---

# Объекты браузера и навигация

## JavaScript в браузере

### Глобальный объект window

- **Описание:** В контексте страницы глобальный объект представлен Window (window); в веб-воркерах window отсутствует. globalThis даёт общий способ доступа к глобальному this.

Пример:

```javascript
console.log(window === globalThis); // true в контексте страницы
window.setTimeout(() => console.log("таймер"), 0);
// В worker используйте globalThis: объекта window там нет.
```

### Location

- `window.location` — объект Location с текущим URL; присваивание location.href или вызов assign() запускает навигацию. replace() заменяет текущую запись истории.

Пример:

```javascript
console.log(window.location.href); // текущий URL
// Следующие вызовы запускают навигацию:
// location.assign('/profile'); // добавляет запись истории
// location.replace('/login'); // заменяет текущую запись
```

Документация: [MDN: Location](https://developer.mozilla.org/ru/docs/Web/API/Location).

### Состав URL в Location

```javascript
console.log(location.href, location.origin, location.protocol);
console.log(location.hostname, location.port, location.pathname);
console.log(location.search, location.hash);
```

### History API

- **API истории:**
  ```javascript
  // Каждый вызов выполняйте отдельно: он запускает навигацию по истории.
  // window.history.back();
  // window.history.forward();
  // window.history.go(-1);
  const url = new URL(location.href);

  url.searchParams.set("page", "2");
  history.pushState({ page: 2 }, "", url);
  console.log(history.state.page); // 2: URL изменился без перезагрузки
  history.replaceState({ page: 3 }, "", location.href);
  console.log(history.state.page); // 3: текущая запись заменена
  ```

Документация: [History](https://developer.mozilla.org/ru/docs/Web/API/History).

### Navigator

- **Интерфейс Navigator:** Используется для получения информации о браузере и платформе.
  ```javascript
  console.log(navigator.userAgent);
  ```

Документация: [Navigator](https://developer.mozilla.org/ru/docs/Web/API/Navigator).

### Cookies

- **Работа с [куки](storage.md):**
  ```javascript
  document.cookie = "username=John Doe";

  let cookies = document.cookie;

  console.log(cookies);
  ```
