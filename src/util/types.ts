export const NOOP = () => {};

export type Runnable = () => void;
export type Supplier<T> = () => T;
export type Consumer<T> = (a: T) => void;
export type BiConsumer<T, S> = (a: T, b: S) => void;
export type Function<T, S> = (a: T) => S;
export type BiFunction<T, S, U> = (a: T, b: S) => U;