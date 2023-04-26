export type Constructor<T = {}, Q = any> = new (...args: Q[]) => T;

/* turns A | B | C into A & B & C */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type Mixins = Array<Constructor<any>>;

/* merges constructor types - self explanatory */
export type MergeConstructorTypes<T extends Mixins> = UnionToIntersection<
  InstanceType<T[number]>
>;

export type ComposedClass<T extends Mixins> = Constructor<
  MergeConstructorTypes<T>
>;

export type ComposedConstructorParams<T extends Mixins> = ConstructorParameters<
  ComposedClass<T>
>;
