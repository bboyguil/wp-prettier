/**
 * Test nonstrict type param arity checking,
 * as enabled by
 *
 * [options]
 * experimental.strict_type_args=false
 *
 * in .flowconfig.
 *
 * @flow
 */

// no arity error in type annotation using polymorphic class

class MyClass<T> {
  x: T;
  constructor(x: T) {
    this.x = x;
  }
}

var c: MyClass = new MyClass(0); // no error

// no arity error in type annotation using polymorphic class with defaulting

class MyClass2<T, U = string> {
  x: T;
  y: U;
  constructor(x: T, y: U) {
    this.x = x;
    this.y = y;
  }
}

var c2: MyClass2 = new MyClass2(0, ""); // no error

// no arity error in type annotation using polymorphic type alias

type MyObject<T> = {
  x: T;
}

var o: MyObject = { x: 0 }; // no error

// arity error in type alias rhs

type MySubobject = { y: number } & MyObject; // no error

// arity error in interface extends

interface MyInterface<T> {
  x: T;
}

interface MySubinterface extends MyInterface { // no error
  y: number;
}

// no arity error in extends of polymorphic class

class MySubclass extends MyClass { // ok, type arg inferred
  y: number;
  constructor(y: number) {
    super(y);
  }
}

// no arity error in call of polymorphic function

function singleton<T>(x: T):Array<T> { return [x]; }

var num_array:Array<number> = singleton(0); // ok, type arg inferred
