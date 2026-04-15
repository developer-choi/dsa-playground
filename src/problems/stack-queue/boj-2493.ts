/**
 * URL: https://www.acmicpc.net/problem/2493
 * Description: 탑 - N개의 탑이 왼쪽으로 레이저를 쏠 때, 각 탑의 레이저를 수신하는 탑 번호 출력
 */

export function stack(heights: number[]): number[] {
  // index + 1값. 문제에서 index가 아니라 순서기빈이라서.
  const answer: number[] = [];
  const towers: {index: number, height: number;}[] = [];

  for(let i = 0 ; i < heights.length ; i++) {
    const height = heights[i];

    while (towers.length > 0 && towers[towers.length - 1].height < height) {
      towers.pop();
    }

    if (towers.length === 0) {
      answer.push(0);
      towers.push({index: i, height});
      continue;
    }

    const recentTower = towers[towers.length - 1];

    answer.push(recentTower.index + 1);

    if (recentTower.height === height) {
      recentTower.index = i;

    } else {
      towers.push({index: i, height});
    }
  }

  return answer;
}
