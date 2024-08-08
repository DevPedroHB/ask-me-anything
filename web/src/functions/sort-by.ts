export function sortBy<T>(
  arr: T[],
  key: keyof T | (keyof T)[],
  action: "asc" | "desc" = "asc",
) {
  return arr.sort((a, b) => {
    const keys = Array.isArray(key) ? key : [key];

    for (const k of keys) {
      const valueA = a[k];
      const valueB = b[k];

      if (valueA < valueB) return action === "asc" ? -1 : 1;
      if (valueA > valueB) return action === "asc" ? 1 : -1;
    }

    return 0;
  });
}
