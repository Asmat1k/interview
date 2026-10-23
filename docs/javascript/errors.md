---
sidebar_position: 11
format: md
---

# Исключения и обработка ошибок

## Ошибки JavaScript

Документация: [обработка ошибок](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Control_flow_and_error_handling).

### Исключения: `throw` и `Error`

- **throw:** Инструкция `throw` генерирует исключение.

  ```javascript
  throw new Error("Что-то пошло не так");
  ```

- **Error class:** Конструктор `Error` создаёт объект ошибки.
  ```javascript
  let error = new Error("Ошибка");

  console.log(error.message); // 'Ошибка'
  ```

### try...catch

- **try..catch:** Блок `catch` перехватывает исключения, возникшие при выполнении try. Ошибки будущих колбэков таймеров он не перехватит; отклонение [промиса](async.md) нужно await внутри try или обработать через catch().
  ```javascript
  try {
    JSON.parse("не JSON"); // SyntaxError
  } catch (e) {
    console.log(e.message);
  }
  ```

### Обработка ошибок

- **Обработка ошибок:**

Пример:

```javascript
function parseUser(text) {
  const user = JSON.parse(text);

  if (typeof user.name !== "string") throw new Error("Не задано имя");

  return user;
}

try {
  parseUser('{"age":25}');
} catch (error) {
  console.error(error.message);
} // "Не задано имя"
```

- `try..catch`

- `throw`

### Error

- **Конструктор Error:** Создаёт объект ошибки.
  ```javascript
  let error = new Error("Ошибка");

  console.log(error.message); // 'Ошибка'
  ```

### Логирование ошибок

- **Логирование ошибок:**

Пример:

```javascript
console.log("Обычное сообщение");
console.info("Информация");
console.warn("Предупреждение");
console.error("Ошибка", new Error("Нет данных"));
```

- `console.log()`

- `console.info()`

- `console.error()`

- `console.warn()`

### Ошибки в асинхронном коде

- **Обработка ошибок в асинхронном коде:** Использование `try..catch` с `async/await`.
  ```javascript
  async function fetchData() {
    try {
      let response = await fetch("/api/data");

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      let data = await response.json();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
  ```
