/**
 * Doc: https://docs.google.com/document/d/1kPMKSQSaUhiVBOv7nfBv-ah8zsnPXWUA-q0L6hVsqNo/edit?tab=t.0#heading=h.8o8ypziyq6rk
 * Official: https://www.geeksforgeeks.org/dsa/find-first-and-last-positions-of-an-element-in-a-sorted-array/
 */
function bruteForceFindLeaders(array: number[]): number[] {
  /**
   * 1번은 1번 우측 다 뒤지고
   * 2번은 2번 우측 다 뒤지고
   * 3번은 ... (이하 생략)
   * 그래서 문제없을 때마다 결과 배열에 추가 추가
   */

  const result: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let isLeader = true; // 우측에 뭐 더 없는경우 에는 그냥 Leader로 보기 위함
    const checkingLeader = array[i];

    for (let j = i + 1; j < array.length; j++) {
      if (checkingLeader < array[j]) {
        isLeader = false;
        break;
      }
    }

    if (isLeader) {
      result.push(checkingLeader);
    }
  }

  return result;
}

// Expected: []
console.log(bruteForceFindLeaders([]));

// Expected: [1]
console.log(bruteForceFindLeaders([1]));

// Expected: [17, 5, 2]
console.log(bruteForceFindLeaders([16, 17, 4, 3, 5, 2]));

// Expected: [5, 2]
console.log(bruteForceFindLeaders([1, 2, 3, 4, 5, 2]));
