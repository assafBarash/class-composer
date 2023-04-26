import { compose } from './composer';

class User {
  name: string;
  talkLog: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  talk(msg: string) {
    return `User: ${msg}`;
  }
}
class Activateable {
  talkLog!: string[];

  activated: boolean = false;

  activate() {
    this.activated = true;
  }

  deactivate() {
    this.activated = false;
  }
}
class Shareable {
  talkLog!: string[];
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
    instance.activate();
    instance.share();

    expect(instance.getShareInfo()).toBe(true);
    expect(instance.activated).toBe(true);
    expect(instance.name).toBe('some_name');
  });

  it('should handle invoke superMixins correctly', () => {
    class ComposedClass extends compose(User, Shareable, Activateable) {
      constructor(age: number, isSomething: boolean) {
        super('some_name');
        console.log(age, isSomething);
      }

      talk(msg: string) {
        this.share();
        return this.superMixin('User', 'talk', `Composed: ${msg}`);
      }
    }

    const instance = new ComposedClass(23, true);

    expect(instance.talk('lalala')).toContain('User: Composed: lalala');
  });
});
