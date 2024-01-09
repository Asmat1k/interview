# REACT Interview Questions

- #### JSX
    - What is JSX?
      - Фундаментально, JSX является синтаксическим сахаром для функции React.createElement(component, props, ...children).
      - JSX Элемент
        - ```javascript
          <MyButton color="blue" shadowSize={2}>
            Click Me
          </MyButton>
          ```
      - Компилируется в 
        - ```javascript
          React.createElement(
              MyButton,
              {color: 'blue', shadowSize: 2},
              'Click Me'
            )
          ```
    - Is it possible to use React without JSX?
      - React можно использовать и без JSX, но большинство людей ценит его за наглядность при работе с UI, живущем в JavaScript-коде. Помимо этого, JSX помогает React делать сообщения об ошибках и предупреждениях понятн
      - Например, вот код с JSX:
        -  ```javascript
            class Hello extends React.Component {
              render() {
                return <div>Привет, {this.props.toWhat}</div>;
              }
            }

            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(<Hello toWhat="Мир" />);
            ```
      - Он может быть превращён в код без JSX:
        - ```javascript
          class Hello extends React.Component {
            render() {
              return React.createElement('div', null, `Привет, ${this.props.toWhat}`);
            }
          }

          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(Hello, {toWhat: 'Мир'}, null));
          ```

- #### React DOM
  - What is the virtual DOM?
    - Виртуальный DOM (VDOM) — это концепция программирования, в которой идеальное или            «виртуальное» представление пользовательского интерфейса хранится в памяти и синхронизируется с «настоящим» DOM при помощи библиотеки, такой как ReactDOM.
    - VDOM — это объектное представление RDOM, его легковесная копия. VDOM содержит те же свойства, что и RDOM, но не может напрямую влиять на то, что отображается на экране.
  - How does react use the virtual DOM to render the UI?
    - Когда в UI добавляются новые элементы, создается VDOM в виде дерева. Каждый элемент является узлом этого дерева. При изменении состояния любого элемента, создается новое дерево. Затем это новое дерево сравнивается (diffed) со старым. После этого вычисляется наиболее эффективный метод внесения изменений в RDOM. Цель данных вычислений состоит в минимизации количества операций, совершаемых с RDOM. Тем самым, уменьшаются накладные расходы, связанные с обновлением RDOM.
  - Is the virtual DOM the same as the shadow DOM?
    - В то время как виртуальный DOM - это концепция программирования, реализованная React преимущественно для повышения производительности рендеринга, Shadow DOM - это браузерная технология, предназначенная для определения области видимости переменных и CSS в веб-компонентах.
  - What is the difference between the virtual DOM and the real DOM?
    - DOM представляет HTML-документ в виде древовидной структуры, в которой каждый узел представляет часть документа.
    - VDOM — это обычный JavaScript-объект.

- #### Render
  - ```
    Существует 2 основные стадии, которым следует уделять пристальное внимание, когда речь заходит о производительности в React:
      - первоначальный рендеринг (initial rendering) — происходит, когда компонент впервые появляется на экране;
      - ререндеринг — второй и последующие рендеринги компонента.
    ```
  - When is a component rendered?
    - Ререндеринг происходит, когда React необходимо обновить приложение некоторыми данными. Обычно, это является результатом действий пользователя
  - How not to render on props change?
    - memo позволяет пропустить повторный рендеринг компонента, если его реквизиты не изменились.
  - Is it OK to use arrow functions in render methods?
    - Вообще говоря, да, это нормально, и часто это самый простой способ передать параметры функциям обратного вызова.

- #### Interaction between components
  - How do you pass a value from parent to child?
    - в виде props, например: ```<MyComponent name="Tim" age="20" />```
  - How do you pass a value from child to parent?
    - нужно передать функцию callback, которая принимает значение и может быть вызвана с ним, как props
  - What is prop drilling?
    - когда мы передаем prop от **первого компонента** ко **второму**, а от **второго** к **третьему** и т.п. .
    - это анти-паттерн
    - если идет очень глубокий props drilling, то ухудшается читаемсоть кода
    - вызывает ненужный повторный рендер
    - **Решение - использовать Context Hook / Redux**
  - Can a child component modify its own props?
    - Нет, компонент может модифицировать свой state, но не свои пропсы. Попытка их отредактировать может привести к проблемам или вооще поломать принцип работы React.
    - Props - readonly.
  - How do you pass a value from sibling to sibling?
    - Иногда вы хотите, чтобы состояние двух компонентов всегда изменялось одновременно. Чтобы сделать это, удалите состояние из них обоих, переместите его в их ближайший общий родительский элемент, а затем передайте его им через props. Это известно как повышение уровня состояния, и это одна из самых распространенных вещей, которые вы будете делать при написании кода React.
    
- #### Lifecycle and State
  - What is the difference between props and state?
  - How does state in a class component differ from state in a functional component?
  - What is the component lifecycle?
  - How do you update lifecycle in function components?