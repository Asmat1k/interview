---
sidebar_position: 3
format: md
---

# DOM и события

## DOM: события, навигация и изменение дерева

### События DOM-дерева

- События — это сигналы, которые браузер посылает разработчику, а разработчик может на сигнал реагировать. По аналогии со светофором: видим зелёный свет, едем дальше. События бывают разных типов: клик, нажатие клавиши на клавиатуре, прокрутка страницы и так далее.
- Основные типы событий:
  1. События мыши:
  - `click`: Событие происходит при щелчке по элементу.
  - `dblclick`: Событие происходит при двойном щелчке по элементу.
  - `mouseover`: Событие происходит, когда указатель мыши перемещается на элемент.
  - `mouseout`: Событие происходит, когда указатель мыши покидает элемент.
  1. События клавиатуры:
  - `keydown`: Событие происходит при нажатии клавиши.
  - `keyup`: Событие происходит при отпускании клавиши.
  - `keypress`: устаревшее событие; для клавиш используйте `keydown`, для текстового ввода — `beforeinput`/`input`.
  1. События формы:
  - `submit`: Событие происходит при отправке формы.
  - `change`: происходит при фиксации изменения значения; для текстового поля обычно после потери фокуса. Для каждого изменения ввода используют `input`.
  1. События документа:
  - `DOMContentLoaded`: Событие происходит, когда HTML-документ полностью загружен и разобран, но внешние ресурсы, такие как стили и изображения, могут быть ещё не загружены.
  - `load` у `window`: документ и зависимые ресурсы загружены, кроме ресурсов с ленивой загрузкой.

- Всплытие и погружение
- Стандарт DOM Events описывает 3 фазы прохода события:
  1. Фаза погружения (capturing phase) – событие сначала идёт сверху вниз.
  2. Фаза цели (target phase) – событие достигло целевого(исходного) элемента.
  3. Фаза всплытия (bubbling stage) – событие начинает всплывать.

  **ВСПЛЫТИЕ**
  - когда на элементе происходит событие, обработчики сначала срабатывают на нём, потом на его родителе, затем выше и так далее, вверх по цепочке предков. (не все события всплывают, например, focus не всплывает)
  - event.target указывает на цель события; при переходе границы Shadow DOM возможен retargeting.
    - `event.target` обычно сохраняется при всплытии в одном дереве; за границей Shadow DOM наблюдаемая цель может быть переопределена.
    - `event.currentTarget` (а в обычном обработчике `addEventListener` также `this`, но не в стрелочном) — это текущий элемент, до которого дошло всплытие, на нём сейчас выполняется обработчик.
  - ![всплытие](../../img/telegram-cloud-photo-size-2-5465502638037656323-x.jpg)
  - Любой промежуточный обработчик может решить, что событие полностью обработано, и остановить всплытие. Для этого нужно вызвать метод `event.stopPropagation()`.
    - `event.stopPropagation()` препятствует продвижению события дальше, но на текущем элементе все обработчики будут вызваны.
    - `event.stopImmediatePropagation()` - Он не только предотвращает всплытие, но и останавливает обработку событий на текущем элементе

  **ПОГРУЖЕНИЕ**
  - Чтобы поймать событие на стадии погружения, нужно использовать третий аргумент capture. (по умолчанию false)

```javascript
const elem = document.createElement("button");
const handler = () => console.log("click");

elem.addEventListener("click", handler, { capture: true });
// или просто "true", как сокращение для {capture: true}
elem.addEventListener("click", handler, true);
```

- Удаление обработчика происходит также с флагом

### Навигация по DOM-дереву

- DOM представляет собой древовидную структуру, где каждый узел является объектом. Навигация по дереву DOM позволяет перемещаться между различными элементами документа.
- Основные методы навигации:

1. Доступ к элементам:

- `document.getElementById('id')`: Возвращает элемент по его id.
- `document.getElementsByClassName('class')`: Возвращает список элементов по их классу.
- `document.getElementsByTagName('tag')`: Возвращает список элементов по их тегу.
- `document.querySelector('selector')`: Возвращает первый элемент, соответствующий CSS-селектору.
- `document.querySelectorAll('selector')`: Возвращает `NodeList` (коллекцию, а это псевдомассив) элементов, соответствующие CSS-селектору.
  - querySelectorAll возвращает статический NodeList. Цепочка наследования: `myNodeList --> NodeList.prototype --> Object.prototype --> null`, поэтому у `NodeList` нет большинства методов массива, но есть `forEach` и итератор; можно использовать `Array.from(nodeList)`

1. Навигация по узлам:

- `parentNode`: Возвращает родительский узел.
- `childNodes`: Возвращает все дочерние узлы.
- `firstChild` / `lastChild`: Возвращает первый / последний дочерний узел.
- `previousSibling` / `nextSibling`: Возвращает предыдущий / следующий узел на том же уровне.

Пример:

```javascript
const list = document.createElement("ul");

list.innerHTML = "<li>А</li><li>Б</li>";
console.log(list.querySelectorAll("li").length); // 2
console.log(list.firstChild.nextSibling.textContent); // "Б"
console.log(list.lastChild.parentNode === list); // true
```

### Изменение элементов дерева

