import {
  ComposedClass,
  ComposedConstructorParams,
  Constructor,
  Mixins,
} from './types';

class ComposedClassBase {
  protected _: {
    mixins: { [key: string]: any };
  } = { mixins: {} };

  protected superMixins(methodName: string, ...args: any[]) {
    return Object.values(this._.mixins).map((mixin) =>
      mixin[methodName]?.call(this, ...args)
    );
  }

  protected superMixin(mixinName: string, methodName: string, ...args: any[]) {
    return this._.mixins[mixinName][methodName].call(this, ...args);
  }
}

export function buildComposer(
  handleConstructor: (c: Constructor, args: any) => void
) {
  return function <T extends Mixins>(
    ...constructors: T
  ): ComposedClass<T> & Constructor<ComposedClassBase> {
    class cls extends ComposedClassBase {
      constructor(...args: ComposedConstructorParams<T>) {
        super();
        constructors.forEach((c) => handleConstructor.call(this, c, args));
      }
    }

    constructors.forEach((c: Constructor) =>
      Object.assign(cls.prototype, c.prototype)
    );

    return cls as any;
  };
}

export const compose = buildComposer(function (
  this: any,
  c: Constructor<any>,
  args: any[]
) {
  c.apply(this, args);
  this._.mixins[c.name] = c.prototype;
});
