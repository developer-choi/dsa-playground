export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  const resultSet: Set<T> = new Set<T>();

  let smallerSet = a;
  let largerSet = b;

  if (smallerSet.size > largerSet.size) {
    [smallerSet, largerSet] = [largerSet, smallerSet];
  }

  for (const data of smallerSet) {
    if (largerSet.has(data)) {
      resultSet.add(data);
    }
  }

  return resultSet;
}
