// Array: allocation is all up-front, can't insert but O(1) for write, get -> also, you need to allocate A LOT at the start
// Linked list: always uses less memory, can insert but O(n) for write or get, MUST linear search
// If you need random access into the data structure, use an array

// ArrayList allows array access with the ability to grow
// On initialization, it allocates a bunch (or based on given hint) and starts to write
// Once it reaches capacity, it memcpy to another MUCH bigger array and then starts to write from there
// Thus, you get O(1) for arrays and instant random access but don't need to allocate too much from the start

// ArrayList are good for normal arrays & stack implementations BUT can be really bad for queue implementations (O(n) for enqueue and deque)
// Watch primeagen's DSA course to understand!

// O(1) get, O(1) push/pop, O(N) enqueue/deque
export class ArrayList<T extends number> {
  public capacity: number;
  public length: number;
  //Array is alr an ArrayList, do not use []
  //js numbers are 64-bit floating point
  private float64buf: Float64Array;

  constructor(length: number) {
    const buf = new ArrayBuffer(length * 8);
    this.float64buf = new Float64Array(buf);
    this.capacity = length;
    this.length = 0;
  }

  prepend(item: T): void {
    if (this.length === this.capacity) {
      this.capacity *= 1.5;
      const buf = new ArrayBuffer(this.capacity * 8);
      const newArr = new Float64Array(buf);
      newArr.set(this.float64buf);
      this.float64buf = newArr;
    }

    return this.insertAt(item, 0);
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.capacity) return undefined;

    for (let i = this.capacity; i > idx + 1; --i) {
      this.float64buf[i] = this.float64buf[i - 1];
    }
    this.float64buf[0] = item;
  }

  append(item: T): void {
    if (this.length > this.capacity) {
      this.capacity *= 1.5;
      const buf = new ArrayBuffer(this.capacity * 8);
      const newArr = new Float64Array(buf);
      newArr.set(this.float64buf);
      this.float64buf = newArr;
    }

    this.float64buf[this.length] = item;
    this.length++;
  }

  remove(item: T): T | undefined {
    for (let i = 0; i < this.capacity; i++) {
      if (this.float64buf[i] == item) return this.removeAt(i);
    }
  }

  get(idx: number): T | undefined {
    return this.float64buf[idx] as T;
  }

  removeAt(idx: number): T | undefined {
    if (idx > this.capacity) return undefined;

    const res = this.float64buf[idx];
    this.length = idx;
    for (let i = idx; i < this.capacity - 1; i++) {
      this.float64buf[idx] = this.float64buf[idx + 1];
    }
    this.float64buf[this.capacity - 1] = undefined;

    return res as T;
  }
}
