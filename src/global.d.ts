declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}
declare type Indexable<T = any> = {
  [key: string]: T
}
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type EmitType = (
  event: string,
  ...args: any[]
) => void
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null
