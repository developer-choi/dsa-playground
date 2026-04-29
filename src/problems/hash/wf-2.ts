/**
 * Docs: docs/company-test/wf-2.md
 * Description: 음식 주문 분석 — 가장 많은 종류의 음식을 주문한 유저 목록을 오름차순 반환
 */

export function hash(orders: string[]): string[] {
  const orderRecord: Record<string, Set<string>> = {};

  for (const order of orders) {
    const { name, foods } = getOrderDetail(order);

    if (name in orderRecord) {
      foods.forEach(food => orderRecord[name].add(food));
    } else {
      orderRecord[name] = new Set(foods);
    }
  }

  const countRecord: Record<string, number> = {};

  for (const name in orderRecord) {
    countRecord[name] = orderRecord[name].size;
  }

  const maxCount = Math.max(...Object.values(countRecord));
  const mostUsers: string[] = [];

  for (const name in countRecord) {
    if (countRecord[name] === maxCount) mostUsers.push(name);
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
