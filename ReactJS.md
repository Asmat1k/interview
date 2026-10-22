# REACT Interview Questions

- #### JSX
    - What is JSX?
      - JSX — расширение синтаксиса JavaScript для описания разметки. При классическом преобразовании JSX превращается в вызовы `React.createElement(component, props, ...children)`; автоматическое преобразование использует функции из `react/jsx-runtime`. Это зависит от настроек компилятора, а не от самого JSX.
      - JSX Элемент
        - ```jsx
          <MyButton color="blue" shadowSize={2}>
            Click Me
          </MyButton>
          ```
      - При классическом преобразовании компилируется в
        - ```javascript
          React.createElement(
              MyButton,
              {color: 'blue', shadowSize: 2},
              'Click Me'
            )
          ```
    - Is it possible to use React without JSX?
      - React можно использовать без JSX, создавая элементы с помощью `createElement`. JSX удобен для записи интерфейса, но не является обязательной частью React. Примеры ниже предполагают установленный React, настроенную сборку и контейнер `<div id="root"></div>` в HTML.
      - Например, вот код с JSX:
        -  ```jsx
            import React from 'react';
            import { createRoot } from 'react-dom/client';

            class Hello extends React.Component {
              render() {
                return <div>Привет, {this.props.toWhat}</div>;
              }
            }

            const root = createRoot(document.getElementById('root'));
            root.render(<Hello toWhat="Мир" />);
            ```
      - Он может быть превращён в код без JSX:
        - ```javascript
          import React from 'react';
          import { createRoot } from 'react-dom/client';

          class Hello extends React.Component {
            render() {
              return React.createElement('div', null, `Привет, ${this.props.toWhat}`);
            }
          }

          const root = createRoot(document.getElementById('root'));
          root.render(React.createElement(Hello, {toWhat: 'Мир'}, null));
          ```

- #### React DOM
  - What is the virtual DOM?
    - Виртуальный DOM (VDOM) — это концепция программирования, в которой «виртуальное» представление пользовательского интерфейса хранится в памяти и синхронизируется с «настоящим» DOM при помощи библиотеки, такой как ReactDOM.
    - React-элементы — объекты, описывающие желаемый интерфейс (тип элемента, props и дочерние элементы). Это не копии DOM-узлов: у них нет полного набора DOM-свойств и методов.
  - How does react use the virtual DOM to render the UI?
    - Во время render React вызывает компоненты и вычисляет желаемый интерфейс. При обновлении он сопоставляет результат с предыдущим, а во время commit вносит необходимые изменения в DOM. Тип, положение и `key` помогают определить, можно ли сохранить существующие компоненты и их состояние. Это не гарантирует математически минимальное число операций или большую скорость по сравнению с любым ручным обновлением DOM.
  - Is the virtual DOM the same as the shadow DOM?
    - Нет. Виртуальный DOM описывает интерфейс в памяти. Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и его стилей в веб-компонентах; он не создаёт отдельную область видимости JavaScript-переменных.
  - What is the difference between the virtual DOM and the real DOM?
    - DOM представляет HTML-документ в виде древовидной структуры, в которой каждый узел представляет часть документа.
    - VDOM — представление интерфейса средствами JavaScript; React-элемент описывает UI, а DOM-узел предоставляет браузерный API для работы с документом.

- #### Render
  - ```
    По моменту выполнения различают первоначальный и повторные рендеринги:
      - первоначальный рендеринг (initial rendering) — происходит, когда компонент впервые появляется на экране;
      - ререндеринг — второй и последующие рендеринги компонента.
    ```
  - When is a component rendered?
    - Первый рендер запускается при отображении корневого компонента. Повторный рендер может быть запрошен обновлением собственного состояния, рендером родителя или изменением используемого контекста. Причиной могут быть и пользовательские действия, и таймеры или сетевые ответы. Render вычисляет результат; изменения DOM происходят на отдельном этапе commit.
  - How can you skip a re-render when props are unchanged?
    - `memo` позволяет пропустить рендер из-за рендера родителя, когда props не изменились (по умолчанию каждый prop сравнивается через `Object.is`). Это оптимизация, а не гарантия; собственное состояние и используемый контекст всё ещё могут вызвать рендер. Если изменился значимый prop, компонент должен отобразить новые данные.
  - Is it OK to use arrow functions in render methods?
    - Да, например `onClick={() => handleClick(id)}`. При каждом выполнении render создаётся новая функция; если она передаётся мемоизированному дочернему компоненту, новая ссылка может помешать пропуску рендера. Оптимизировать это следует при установленной необходимости.

