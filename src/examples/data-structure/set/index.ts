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

export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
  const resultSet = new Set<T>(b);

  for (const data of a) {
    resultSet.add(data);
  }

  return resultSet;
}
