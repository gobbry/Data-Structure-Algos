from binarytree import tree, bst, heap

binary_tree = tree(height=3, is_perfect=False)
print(binary_tree)

binary_search_tree = bst(height=3, is_perfect=True)
print(binary_search_tree)

max_heap = heap(height=3, is_max=True)
print(max_heap)

min_heap = heap(height=3, is_max=False)
print(min_heap)


# Creating node class
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Function to insert in BST
    def insert(self, val):
        # if value is lesser than the value of the parent node
        if val < self.val:
            if self.left:
                # if we still need to move towards the left subtree
                self.left.insert(val)
            else:
                self.left = Node(val)
                return
        # if value is greater than the value of the parent node
        else:
            if self.right:
                # if we still need to move towards the right subtree
                self.right.insert(val)
            else:
                self.right = Node(val)
                return

# Function to search in BST
    def search(self, val):
        # if value to be searched is found
        if val == self.val:
            return str(val)+" is found in the BST"
        # if value is lesser than the value of the parent node
        elif val < self.val:
            # if we still need to move towards the left subtree
            if self.left:
                return self.left.search(val)
            else:
                return str(val)+" is not found in the BST"
        # if value is greater than the value of the parent node
        else:
            # if we still need to move towards the right subtree
            if self.right:
                return self.right.search(val)
            else:
                return str(val)+" is not found in the BST"

    # function to print a BST

    def PrintTree(self):
        if self.left:
            self.left.PrintTree()
        print(self.val),
        if self.right:
            self.right.PrintTree()


# Creating root node
root = Node(27)
# Inserting values in BST
root.insert(14)
root.insert(35)
root.insert(31)
root.insert(10)
root.insert(19)
# searching the values
print(root.search(7))
print(root.search(14))
root.PrintTree()


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def to_binary_tree(items):
    """Create binary tree from list of values."""
    n = len(items)
    if n == 0:
        return None

    def inner(index=0):
        """Closure function using recursion to build tree"""
        if n <= index or items[index] is None:
            return None

        node = TreeNode(items[index])
        node.left = inner(2 * index + 1)
        node.right = inner(2 * index + 2)
        return node

    return inner()


# Usage:
root = to_binary_tree([5, 3, 6, 2, 4, None, 7])