- #### Interaction between components
  - How do you pass a value from parent to child?
    - В виде props, например: `<MyComponent name="Tim" age={20} />`. `age="20"` передаст строку, а `age={20}` — число.
  - How do you pass a value from child to parent?
    - Родитель передаёт callback через prop, а ребёнок вызывает его с нужным значением, например `onChange(nextValue)`. Родитель может обновить своё состояние и передать новые props.
  - What is prop drilling?
    - когда мы передаем prop от **первого компонента** ко **второму**, а от **второго** к **третьему** и т.п. .
    - Сам по себе этот способ не является ошибкой: props делают поток данных явным. При большой глубине промежуточные компоненты могут оказаться перегружены передачей данных.
    - Prop drilling не означает автоматически лишние рендеры; это отдельный вопрос структуры и оптимизации компонентов.
    - Сначала можно пересмотреть расположение состояния и использовать композицию (`children`). Для общих данных подходит Context с `useContext`; Redux — отдельный инструмент управления состоянием, который нужен не каждому приложению.
  - Can a child component modify its own props?
    - Нет. Props — неизменяемые снимки входных данных; нельзя мутировать и переданные через них объекты. Собственное состояние также обновляют через setter или `setState`, а не прямой мутацией. Для изменения данных родителя ребёнок вызывает переданный callback.
    - Props - readonly.
  - How do you pass a value from sibling to sibling?
    - Иногда вы хотите, чтобы состояние двух компонентов всегда изменялось одновременно. Чтобы сделать это, удалите состояние из них обоих, переместите его в их ближайший общий родительский элемент, а затем передайте его им через props. Это известно как повышение уровня состояния, и это одна из самых распространенных вещей, которые вы будете делать при написании кода React.

- #### Lifecycle and State
  - What is the difference between props and state?
    - Props — входные данные компонента, передаваемые родителем. Компонент читает их, но не изменяет; родитель может передать другие значения при следующем рендере.
    - State — память конкретного экземпляра компонента, которую React сохраняет между рендерами. Начальное значение задаёт разработчик; компонент может вообще не иметь состояния. Setter запрашивает следующий рендер, но React может пропустить обновление при том же значении по `Object.is`.
  - How does state in a class component differ from state in a functional component?
    - В классе состояние доступно как `this.state`; в функциональном компоненте React сохраняет состояние хуков между вызовами компонента. В обоих случаях состояние связано с положением компонента в дереве.
    - В классе начальное состояние задают в конструкторе или поле `state`; последующие обновления выполняют через `this.setState()`, который поверхностно объединяет объект обновления с предыдущим состоянием.
    - В функции `useState(initialState)` возвращает пару: текущее значение и setter. Начальное значение используется при инициализации, а setter заменяет значение целиком, без автоматического объединения объектов. Для более сложной логики доступен `useReducer`.
  - What is the component lifecycle?
    - В жизненном цикле компонента выделяют три этапа:
      - 🌱 Сначала компонент инициализируется и монтируется в DOM
      - 🌲 Со временем компонент обновляется
      - 🍂 В конечном итоге компонент размонтируется или удаляется из DOM
    - В классах для реакции на монтирование, обновление и размонтирование есть методы жизненного цикла. В функциях эффекты описывают синхронизацию с внешними системами и имеют собственный цикл запуска и очистки.
  - How do effects relate to the lifecycle in function components?
    - `useEffect(setup, dependencies)` запускает синхронизацию после commit. При изменении зависимостей React сначала вызывает предыдущую очистку, затем новый setup; при размонтировании — очистку. Без массива зависимостей эффект выполняется после каждого commit компонента, с `[]` — при монтировании. В Strict Mode при разработке есть дополнительный цикл setup → cleanup → setup. Это не точная замена методов класса `componentDidMount`, `componentDidUpdate` и `componentWillUnmount`; эффекты выполняются только на клиенте.

