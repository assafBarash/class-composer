import {
  ComposedClass,
  ComposedConstructorParams,
  Constructor,
  Mixins,
} from './types';

export function buildComposer(
  handleConstructor: (c: Constructor, args: any) => void
) {
  return function <T extends Mixins>(...constructors: T): ComposedClass<T> {
    const cls = class {
      state = {};

      constructor(...args: ComposedConstructorParams<T>) {
        constructors.forEach((c) => handleConstructor.call(this, c, args));
      }
    };
    constructors.forEach((c: Constructor) => {
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
