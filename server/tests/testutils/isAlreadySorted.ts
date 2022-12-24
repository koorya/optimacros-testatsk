export const isArraySorted = <T>(arr: T[], cmp: (a: T, b: T) => number) => {
  const n = arr.length;
  for (let i = 1; i < n; ++i) {
    if (cmp(arr[i - 1], arr[i]) > 0) {
      return false;
    }
  }

  return true;
};
