// Arrays aren't exactly "lists" or a linked list per se
// They are fixed size, continiguous memory chunks
// 1. You cannot grow it
// 2. There is no "insert" or push or pop. When you write to it, you only set values in the space already prellocated
// 3. If you do exceed the size, it reallocates the entire array elsewhere, so becareful!

// Example, we create a buffer array of 10 bytes
const buf = new ArrayBuffer(10);
console.log(buf);

console.group("Modifying as a uint8 buffer array");
const uint8buf = new Uint8Array(buf);
console.log("uint8buf:", buf);
// Edit buffer array at index 0 and 2 (aka 1st and 3rd byte)
uint8buf[0] = 255;
console.log("change index 0", buf);

uint8buf[2] = 255;
console.log("change index 2", buf);
console.groupEnd();

console.group("Modifying Modifying as a uint16 buffer array");
// Notice how at index 2 changes it a different byte because you walk 16 bytes per index(aka offset) instead of 8 bytes previously
const uint16buf = new Uint16Array(buf);
console.log("uint16buf:", buf);

uint16buf[2] = 0xffff;
console.log("0xffff at index 2", buf);

// Notice how it changes the entire 16 bytes instead of just 8 byte because it is interpreting the buffer array at uint16
uint16buf[2] = 0xff;
console.log("0xff at index 2", buf);
console.groupEnd();
