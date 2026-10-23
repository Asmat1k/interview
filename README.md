# interview

Материалы для подготовки к собеседованиям по frontend-разработке. Содержание организовано по предметам, а не по исходным спискам вопросов.

Начните с [правил работы с примерами](docs/intro.md).

## Веб-платформа

- [HTML и доступность](docs/web/html.md)
- [CSS: каскад и раскладка](docs/web/css.md)
- [DOM и события](docs/web/dom-events.md)
- [Загрузка и отрисовка страницы](docs/web/rendering.md)
- [Объекты браузера и навигация](docs/web/browser-api.md)
- [HTTP и сетевые запросы](docs/web/network.md)
- [Хранение данных в браузере](docs/web/storage.md)

## JavaScript

- [Типы данных и примитивы](docs/javascript/types.md)
- [Операторы, сравнение и преобразование типов](docs/javascript/operators.md)
- [Переменные и области видимости](docs/javascript/variables-scope.md)
- [Функции и аргументы](docs/javascript/functions.md)
- [Замыкания и лексическое окружение](docs/javascript/closures.md)
- [Объекты, массивы и ссылки](docs/javascript/objects-arrays.md)
- [Map, Set и слабые коллекции](docs/javascript/collections.md)
- [Контекст this и привязка функций](docs/javascript/this.md)
- [Прототипы, наследование и классы](docs/javascript/prototypes-classes.md)
- [Модули JavaScript](docs/javascript/modules.md)
- [Исключения и обработка ошибок](docs/javascript/errors.md)
- [Promise, async/await и Event Loop](docs/javascript/async.md)
- [Полифилы и совместимость](docs/javascript/polyfills.md)

## TypeScript

- [Основы системы типов](docs/typescript/fundamentals.md)
- [Дженерики и преобразование типов](docs/typescript/advanced.md)

## React

- [JSX и TSX](docs/react/jsx.md)
- [React DOM и рендеринг](docs/react/rendering.md)
- [Компоненты, состояние и жизненный цикл](docs/react/components-state.md)
- [Взаимодействие компонентов и Context](docs/react/communication.md)
- [Refs](docs/react/refs.md)
- [Redux](docs/react/redux.md)
- [Маршрутизация](docs/react/routing.md)

## Проектирование и инструменты

- [ООП и принципы чистого кода](docs/engineering/principles.md)
- [Паттерны проектирования](docs/engineering/patterns.md)
- [Сборка и проверка кода](docs/engineering/tooling.md)

## AI в разработке

- [Основы AI и языковых моделей](docs/ai/fundamentals.md)
- [Работа с AI в повседневной разработке](docs/ai/development-workflow.md)
- [Агенты, инструменты и MCP](docs/ai/agents.md)
- [Безопасность и проверка AI](docs/ai/safety-and-evaluation.md)
- [Разработка AI-функций](docs/ai/ai-features.md)
- [AI на собеседовании: вопросы и практика](docs/ai/interviews.md)

## Практика

- [Учебные реализации встроенных методов](docs/practice/implementations.md)

## Редактирование и публикация

Новая тема добавляется в соответствующий раздел `docs/`. Названия файлов и каталогов служат стабильными идентификаторами; порядок задают `sidebar_position` и `_category_.json`. Примеры и пояснения из исходных подборок сохранены вместе по теме; пересекающиеся объяснения пока не сокращены.

## Локальный запуск

Требуется Node.js 22 (версия указана в `.nvmrc`).

```sh
npm ci
npm start
```

Проверка production-сборки и её локальный просмотр:

```sh
npm run build
npm run serve
```

Поиск работает в production-сборке (`npm run build` → `npm run serve`), а не в dev-сервере. Локальный индекс создаётся при каждой сборке из документации; поддерживаются русский и английский языки. Поле поиска в шапке доступно по Ctrl+K (⌘K на macOS).

## GitHub Pages

Сайт: [interview](https://asmat1k.github.io/interview/).

Workflow `.github/workflows/deploy.yml` проверяет сборку pull request в `main`. Push в `main` или ручной запуск workflow из `main` собирает сайт, обновляет ветку `gh-pages` и публикует тот же результат через GitHub Pages. Публикация выполняется последовательно; pull request не получает доступ к заданию деплоя.

Перед первой публикацией откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**. Источником публикации служит artifact workflow; ветка `gh-pages` дополнительно хранит готовый сайт. Это позволяет публиковать через встроенный `GITHUB_TOKEN`, без personal access token. Убедитесь, что GitHub Actions разрешены в репозитории.

После отправки изменений в `main` следите за workflow **Build and deploy Docusaurus** на вкладке **Actions**. Пока изменения находятся только локально, сайт не обновляется.

В `docusaurus.config.js` заданы `url` и `baseUrl` для `Asmat1k/interview`. При переименовании репозитория или подключении своего домена обновите эти значения.
