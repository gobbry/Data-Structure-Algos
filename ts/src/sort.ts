// Reference: Kata by Primeagen

export function bubbleSort(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; i < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

export function quickSort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}

function qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) {
    return;
  }

  const pivotIdx = partition(arr, lo, hi);
  qs(arr, lo, pivotIdx - 1);
  qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let idx = lo - 1;
  for (let i = lo; i < hi; ++i) {
    if (arr[i] <= pivot) {
      idx++;
      const temp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = temp;
    }
  }
  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
}
