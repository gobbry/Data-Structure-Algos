class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

    def set_next(self, next):
        if isinstance(next, Node):
            self.next = next

    # print node as string
    def __repr__(self):
        return str(self.data)


class LinkedList:

    def __init__(self, head=None):
        self.head = head

    def __iter__(self):
        head = self.head
        while head is not None:
            yield head
            head = head.next

    # print as format: head -> next1 -> next2 -> ...
    def __repr__(self):
        head = self.head
        nodes = []
        while head is not None:
            nodes.append(repr(head))
            head = head.next
        return " -> ".join(nodes)


node1 = Node(123)
linked_list = LinkedList(head=node1)
node2 = Node("a")
node3 = Node(True)
node1.set_next(node2)
node2.set_next(node3)

# traversing through list
for node in linked_list:
    print(node.data)

# print list
print(linked_list)
