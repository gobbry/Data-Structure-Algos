function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

// Iterator is a special object that contains special methods: next, return, throw
const iterator = genFunc();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: true }

// Generator functions can be iterated, but yielded values are iterated NOT return values
console.log([...genFunc()]); // [1, 2, 3]
for (const v of genFunc()) {
  console.log(v);
} // 1 2 3

// What gets logged?
function* count() {
  yield 1;
  yield 2;
  return 3;
}

for (const v of count()) {
  console.log(v);
}
// Answer: 1 2
// return value 3 is not iterated as it is considered done
// every javascript function has an implicit return undefined to denote "done"!
// Thus, the below 2 are the same

function* iterArray() {
  yield 1;
  yield 2;
  yield 3;
  return;
}

for (const v of iterArray()) {
}
for (const v of [1, 2, 3]) {
}
