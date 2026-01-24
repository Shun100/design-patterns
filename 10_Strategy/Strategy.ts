export {}

import { bubbleSort, insertionSort } from './sortAlgorithms';

interface SortStrategy {
  sort(list: number[]): number[];
}

class BubbleSort implements SortStrategy {
  sort(list: number[]): number[] {
    return bubbleSort(list);
  }
}

class InsertionSort implements SortStrategy {
  sort(list: number[]): number[] {
    return insertionSort(list);
  }
}

class SortContext {
  constructor(private strategy: SortStrategy) {}

  sort(list: number[]): number[] {
    return this.strategy.sort(list);
  }
}

function main(): void {
  const list = [3, 6, 8, 53, 23, 45, 65, 1, 9];

  const bubbleSortStrategy = new BubbleSort();
  const insertionSortStrategy = new InsertionSort();

  const bubbleSortContext = new SortContext(bubbleSortStrategy);
  const insertionSortContext = new SortContext(insertionSortStrategy);

  console.log(bubbleSortContext.sort(list));
  console.log(insertionSortContext.sort(list));
}

main();