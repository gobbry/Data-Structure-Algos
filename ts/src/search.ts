// Reference: Kata by Primeagen

// Unordered, this is how indexOf works! (check the V8 source code)
// O(N)
export function linearSearch(arr: number[], target: number): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return true;
    }
  }

  return false;
}

// Good if ordered
// Alternative interface -> binarySearch(arr, low, high)
// Calculate middle point by taking ⌊low + (high-low)/2⌋ where ⌊x⌋ is the floor function of x
// IMPORTANT NOTE implementation is [low,high) -> inclusive of low but exclusive of high -> you can get off by 1 very easily if you confuse it
// O(logN)
export function binarySearch(arr: number[], target: number): boolean {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const middle = Math.floor(low + (high - low) / 2);
    if (arr[middle] === target) {
      return true;
    }

    if (arr[middle] > middle) {
      high = middle;
      continue;
    } else {
      low = middle + 1;
    }
  }

  return false;
}

// Alternative if ordered but not as fast as binary search -> note it's a different use case hence different interface
// Solves the two crystal balls problem by jumping in sqrt of N and then walking through
// Don't use cube or quad because as you increase the root, it becomes more linear!
// O(sqrt(n))
export function jumpSearch(arr: boolean[]): number {
  const jump = Math.floor(Math.sqrt(arr.length));

  let i = jump;
  for (; i < arr.length; i += jump) {
    if (arr[i]) break;
  }

  i -= jump;

  for (let j = 0; j < jump && i < arr.length; ++j) {
    if (arr[i]) return i;
  }

  return -1;
}
