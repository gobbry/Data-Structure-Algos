// Put the logs in the correct order
// QUESTION STARTS HERE
Promise.resolve().then(() => console.log(1));

queueMicrotask(() => console.log(2));

setTimeout(() => console.log(3), 0);

console.log(4);

new Promise(() => console.log(5));

(async () => console.log(6))();
// QUESTION ENDS HERE

// Logs are in this order: 4,5,6,1,2,3

Promise.resolve().then(() => console.log(1));
// Promise.resolve() gets pushed into the call stack and resolved immediately.
// The callback function is scheduled into the microtask queue as it is chained by the .then method

queueMicrotask(() => console.log(2));
// queueMicrotask is scheduled behind ()=>console.log(1) as a microtask

setTimeout(() => console.log(3), 0);
// setTimeout is added to call stack, sent to Web API.

console.log(4);
// on this tick, ()=>console.log(3) gets scheduled to the macrotask queue.
// also on the same tick, console.log(4) gets pushed to the call stack and then executed, thus 4 is the FIRST VALUE

new Promise(() => console.log(5));
// the body of promises is constructed synchronously but resolved asynchronously
// console.log(5) is pushed to the call stack and executed immediately, thus 5 is the SECOND VALUE

(async () => console.log(6))();
// it's an immediately invoked async function (not an await), so it is also run synchronously
// console.log(6) is pushed to the call stack and executed immdiately, thus 6 is the THIRD VALUE

// call stack is now empty, so it runs the microtask queue
// first in microtask queue is ()=>console.log(1) so console.log(1) is pushed to the call stack, thus 1 is the FOURTH VALUE
// second in microtask queue is ()=>console.log(2) so console.log(2) is pushed to the call stack, thus 2 is the FIFTH VALUE

// microtask queue is now empty, so it runs the macrotask queue
// first in the macrotask queue is ()=>console.log(3) so console.log(3) is pushed to the call stack, thus 3 is the SIXTH VALUE
// Thus, the logs are in the order: 4,5,6,1,2,3

// There are 5 things to take note of:
// Call stack
// - javascript runtime where execution takes place
// Web API
// - handles web api methods by placing it into its own stack
// - gives a result or callback
// Microtask Queue
// - part of callback queue, thus containing callbacks
// - contains more important operations such as promises and mutation observers APIs.
// - overusage can starve macrotasks
// Macrotask Queue
// - part of callback queue, thus containing callbacks
// - contains less important operations such as timers, I/O events, and user interface events
// - CAN THUS BE STARVED
// Event Loop
// - helper that pushes callbacks from queue to the call stack
// - only pushes callbacks if no more functions exists on the call stack
