type BinaryNode<T> = {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
};

// Pre-order -> visit then recurse ALL
// In-order -> recurseLeft then visit then recurseRight
// Post-order -> recurse ALL then visit

export function PreOrderSearch(head: BinaryNode<number>): number[] {
  const path: number[] = [];
  PreOrderWalk(head, path);

  return path;
}

function PreOrderWalk(curr: BinaryNode<number>, path: number[]) {
  if (!curr) return;

  path.push(curr.value);
  PreOrderWalk(curr.left, path);
  PreOrderWalk(curr.right, path);
}

export function InOrderSearch(head: BinaryNode<number>): number[] {
  const path: number[] = [];
  InOrderWalk(head, path);

  return path;
}

function InOrderWalk(curr: BinaryNode<number>, path: number[]) {
  if (!curr) return;

  InOrderWalk(curr.left, path);
  path.push(curr.value);
  InOrderWalk(curr.right, path);
}

export function PostOrderSearch(head: BinaryNode<number>): number[] {
  const path: number[] = [];
  PostOrderWalk(head, path);

  return path;
}

function PostOrderWalk(curr: BinaryNode<number>, path: number[]) {
  if (!curr) return;

  PostOrderWalk(curr.left, path);
  PostOrderWalk(curr.right, path);
  path.push(curr.value);
}

export function BinaryTreeBFS(
  head: BinaryNode<number>,
  target: number
): boolean {
  const queue: BinaryNode<number>[] = [head];
  while (queue.length) {
    const curr = queue.shift() as BinaryNode<number>;
    if (curr.value === target) return true;

    if (curr.right) queue.push(curr.right);
    if (curr.left) queue.push(curr.left);
  }

  return false;
}

export function CompareBinaryTree(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null
): boolean {
  if (a === null && b === null) return true;

  if (a === null || b === null) return false;

  if (a.value !== b.value) return false;

  return (
    CompareBinaryTree(a.left, b.left) && CompareBinaryTree(a.right, b.right)
  );
}

export function SearchOnBST(head: BinaryNode<number>, target: number): boolean {
  return search(head, target);
}

function search(curr: BinaryNode<number> | null, target: number): boolean {
  if (!curr) return false;

  if (curr.value === target) return true;

  if (curr.value < target) return search(curr.right, target);

  return search(curr.left, target);
}