- #### Ref
  - What is the difference between refs and state variables?
    - `useRef` и `useState` сохраняют значения между рендерами. Изменение `ref.current` не запрашивает рендер; setter состояния запрашивает обновление, которое может быть пропущено при неизменившемся значении. Данные для отображения следует хранить в state.
    - В то время как refs традиционно использовались (и до сих пор используются) для прямого доступа к элементам DOM
  - When is the best time to use refs?
    - Одно из применений refs заключается в непосредственном доступе к элементу DOM для манипулирования им - примером может служить реализация сторонней библиотеки DOM. Другим примером может быть запуск императивной анимации.
    - Второе применение refs - в функциональных компонентах, где они иногда являются хорошим выбором утилиты для сохранения значений между рендерами без запуска повторного рендеринга компонента при изменении значения.
  - Ситуации, в которых использование рефов является оправданным:
    - Управление фокусом, выделение текста или воспроизведение медиа.
    - Императивный вызов анимаций.
    - Интеграция со сторонними DOM-библиотеками.
  - What is the proper way to update a ref in a function component?
    - `useRef(initialValue)` создаёт стабильный объект; значение обновляют присваиванием `ref.current = nextValue`, обычно в обработчике события или эффекте. Не следует читать или менять `ref.current` во время render, кроме предсказуемой инициализации. DOM-ссылку через prop `ref` React устанавливает сам. [Документация useRef](https://react.dev/reference/react/useRef).

- #### Context
  - What is the difference between the context API and prop drilling?
    - Context позволяет передать значение потомкам без промежуточных props. `useContext` получает значение ближайшего соответствующего провайдера выше в дереве, а без него — `defaultValue`. Context сам по себе не является хранилищем: изменяемое значение обычно хранится в state провайдера.
  - When shouldn't you use the context API?
    - Если достаточно props или композиции, Context может быть излишним. При изменении значения провайдера по `Object.is` React обновляет потребителей этого контекста; `memo` не блокирует такое обновление. Запрета на часто меняющиеся данные нет. При проблемах производительности можно разделить контексты и избегать ненужного создания объектов и функций в `value`.

- #### Redux
  - Enumerate base principles
    - Единственный источник истины: общее состояние, которым управляет Redux, хранится в одном store. Локальное состояние компонентов не обязательно переносить в Redux;
    - Состояние только для чтения: обновления описывают actions, передаваемые в `store.dispatch`; внешнему коду нельзя мутировать состояние;
    - Изменения вычисляются чистыми reducers: `(previousState, action) => nextState`. Redux Toolkit позволяет писать изменения draft через Immer, сохраняя неизменяемость результата.
  - What is the typical flow of data in a React + Redux app?
    - Архитектура Redux вращается вокруг строго однонаправленного потока данных (Data Flow). Это значит, что все данные в приложении следуют одному паттерну жизненного цикла, делая логику вашего приложения более предсказуемой и легкой для понимания.
    - Для обычного action, дошедшего до store после middleware, поток выглядит так:
      1. Вы вызываете store.dispatch(action)
      2. Redux-стор вызывает функцию-редьюсер, который вы ему передали
      3. Главный редьюсер может комбинировать результат работы нескольких редьюсеров в единственное дерево состояния приложения
      4. Redux-стор сохраняет состояние, возвращённое главным редьюсером, и уведомляет подписчиков.
      5. React Redux получает обновление; компоненты с `useSelector` перерисовываются, когда выбранное значение изменилось согласно используемой проверке равенства.
  - Benefits of Redux?
    1. Централизованное управление общим состоянием и явные правила его обновления.
    2. Предсказуемые переходы состояния при чистых reducers и неизменяемых данных.
    3. Инструменты наблюдения и отладки, в том числе Redux DevTools.
    4. Эти преимущества зависят от задачи: Redux добавляет концепции и код, поэтому не нужен автоматически каждому React-приложению.

## Источники для проверки

- JSX и создание элементов: [React: JSX](https://react.dev/learn/writing-markup-with-jsx), [классическое и автоматическое преобразование](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html), [createElement](https://react.dev/reference/react/createElement), [createRoot](https://react.dev/reference/react-dom/client/createRoot).
- DOM, render и commit: [React: Render and Commit](https://react.dev/learn/render-and-commit), [сохранение состояния](https://react.dev/learn/preserving-and-resetting-state), [MDN: Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).
- Оптимизация: [React: memo](https://react.dev/reference/react/memo), [useCallback](https://react.dev/reference/react/useCallback).
- Взаимодействие: [React: props](https://react.dev/learn/passing-props-to-a-component), [поднятие состояния](https://react.dev/learn/sharing-state-between-components), [Context и альтернативы](https://react.dev/learn/passing-data-deeply-with-context).
- Состояние и эффекты: [React: Component](https://react.dev/reference/react/Component), [useState](https://react.dev/reference/react/useState), [useReducer](https://react.dev/reference/react/useReducer), [жизненный цикл эффектов](https://react.dev/learn/lifecycle-of-reactive-effects), [useEffect](https://react.dev/reference/react/useEffect).
- Ссылки и контекст: [React: useRef](https://react.dev/reference/react/useRef), [useContext](https://react.dev/reference/react/useContext).
- Redux: [три принципа](https://redux.js.org/understanding/thinking-in-redux/three-principles), [поток данных](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow), [useSelector](https://react-redux.js.org/api/hooks#useselector), [когда нужен Redux](https://redux.js.org/faq/general), [reducers с Immer](https://redux.js.org/toolkit/usage/immer-reducers).
