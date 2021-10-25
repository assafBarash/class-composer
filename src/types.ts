export type Constructor<T = {}> = new (...args: any[]) => T;

/* turns A | B | C into A & B & C */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/* merges constructor types - self explanatory */
export type MergeConstructorTypes<T extends Array<Constructor<any>>> =
  UnionToIntersection<InstanceType<T[number]>>;
