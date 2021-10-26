import { compose } from './composer';

class User {
  name: string;
  staffSaid: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  talk() {
    this.staffSaid.push('i user');
  }
}
class Activateable {
  staffSaid!: string[];

  activated: boolean = false;

  activate() {
    this.activated = true;
  }

  deactivate() {
    this.activated = false;
  }

  talk() {
    this.staffSaid.push('i activate');
  }
}
class Shareable {
  staffSaid!: string[];
  name!: string;
  private shared: boolean = false;

  talk() {
    this.staffSaid.push('i share');
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
    const instance = new ComposedClass('some_name');

    instance.activate();
    instance.share();

    expect(instance.getShareInfo()).toBe(true);
    expect(instance.activated).toBe(true);
    expect(instance.name).toBe('some_name');
  });

  it('should handle invoke superMixins correctly', () => {
    class ComposedClass extends compose(User, Shareable, Activateable) {
      talk() {
        this.superMixins('talk');
      }
    }

    const instance = new ComposedClass('some_name');

    instance.talk();
    expect(instance.staffSaid).toContain('i user');
    expect(instance.staffSaid).toContain('i share');
    expect(instance.staffSaid).toContain('i activate');
  });
});
