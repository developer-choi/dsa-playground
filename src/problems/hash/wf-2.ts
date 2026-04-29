export function solution(orders: string[]): string[] {
  const orderRecord: Record<string, Set<string>> = {};

  for (const order of orders) {
    const { name, foods } = getOrderDetail(order);

    if (name in orderRecord) {
      foods.forEach(food => orderRecord[name].add(food));
    } else {
      orderRecord[name] = new Set(foods);
    }
  }

  let maxCount = -Infinity;
  let mostUsers: string[] = [];

  for (const name in orderRecord) {
    const foodsCount = orderRecord[name].size;

    if (foodsCount > maxCount) {
      mostUsers = [name];
      maxCount = foodsCount;
    } else if (foodsCount === maxCount) {
      mostUsers.push(name);
    }
  }

  return mostUsers.toSorted();
}

interface OrderDetail {
  name: string;
  foods: string[];
}

function getOrderDetail(order: string): OrderDetail {
  const [name, ...foods] = order.split(' ');
  return { name, foods };
}
