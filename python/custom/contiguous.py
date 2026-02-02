import time
import random
from dataclasses import dataclass
import array


@dataclass
class Node:
    value: int
    next: 'Node' = None
    prev: 'Node' = None


SIZE = 1_000_000
EVERY_NTH = random.randint(0, 10)
TRIALS = 100


def test_contiguous_orderbook():
    # create array
    arr = array.array('i', range(SIZE))

    # start benchmark
    start = time.perf_counter_ns()

    sum = 0
    for i in range(0, SIZE, EVERY_NTH):
        sum += arr[i]

    end = time.perf_counter_ns()
    return end - start


def test_linked_orderbook():
    # create doubly linked list
    head = Node(0)
    current = head
    for i in range(1, SIZE):
        new_node = Node(i)
        new_node.prev = current
        current.next = new_node
        current = new_node

    # start benchmark
    start = time.perf_counter_ns()

    sum = 0
    current = head
    while current:
        sum += current.value
        if current.value % EVERY_NTH == 0:
            temp = current.next
            if current.prev:
                current.prev.next = current.next
            if current.next:
                current.next.prev = current.prev
            current = temp
        else:
            current = current.next

    end = time.perf_counter_ns()
    return end - start


def test_heap_orderbook():
    # create heap
    heap = list(range(SIZE))

    # start benchmark
    start = time.perf_counter_ns()

    sum = 0
    idx = 0
    while idx < SIZE:
        sum += heap[idx]

        parent = (idx - 1) // 2
        left = 2 * idx + 1
        right = 2 * idx + 2
        if parent >= 0:
            sum += heap[parent]
        if left < SIZE:
            sum += heap[left]
        if right < SIZE:
            sum += heap[right]
        idx += 1

    end = time.perf_counter_ns()
    return end - start


def run_benchmark(num_trials):
    contiguous_times = []
    linked_times = []
    heap_times = []

    for _ in range(num_trials):
        contiguous_times.append(test_contiguous_orderbook())
        linked_times.append(test_linked_orderbook())
        heap_times.append(test_heap_orderbook())

    avg_contiguous = sum(contiguous_times) / num_trials / 1_000_000
    avg_linked = sum(linked_times) / num_trials / 1_000_000
    avg_heap = sum(heap_times) / num_trials / 1_000_000

    print(f"Contiguous orderbook simulation: {avg_contiguous:.2f}ms")
    print(f"Linked list orderbook simulation: {avg_linked:.2f}ms")
    print(f"Heap orderbook simulation: {avg_heap:.2f}ms")
    print(f"Linked/Contiguous ratio: {avg_linked/avg_contiguous:.2f}x slower")
    print(f"Heap/Contiguous ratio: {avg_heap/avg_contiguous:.2f}x slower")


if __name__ == "__main__":
    run_benchmark(num_trials=TRIALS)
