---
sidebar_position: 7
format: md
---

# Маршрутизация

## Роутинг React

- Роутинг — сопоставление [URL](../web/browser-api.md) и интерфейса. React сам по себе не включает маршрутизатор; для этого используют фреймворк или библиотеку, например React Router. Клиентская навигация позволяет обновлять представление без полной перезагрузки документа.

Пример:

```jsx
// Нужен пакет react-router; пример декларативного API.
import { BrowserRouter, Link, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link> <Link to="/about">О проекте</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Главная</h1>} />
        <Route path="/about" element={<h1>О проекте</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
// Link меняет URL и интерфейс без полной перезагрузки.
// Для прямого открытия /about сервер должен отдавать HTML приложения.
```

Документация: [React Router: декларативный роутинг](https://reactrouter.com/start/declarative/routing).
