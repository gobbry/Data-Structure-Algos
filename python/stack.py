from collections import deque


class StackByList:

    def __init__(self):
        self.stack = []

    def empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

    def push(self, el):
        self.stack.append(el)

    def peek(self):
        return None if self.empty() else self.stack[0]

    def pop(self):
        return None if self.empty() else self.stack.pop()


class StackByDeque:

    def __init__(self):
        self.stack = deque()

    def empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

    def push(self, el):
        self.stack.append(el)

    def peek(self):
        return None if self.empty() else self.stack[-1]

    def pop(self):
        return None if self.empty() else self.stack.pop()


stack = StackByList()
stack.push("a")
stack.push("b")

# first peek & pop
print(f"Size: {stack.size()}")
print(f"Peek: {stack.peek()}. Pop: {stack.pop()}")

# second peek & pop
print(f"Size: {stack.size()}")
print(f"Peek: {stack.peek()}. Pop: {stack.pop()}")

# third peek & pop
print(f"Size: {stack.size()}")
print(f"Peek: {stack.peek()}. Pop: {stack.pop()}")
