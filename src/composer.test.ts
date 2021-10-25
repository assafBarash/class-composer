import { compose } from './composer';

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
    return this.shared;
  }
}

describe('compose', () => {
  it('should compose with function style', () => {
    const ComposedClass = compose(User, Shareable, Activateable);
    const instance = new ComposedClass('some_name');

    new ComposedClass();

    instance.activate();
    instance.share();

    expect(instance.getShareInfo()).toBe(true);
    expect(instance.activated).toBe(true);
    expect(instance.name).toBe('some_name');
  });

  it('should compose with extend style', () => {
    class ComposedClass extends compose(User, Shareable, Activateable) {}
    const instance = new ComposedClass('some_name');

    instance.activate();
    instance.share();

    expect(instance.getShareInfo()).toBe(true);
    expect(instance.activated).toBe(true);
    expect(instance.name).toBe('some_name');
  });
});
