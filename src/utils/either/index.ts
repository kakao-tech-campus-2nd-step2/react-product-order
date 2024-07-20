export type Either<E, A> = Left<E> | Right<A>;

class Left<E> {
  constructor(public readonly value: E) {}

  isLeft(): this is Left<E> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }

  map<B>(_: (a: never) => B): Either<E, B> {
    return this as Left<E>;
  }

  chain<F, B>(_: (a: never) => Either<F, B>): Either<E | F, B> {
    return this as Left<E>;
  }
}

class Right<A> {
  constructor(public readonly value: A) {}

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<A> {
    return true;
  }

  map<B>(f: (a: A) => B): Either<never, B> {
    return new Right(f(this.value));
  }

  chain<F, B>(f: (a: A) => Either<F, B>): Either<F, B> {
    return f(this.value);
  }
}

// 수정된 유틸리티 함수들
export const left: <E>(e: E) => Either<E, never> = (e) => new Left(e);
export const right: <A>(a: A) => Either<never, A> = (a) => new Right(a);
