---
sidebar_position: 11
format: md
---

# Исключения и обработка ошибок

## Ошибки JavaScript

Документация: [обработка ошибок](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Control_flow_and_error_handling).

### Исключения: `throw` и `Error`

`new Error(message)` создаёт значение ошибки, но само по себе не прерывает выполнение. `throw` прерывает текущий путь и передаёт управление ближайшему подходящему `catch`; если его нет, исключение выходит к вызывающему коду. Обычно выбрасывают объект `Error`, чтобы сохранить сообщение и диагностические сведения.

Документация: [MDN — Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

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

В `try` помещают операцию, которая может завершиться исключением; в `catch` — восстановление, понятное сообщение или повторный `throw`, если обработать ошибку здесь нельзя. Необязательный `finally` выполняет очистку независимо от результата, например освобождает ресурс.

Документация: [MDN — try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).

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

### Error

У ошибки `message` описывает проблему, а `name` — её вид, например `TypeError` или `SyntaxError`. Эти данные помогают различать причины сбоя. Для собственной ошибки можно создать подкласс `Error`; добавление контекста упрощает диагностику.

- **Конструктор Error:** Создаёт объект ошибки.
  ```javascript
  let error = new Error("Ошибка");

  console.log(error.message); // 'Ошибка'
  ```

### Логирование ошибок

Методы `console` выводят сообщения разных уровней: `log` и `info` — общие сведения, `warn` — предупреждения, `error` — ошибки. Уровни помогают фильтровать вывод в инструментах разработчика. Вызов `console.error()` не выбрасывает исключение и не останавливает выполнение программы.

Документация: [MDN — Console](https://developer.mozilla.org/en-US/docs/Web/API/console).

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

Чтобы `catch` перехватил отклонение Promise, ожидайте его через `await` внутри `try` или используйте `.catch()`. В примере проверка `response.ok` превращает HTTP-ошибку в исключение. После логирования функция завершится успешно с `undefined`; если вызывающий код должен узнать о сбое, ошибку нужно выбросить повторно.

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
