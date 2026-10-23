---
sidebar_position: 5
format: md
---

# Объекты браузера и навигация

## JavaScript в браузере

### Глобальный объект window

`window` представляет окно или вкладку с документом и предоставляет доступ к `document`, навигации, таймерам и другим браузерным API. Например, `window.document` — текущий DOM. У каждого iframe есть собственный `window`; доступ между окнами ограничивается политикой одинакового источника.

Документация: [MDN — Window](https://developer.mozilla.org/en-US/docs/Web/API/Window).

- **Описание:** В контексте страницы глобальный объект представлен Window (window); в веб-воркерах window отсутствует. globalThis даёт общий способ доступа к глобальному this.

Пример:

```javascript
console.log(window === globalThis); // true в контексте страницы
window.setTimeout(() => console.log("таймер"), 0);
// В worker используйте globalThis: объекта window там нет.
```

### Location

`window.location` содержит текущий URL. Присваивание `location.href` или вызов `assign()` запускает навигацию.

`assign()` позволяет затем вернуться назад к исходной странице, а `replace()` убирает её из текущей позиции истории — это полезно, например, после перенаправления. `reload()` перезагружает текущую страницу. Для изменения URL без загрузки нового документа используют History API.

Пример:

```javascript
console.log(window.location.href); // текущий URL
// Следующие вызовы запускают навигацию:
// location.assign('/profile'); // добавляет запись истории
// location.replace('/login'); // заменяет текущую запись
```

Документация: [MDN: Location](https://developer.mozilla.org/ru/docs/Web/API/Location).

### Состав URL в Location

Для адреса `https://example.com:8080/catalog?page=2#reviews`: `protocol` — `https:`, `hostname` — `example.com`, `port` — `8080`, `pathname` — `/catalog`, `search` — `?page=2`, `hash` — `#reviews`. `origin` объединяет протокол, хост и порт, а `href` содержит полный адрес.

Параметры запроса удобно разбирать через `new URL(location.href).searchParams`, чтобы учитывать кодирование значений.

Документация: [MDN — Location](https://developer.mozilla.org/en-US/docs/Web/API/Location).

```javascript
console.log(location.href, location.origin, location.protocol);
console.log(location.hostname, location.port, location.pathname);
console.log(location.search, location.hash);
```

### History API

History API управляет историей текущей вкладки. `back()`, `forward()` и `go()` перемещают по записям. `pushState()` добавляет запись, а `replaceState()` обновляет текущую; оба могут менять URL в пределах origin без перезагрузки документа.

Эти методы сами не обновляют интерфейс: приложение должно сделать это отдельно. При переходах назад и вперёд обрабатывают `popstate` и восстанавливают представление по URL или `event.state`. Сам вызов `pushState()` или `replaceState()` событие `popstate` не вызывает.

Документация: [MDN — History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

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

### Navigator

`navigator` даёт доступ к сведениям о среде и возможностям браузера: например, `language` содержит предпочитаемый язык, а `clipboard` предоставляет API буфера обмена. Отдельные возможности требуют HTTPS и разрешения пользователя.

`userAgent` можно использовать для диагностики, но он не гарантирует наличие конкретной функции. Для выбора поведения проверяйте нужный API непосредственно, например `"geolocation" in navigator`.

Документация: [MDN — Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator).

```javascript
console.log(navigator.userAgent);
```

### Cookies

Cookie связывает запросы с данными браузерной сессии, например с авторизацией или языком интерфейса. Сервер задаёт её через `Set-Cookie`; JavaScript может управлять доступными странице cookie через `document.cookie`.

Чтение возвращает строку пар «имя — значение», а присваивание меняет одну cookie. Cookie с `HttpOnly` недоступны JavaScript. Атрибуты срока действия и отправки разобраны в разделе [хранения данных](storage.md#куки-documentcookie).

Документация: [MDN — Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies).

```javascript
document.cookie = "username=John Doe";

let cookies = document.cookie;

console.log(cookies);
```