- Для динамического изменения элементов на странице используются различные методы и свойства DOM.
- Основные методы изменения элементов:
  1. Создание элементов:
  - `document.createElement('tag')`: Создает новый элемент.
  - `document.createTextNode('text')`: Создает новый текстовый узел.
  1. Добавление элементов:
  - `parentNode.appendChild(newNode)`: Добавляет новый узел в конец списка дочерних элементов родительского узла.
  - `parentNode.insertBefore(newNode, referenceNode)`: Вставляет новый узел перед указанным узлом.
  1. Удаление элементов:
  - `parentNode.removeChild(childNode)`: Удаляет дочерний узел из родительского узла.
  1. Изменение атрибутов:
  - `element.setAttribute('attr', 'value')`: Устанавливает значение атрибута элемента.
  - `element.getAttribute('attr')`: Возвращает значение атрибута элемента.
  - `element.removeAttribute('attr')`: Удаляет атрибут элемента.

Пример:

```javascript
// Выполните в браузере после создания document.body.
const panel = document.createElement("section");

panel.id = "example";
panel.className = "panel";
panel.innerHTML =
  '<button type="button">Нажмите</button><input aria-label="Текст"><form><button>Отправить</button></form>';
document.body.appendChild(panel);

const button = panel.querySelector("button");

for (const type of [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "keydown",
  "keyup",
]) {
  button.addEventListener(type, (event) => console.log(type, event.target));
}

panel
  .querySelector("input")
  .addEventListener("input", (e) => console.log(e.target.value));
panel
  .querySelector("input")
  .addEventListener("change", () => console.log("Значение подтверждено"));
panel.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
// Погружение → цель → всплытие: при клике выводятся capture, target, bubble.
panel.addEventListener("click", () => console.log("capture"), {
  capture: true,
});
button.addEventListener("click", () => console.log("target"));
panel.addEventListener("click", (event) =>
  console.log("bubble", event.currentTarget),
);

// event.stopPropagation() останавливает продвижение к другим узлам;
// event.stopImmediatePropagation() — также остальные обработчики этого узла.
function handler() {
  console.log("временный обработчик");
}

button.addEventListener("click", handler, true);
button.removeEventListener("click", handler, true); // capture должен совпадать
console.log(document.getElementById("example") === panel); // true
console.log(document.getElementsByClassName("panel").length); // минимум 1
console.log(panel.getElementsByTagName("button").length); // 2
console.log(
  [...panel.querySelectorAll("button")].map((node) => node.textContent),
);
console.log(button.parentNode === panel, panel.firstChild === button); // true, true
console.log(panel.childNodes.length, panel.lastChild.nodeName); // 3, "FORM"
console.log(button.nextSibling.nodeName, button.previousSibling); // "INPUT", null

const text = document.createTextNode("Подсказка");

panel.insertBefore(text, button);
button.setAttribute("title", "Действие");
console.log(button.getAttribute("title")); // "Действие"
button.removeAttribute("title");
panel.removeChild(text);

const ready = () => console.log("DOM готов");

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", ready, { once: true });
else ready();

window.addEventListener("load", () => console.log("Ресурсы загружены"), {
  once: true,
});
```

## Браузер
### События
- События мыши:
  - `click` — активация элемента основной кнопкой мыши, касанием или клавиатурой (для поддерживающих такую активацию элементов).
  - `contextmenu` — запрос контекстного меню, обычно правой кнопкой мыши или клавишей контекстного меню.
  - `mouseover` / `mouseout` - когда мышь наводится на элемент / покидает элемент.
  - `mousedown` / `mouseup` - когда нажали / отпустили кнопку мыши на элементе.
  - `mousemove` - при движении мыши.

- События на элементах управления:
  - `submit` — событие на форме при попытке отправки, прошедшей встроенную валидацию; возникает также при `requestSubmit()`, но не при прямом вызове `form.submit()`.
  - `focus` — элемент получил фокус (мышью, клавиатурой или программно).

- Клавиатурные события:
  - `keydown` / `keyup` - когда пользователь нажимает / отпускает клавишу.

- События документа:
  - `DOMContentLoaded` — HTML разобран, DOM построен и отложенные (`defer` и обычные модульные) скрипты выполнены; загрузки изображений событие не ждёт.

- CSS-события:
  - `transitionend` — завершён CSS-переход (`transition`); завершение CSS-анимации (`animation`) обозначает `animationend`. При отмене перехода `transitionend` не возникает.

Документация: [MDN: click](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event), [contextmenu](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event), [submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event), [transitionend](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event).

Пример:

```javascript
// Выполните в браузере после разбора HTML.
const button = document.createElement("button");

button.type = "button";
button.textContent = "Нажмите";
document.body.append(button);

for (const type of ["click", "contextmenu", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "focus", "keydown", "keyup"]) {
  button.addEventListener(type, event => console.log(event.type));
}

const form = document.createElement("form");

form.innerHTML = '<button type="submit">Отправить</button>';
form.addEventListener("submit", event => {
  event.preventDefault();
  console.log("submit: форма готова к отправке");
});

document.body.append(form);

const onReady = () => console.log("DOM готов");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onReady, { once: true });
} else {
  onReady();
}

button.style.transition = "opacity 0.2s";
button.addEventListener("transitionend", event => console.log(event.propertyName));
// При потере фокуса меняется opacity; после перехода выводится "opacity".
button.addEventListener("blur", () => { button.style.opacity = "0.5"; });
```
