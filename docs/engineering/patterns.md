---
sidebar_position: 2
format: md
---

# Паттерны проектирования

## Паттерны проектирования

- Паттерн — повторно используемый подход к решению типичной задачи, а не готовый фрагмент кода. Пример: Observer организует подписку наблюдателей на изменения.

Пример:

```javascript
// Observer: издатель уведомляет зарегистрированных наблюдателей.
function createSubject() {
  const listeners = new Set();
  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    notify(value) {
      for (const fn of listeners) fn(value);
    },
  };
}
const subject = createSubject();
const unsubscribe = subject.subscribe((value) => console.log(value));
subject.notify("Обновление"); // "Обновление"
unsubscribe();
subject.notify("Не будет выведено");
```

## Паттерны проектирования — дополнительные примеры

### Порождающие паттерны

Документация: [Дока: Observer и реактивность](https://doka.guide/tools/reactivity/).

Порождающие паттерны управляют созданием объектов и скрывают детали их инициализации.

- Singleton: Обеспечивает наличие только одного экземпляра класса и предоставляет к нему глобальную точку доступа.
  ```typescript
  class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  }

  const instance1 = Singleton.getInstance();
  const instance2 = Singleton.getInstance();
  console.log(instance1 === instance2); // true
  ```

### Структурные паттерны

Структурные шаблоны описывают композицию классов и объектов в более крупные структуры; наследование — лишь один из возможных инструментов.

- Adapter: Позволяет объектам с несовместимыми интерфейсами работать вместе.
  ```typescript
  interface EuropeanPlug {
    connect(): void;
  }

  class EuropeanPlugImpl implements EuropeanPlug {
    connect() {
      console.log("Connected with European plug");
    }
  }

  interface USPlug {
    connectUS(): void;
  }

  class Adapter implements USPlug {
    private europeanPlug: EuropeanPlug;

    constructor(europeanPlug: EuropeanPlug) {
      this.europeanPlug = europeanPlug;
    }

    connectUS() {
      this.europeanPlug.connect();
    }
  }

  const europeanPlug = new EuropeanPlugImpl();
  const adapter = new Adapter(europeanPlug);
  adapter.connectUS(); // Connected with European plug
  ```

### Поведенческие паттерны

Поведенческие шаблоны проектирования решают задачи эффективного и безопасного взаимодействия между объектами программы.

- Observer: Создает механизм подписки, позволяющий одним объектам следить и реагировать на события, происходящие в других объектах.
  ```typescript
  interface Observer {
    update(message: string): void;
  }

  class ConcreteObserver implements Observer {
    update(message: string) {
      console.log(`Observer received message: ${message}`);
    }
  }

  class Subject {
    private observers: Observer[] = [];

    addObserver(observer: Observer) {
      this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notifyObservers(message: string) {
      this.observers.forEach((observer) => observer.update(message));
    }
  }

  const observer1 = new ConcreteObserver();
  const observer2 = new ConcreteObserver();
  const subject = new Subject();
  subject.addObserver(observer1);
  subject.addObserver(observer2);
  subject.notifyObservers("Обновление");
  subject.removeObserver(observer1);
  ```
