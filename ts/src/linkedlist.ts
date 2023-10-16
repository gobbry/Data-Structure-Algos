// Linked list are not exactly arrays
// They can grow in size, you can insert or delete elements(push or pop) -> basically tries to solve the weakness of arrays
// Sometimes also called a node-based data structure

// Is a heap-allocated object, NOT a "primitive"/stack-allocated object like arrays
// More expensive in general to search for them

type Node<T> = {
  value: T;
  prev?: Node<T>;
  next?: Node<T>;
};

export class SinglyLinkedList<T> {
  public length: number;
  private head: Node<T>;

  constructor() {
    this.length = 0;
  }

  prepend(item: T): void {}

  insertAt(item: T): void {}

  append(item: T): void {}

  remove(item: T): T | undefined {}

  get(item: T): T | undefined {}

  removeAt(item: T): T | undefined {}
}

export class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  prepend(item: T): void {
    const node = { value: item } as Node<T>;

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) return;

    if (idx === this.length) {
      this.append(item);
      return;
    }
    if (idx === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    const curr = this.getAt(idx) as Node<T>;
    const node = { value: item } as Node<T>;
    node.next = curr;
    node.prev = curr.prev;
    curr.prev = node;
    node.prev.next = curr;
  }

  append(item: T): void {
    this.length++;
    const node = { value: item } as Node<T>;

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;

    this.tail = node;
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.value === item) break;

      curr = curr.next;
    }

    if (!curr) return undefined;

    return this.removeNode(curr);
  }

  get(idx: number): T | undefined {
    return this.getAt(idx).value;
  }

  removeAt(idx: number): T | undefined {
    const node = this.getAt(idx);

    if (!node) return undefined;
    return this.removeNode(node);
  }

  private removeNode(node: Node<T>): T | undefined {
    this.length--;
    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;

    node.prev = node.next = undefined;

    return node.value;
  }

  private getAt(idx: number): Node<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }

    return curr;
  }
}
