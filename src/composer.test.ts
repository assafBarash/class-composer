import { compose } from './composer';

class User {
  name: string;
  talkLog: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  talk() {
    this.talkLog.push('i user');
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

  talk() {
    this.talkLog.push('i activate');
  }
}
class Shareable {
  talkLog!: string[];
  name!: string;
  private shared: boolean = false;

  talk() {
    this.talkLog.push('i share');
  }

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
    const instance = new ComposedClass(['nana']);
    const a = new ComposedClass();
    instance.activate();
    instance.share();

    expect(instance.getShareInfo()).toBe(true);
    expect(instance.activated).toBe(true);
    expect(instance.name).toBe('some_name');
  });

  it('should handle invoke superMixins correctly', () => {
    class ComposedClass extends compose(User, Shareable, Activateable) {
      constructor(age: number, isSomething: boolean) {
        super(['nana']);
        console.log(age, isSomething);
      }

      talk() {
        this.superMixins('talk');
      }
    }

    const instance = new ComposedClass(23, true);

    instance.talk();
    expect(instance.talkLog).toContain('i user');
    expect(instance.talkLog).toContain('i share');
    expect(instance.talkLog).toContain('i activate');
  });
});
