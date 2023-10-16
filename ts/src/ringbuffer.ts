// Instead of 0 to N, it holds from head to tail where head >= 0 and tail <= N
// Inserting or writing more than N will loop back into the head, idx=this.tail%len
// Need to resize once tail is more than head -> allocate another ring buffer and then memcopy from head to tail
