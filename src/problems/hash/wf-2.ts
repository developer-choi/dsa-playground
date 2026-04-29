/**
 * Docs: docs/company-test/wf-2.md
 * Description: 음식 주문 분석 — 가장 많은 종류의 음식을 주문한 유저 목록을 오름차순 반환
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

  for (const name in orderRecord) {
    maxCount = Math.max(orderRecord[name].size, maxCount);
  }

  const mostUsers: string[] = [];

  for (const name in orderRecord) {
    if (orderRecord[name].size === maxCount) mostUsers.push(name);
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
