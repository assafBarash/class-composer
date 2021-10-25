import { Constructor, MergeConstructorTypes } from './types';

export function buildComposer(
  handleConstructor: (c: any, args: any[]) => void
) {
  return function <T extends Array<Constructor<any>>>(
    ...constructors: T
  ): Constructor<MergeConstructorTypes<T>> {
    const cls = class {
      state = {};

      constructor(...args: any[]) {
        constructors.forEach((c) => handleConstructor.call(this, c, args));
      }
    };
    constructors.forEach((c: any) => {
      Object.assign(cls.prototype, c.prototype);
    });
    return cls as any;
  };
}

export const compose = buildComposer(function (this: any, c: any, args: any[]) {
  const oldState = this.state;

  c.apply(this, args);
  this.state = Object.assign({}, this.state, oldState);
});

export function compose2<T extends Array<Constructor<any>>>(
  constructors: T
): Constructor<MergeConstructorTypes<T>> {
  const cls = class {
    state = {};

    constructor() {
      constructors.forEach((c: any) => {
        const oldState = this.state;
        c.apply(this);
        this.state = Object.assign({}, this.state, oldState);
      });
    }
  };
  constructors.forEach((c: any) => {
    Object.assign(cls.prototype, c.prototype);
  });
  return cls as any;
}
