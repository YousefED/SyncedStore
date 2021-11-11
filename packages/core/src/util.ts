/**
 * Filter a SyncedStore array
 * @param arr array to filter
 * @param filter predicate to filter the array `arr` by
 */
export function filterArray<T>(arr: T[], filter: (obj: T) => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!filter(arr[i])) {
      arr.splice(i, 1);
    }
  }
}
