# class-composer

## What it does?

it allows you to easily compose typed class from other JS\TS classes with IntelliSense!

## How to use it?

```ts
import { compose } from 'class-composer';

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Activateable {
  activated: boolean = false;

  activate() {
    this.activated = true;
  }

  deactivate() {
    this.activated = false;
  }
}
class Shareable {
  name!: string;
  private shared: boolean = false;

  share() {
    this.shared = true;
  }

  unshare() {
    this.shared = false;
  }

  getShareInfo() {
    return `${this.name} share is ${this.shared ? '' : 'not'} shared`;
  }
}

const ComposedClass = compose(User, Shareable, Activateable);
const instance = new ComposedClass('some_name');

instance.activate();

console.log(instance.name); // some_name
console.log(instance.activated); // true
console.log(instance.getShareInfo()); // some_name is not shared
```
