---
sidebar_position: 1
format: md
---

# ООП и принципы чистого кода

## 4 принципа ООП

- инкапсуляция — объединение данных и операций с ограничением доступа к внутреннему устройству; замыкания и приватные поля могут быть средствами её реализации
- полиморфизм — возможность работать с разными реализациями через общий интерфейс, например через переопределённый метод; это не определение перегрузки функций
- наследование (расширение класса)
- абстракция — предоставление нужных для задачи операций без раскрытия деталей реализации.

Документация: [MDN — объектно-ориентированное программирование](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming).

Пример:

```javascript
class Shape {
  area() {
    throw new Error("Реализуйте area");
  }
} // абстракция

class Square extends Shape {
  // наследование
  #side; // инкапсуляция

  constructor(side) {
    super();
    this.#side = side;
  }

  area() {
    return this.#side ** 2;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

const areas = [new Square(2), new Circle(1)].map((shape) => shape.area()); // полиморфизм

console.log(areas); // [4, 3.141592653589793]
```

## SOLID, DRY, KISS и YAGNI

### SOLID

- S - single - single responsibility - модуль/класс должен иметь одну причину для изменения (одну ответственность)
- O - open - open/closed - принцип открытости закрытости, то есть модули должны быть открыты для расширения, но закрыты для изменения существующего кода при добавлении нового поведения
- L - Liskov - принцип Барбары Лисков о том, что наследник объекта может заменить сам объект без нарушения логики
- I - interface - принцип разделения интерфейсов, много маленьких интерфейсов вместо одного большого
- D - dependency - dependency inversion - модули высокого и низкого уровня должны зависеть от абстракций; абстракции не должны зависеть от деталей

- DRY — избегать дублирования знаний, поддерживая единый источник истины.
- KISS — выбирать понятное и достаточно простое решение.
- YAGNI — не добавлять возможности до появления реальной потребности.

Документация: [Дока — принципы SOLID](https://doka.guide/tools/oop/#solid).

Пример:

```typescript
// S: расчёт суммы и вывод отчёта имеют разные причины для изменения.
const total = (prices: number[]) => prices.reduce((sum, n) => sum + n, 0);
const printReport = (value: number) => console.log(`Итого: ${value}`);

// O: добавляем новые расчёты площади, не меняя sumAreas.
interface Shape {
  area(): number;
}

const sumAreas = (shapes: Shape[]) =>
  shapes.reduce((sum, shape) => sum + shape.area(), 0);

// L: обе реализации соблюдают контракт Shape (неотрицательная площадь).
class Square implements Shape {
  constructor(private side: number) {
    if (side < 0) throw new RangeError("side");
  }

  area() {
    return this.side ** 2;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {
    if (radius < 0) throw new RangeError("radius");
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

// I: узкие интерфейсы — потребителю чтения не нужна запись.
interface Reader {
  read(): string;
}

interface Writer {
  write(text: string): void;
}

// D: сервис зависит от абстракции Reader, реализация передаётся снаружи.
class ReportService {
  constructor(private source: Reader) {}

  build() {
    return this.source.read();
  }
}

console.log(new ReportService({ read: () => "Отчёт" }).build()); // "Отчёт"
console.log(sumAreas([new Square(2), new Circle(1)])); // 7.141592653589793
// DRY: формула суммы хранится в одном месте; KISS: достаточно обычных функций.
printReport(total([10, 20])); // "Итого: 30"
// YAGNI: экспорт в PDF добавим, когда он понадобится; сейчас нужен текст.
```

## Принципы проектирования
Эти принципы помогают выбирать решения при разработке; они не являются требованиями JavaScript или веб-стандартов.

- `KISS` (Keep It Simple and Straightforward) - провозглашает, что следует избегать ненужной сложности.
- `YAGNI` (You Aren’t Gonna Need It) - принцип, согласно которому следует писать код только тогда, когда в нем есть необходимость, а не исходя из предположений о будущих потребностях.

Пример:

```javascript
// KISS: простое вычисление вместо лишней иерархии классов.
const total = prices => prices.reduce((sum, price) => sum + price, 0);

console.log(total([10, 20])); // 30

// YAGNI: реализуем нужный формат отчёта; другие добавим при появлении задачи.
const report = rows => rows.join("\n");

console.log(report(["Продажи: 30", "Расходы: 10"]));
```
