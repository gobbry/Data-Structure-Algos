class Dog {
  public username: string;
  public wagTail: Function;
  constructor(private name: string) {
    this.username = name;
    this.wagTail = () => {
      return "Wagging tail!";
    };
  }

  bark() {
    return "Woof!";
  }
}

const dog1 = new Dog("Max");
const dog2 = new Dog("Spot");

// Which of the following statements are true?
dog1.wagTail() === dog2.wagTail();
// true: we are comparing 2 return string values "Wagging tail!" which strictly equal to each other

dog1.wagTail === dog2.wagTail;
// false: .wagTail is created in the constructor and thus belongs in memory of the constructed objects dog1 and dog2
// we are now comparing 2 function objects in different references in memory and are thus not strictly equal to each other

dog1.bark === dog2.bark;
// true: .bark is created in the class, not the object. Thus, .bark belongs in the PROTOTYPE which is shared by both objects dog1 and dog2
// we are now comparing the same function object and thus share the same reference in memory and are strictly equal to each other
// dog1.bark === Dog.__proto__ === dog2.bark -> they are all shared as they are not constructed in runtime

Object.getPrototypeOf(dog1) === Object.getPrototypeOf(dog2);
// true: both dog1 and dog2 point to the same prototype as it is the same class
// we are comparing the same object and are strictly equal to each other

dog1.constructor === dog2.constructor;
// true: .constructor refers to the constructor function on the prototype
// we are comparing the same function object and are strictly equal to each other

// Test it yourself:
console.debug(dog1.wagTail() === dog2.wagTail());
console.debug(dog1.wagTail === dog2.wagTail);
console.debug(dog1.bark === dog2.bark);
console.debug(Object.getPrototypeOf(dog1) === Object.getPrototypeOf(dog2));
console.debug(dog1.constructor === dog2.constructor);
