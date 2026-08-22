/**
 * URL: src/problems/hash/wf-2.md
 * Description: 음식 주문 분석 — 가장 많은 종류의 음식을 주문한 유저의 아이디를 알파벳순으로 반환
 */

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
