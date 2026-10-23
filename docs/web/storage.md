---
sidebar_position: 7
format: md
---

# Хранение данных в браузере

## Хранение данных в браузере

### `localStorage` и `sessionStorage`

- Ключи и значения Web Storage сохраняются как строки; переданные другие типы преобразуются к строке.
- Web Storage обычно ограничено 5 MiB для localStorage и 5 MiB для sessionStorage на источник; доступ может быть запрещён, а превышение квоты вызывает QuotaExceededError.
- Хранилище привязано к источнику (домен/протокол/порт). Это значит, что разные протоколы или поддомены определяют разные объекты хранилища, и они не могут получить доступ к данным друг друга.
- Имеют одинаковые методы:
  - `setItem(key, value)` – сохранить пару ключ/значение.
  - `getItem(key)` – получить данные по ключу key.
  - `removeItem(key)` – удалить данные с ключом key.
  - `clear()` – удалить всё.
  - `key(index)` – получить ключ на заданной позиции.
  - `length` – количество элементов в хранилище.
  - Для перебора ключей можно использовать length и key(index); Object.keys(storage) также возвращает ключи собственных перечисляемых свойств.
- `localStorage`
  - Этот объект один на все вкладки и окна в рамках источника (один и тот же домен/протокол/порт).
  - У данных нет встроенного срока действия; обычно сохраняются после перезапуска, но могут быть удалены пользователем, политикой браузера или в конце приватной сессии.
- `sessionStorage`
  - sessionStorage существует только в рамках текущей вкладки браузера.
    - У другой вкладки отдельное хранилище; при наличии opener оно первоначально копируется из открывшей вкладки, после чего изменения независимы.
    - Но оно разделяется между ифреймами на той же вкладке (при условии, что они из одного и того же источника).
  - Данные переживают перезагрузку. Закрытие вкладки завершает сессию; при восстановлении сессии браузер может восстановить и данные.

![хранилища](../../img/telegram-cloud-photo-size-2-5471930121020628825-y.jpg)

:::info[Режим браузера имеет значение]

Таблица описывает обычный режим браузера. В приватном режиме localStorage очищается после закрытия последней приватной вкладки; восстановление сессии может восстановить sessionStorage. Копирование из opener не создаёт общего хранилища между вкладками.

:::

Пример:

```javascript
localStorage.setItem("interview:theme", "dark");
sessionStorage.setItem("interview:step", "2");
console.log(localStorage.getItem("interview:theme")); // "dark"
console.log(sessionStorage.getItem("interview:step")); // "2"
localStorage.removeItem("interview:theme");
sessionStorage.removeItem("interview:step");
```

Документация: [MDN — Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

### Куки, document.cookie

- Куки – это небольшие строки данных, которые хранятся непосредственно в браузере. Они являются частью HTTP-протокола
- Обычный предел одной cookie — около 4 KiB; точные ограничения зависят от браузера
- Сервер устанавливает cookie через Set-Cookie. Браузер отправляет подходящие cookie в Cookie с учётом Domain, Path, Secure, SameSite, срока действия, credentials запроса и политики сторонних cookie.
- Чтение

```js
alert(document.cookie);
```

- Запись
  - Одна запись document.cookie устанавливает одну доступную cookie; замена требует совпадения имени, домена и пути. Другие cookie не изменяются.

```js
document.cookie = "user=John"; // устанавливаем user для текущих домена и пути по умолчанию
alert(document.cookie);
```

- Атрибуты куки:
  - Expires/Max-Age: Определяют время жизни куки.
  - Secure: ограничивает отправку защищённым соединением (браузеры делают исключение для localhost).
  - HttpOnly: запрещает чтение/изменение cookie через document.cookie; браузер продолжает отправлять её с подходящими запросами, включая fetch.
  - SameSite: ограничивает отправку в межсайтовом контексте (site отличается от origin); SameSite=None требует Secure. Это один из механизмов снижения риска CSRF.

Документация: [MDN — cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies).

### IndexedDB

IndexedDB — асинхронное хранилище структурированных данных.

Пример:

```javascript
// Выполните на HTTP(S)-странице с разрешённым доступом к Web Storage.
localStorage.setItem("interview:theme", "dark");
console.log(localStorage.getItem("interview:theme")); // "dark"
console.log(localStorage.length, localStorage.key(0)); // число записей и первый ключ

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  console.log(key, localStorage.getItem(key));
}

localStorage.removeItem("interview:theme");
sessionStorage.setItem("interview:draft", JSON.stringify({ text: "Черновик" }));
console.log(JSON.parse(sessionStorage.getItem("interview:draft")).text); // "Черновик"
sessionStorage.removeItem("interview:draft");
// localStorage.clear(); // удаляет ВСЕ записи данного хранилища
// sessionStorage.clear(); // применяйте только при намеренном полном сбросе
// Cookie: Max-Age задаёт срок, Path — путь, SameSite — межсайтовую отправку.
document.cookie = "interviewTheme=dark; Max-Age=3600; Path=/; SameSite=Lax";
console.log(document.cookie); // доступные JavaScript cookie
// На HTTPS можно добавить Secure; HttpOnly задаётся только сервером.
document.cookie = "interviewTheme=; Max-Age=0; Path=/"; // удаление
```

Пример IndexedDB:

```javascript
const request = indexedDB.open("interview-example", 1);

request.onupgradeneeded = () =>
  request.result.createObjectStore("notes", { keyPath: "id" });
request.onsuccess = () => {
  const db = request.result;
  const write = db.transaction("notes", "readwrite");

  write.objectStore("notes").put({ id: 1, text: "Заметка" });
  write.oncomplete = () => {
    const read = db.transaction("notes").objectStore("notes").get(1);

    read.onsuccess = () => {
      console.log(read.result.text);
      db.close();
    }; // "Заметка"
  };
};
request.onerror = () => console.error(request.error);
```

## Web Storage API и cookies

Документация: [cookie](https://developer.mozilla.org/ru/docs/Web/HTTP/Guides/Cookies).

### Cookies

- **Описание Cookies:**
  ```javascript
  document.cookie = "username=John Doe";

  let cookies = document.cookie;

  console.log(cookies);
  ```

### Различия localStorage, sessionStorage и cookies

- **Различия:**
  - **localStorage:** Хранилище строк по origin без встроенного срока истечения; данные могут быть удалены пользователем или браузером.
  - **sessionStorage:** Изолировано по origin и вкладке (контексту верхнего уровня); переживает перезагрузку и обычно очищается при закрытии вкладки.
  - **cookies:** Бывают сеансовыми и постоянными (Expires/Max-Age). Отправляются только с подходящими запросами с учётом домена, пути, Secure, SameSite и credentials; HttpOnly недоступны через document.cookie. Web Storage автоматически с запросами не отправляется.

Пример:

```javascript
// Браузерная страница на HTTP(S); доступ к хранилищам должен быть разрешён.
localStorage.setItem("theme", "dark");

sessionStorage.setItem("draft", JSON.stringify({ text: "Черновик" }));

console.log(localStorage.getItem("theme")); // "dark"

console.log(JSON.parse(sessionStorage.getItem("draft")).text); // "Черновик"

document.cookie = "theme=dark; Path=/; SameSite=Lax";
// Cookie может отправляться серверу; значения Web Storage — только явно.
localStorage.removeItem("theme");
sessionStorage.removeItem("draft");
```

Документация: [localStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage).

Документация: [sessionStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/sessionStorage).
