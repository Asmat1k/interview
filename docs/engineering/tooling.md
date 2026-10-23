---
sidebar_position: 3
format: md
---

# Сборка и проверка кода

## Сборщики: webpack, loaders и plugins

- **Сборщики** (бандлеры) – это инструменты, которые помогают объединять и управлять [модулями](../javascript/modules.md) и зависимостями в проекте. Они особенно полезны в больших проектах, где есть множество файлов JavaScript, стилей и других ресурсов.
  - Entry point — точка, с которой сборщик начинает строить граф зависимостей; точек входа может быть несколько, и не все файлы проекта обязательно входят в граф. Обычно таким файлом является index.js или main.js
  - Output — настройки места и имён выходных файлов; сборка может создавать несколько JS-чанков, [CSS](../web/css.md) и других ресурсов
- **Loaders** - это функции, преобразующие и адаптирующие файлы заданного типа для дальнейшего их добавления в output файлы (определяют то, как будут выглядеть входящие файлы / код)
- **Plugins** подключаются к этапам всего жизненного цикла сборки, а не только после неё. webpack понимает JavaScript и JSON; loaders преобразуют другие типы модулей.

Источник: [webpack — Concepts](https://webpack.js.org/concepts/).

Пример:

```javascript
// webpack.config.cjs; нужны webpack, webpack-cli, css-loader и style-loader.
const path = require("node:path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // начало графа зависимостей
  output: { path: path.resolve(__dirname, "dist"), filename: "bundle.js" },
  module: { rules: [{ test: /\.css$/i, use: ["style-loader", "css-loader"] }] },
  plugins: [new webpack.DefinePlugin({ APP_VERSION: JSON.stringify("1.0.0") })],
};
// В src/index.js: import './styles.css'; console.log(APP_VERSION);
// Loaders преобразуют CSS; plugin подставляет константу при сборке.
```

## Линтеры: принцип работы и правила

- Линтеры анализируют исходный код и находят ошибки и нарушения правил проекта.
- ESLint – один из наиболее популярных линтеров для проектов на JavaScript/[TypeScript](../typescript/fundamentals.md)
- Как работает?
  - Парсинг строк исходного кода и построение на его основе AST (абстрактного синтаксического дерева);
  - Запуск и выполнение правил над полученным AST;
  - Отображение результатов анализа.
    ![линтеры работа пример](../../img/telegram-cloud-photo-size-2-5197575358273150607-y.jpg)

Источник: [ESLint — парсеры и AST](https://eslint.org/docs/latest/extend/custom-parsers).

Пример:

```javascript
// eslint.config.mjs; современный flat config.
export default [
  {
    files: ["**/*.js"],
    rules: { "no-unused-vars": "error", eqeqeq: "error" },
  },
];
// Пример проверяемого файла:
// const unused = 1; // no-unused-vars: переменная не используется
// if (1 == '1') {} // eqeqeq: требуется ===
```
