export {};

// https://school.programmers.co.kr/learn/courses/30/lessons/43238?language=javascript
function solution(personCount: number, simsaTimes: number[]) {
  if (simsaTimes.length >= personCount) {
    return calcMinSimsaTime(personCount, simsaTimes);
  }

  const rate = personCount / simsaTimes.length;

  let minTime = 0; // TODO 모든 사람이 심사 받는데 필요한 최소 시간, 더 키울 수는 없나...?
  let maxTime = simsaTimes.reduce((a, b) => a + b * Math.ceil(rate), 0); // TODO 이거 구하다가 O(n) 나오는데...?
  let result = 0;

  while (minTime <= maxTime) {
    let middleTime = Math.floor((minTime + maxTime) / 2);

    /**
     * n분으로 다 입국심사 가능한지 체크
     * 1. 다 가능 ==> 일단 저장 후 minTime  ~ middle - 1 체크
     * 2. 불가능 ==> middle + 1 ~ maxTime 체크
     */

    if (checkAllPassengersCanSimSa(middleTime, simsaTimes, personCount)) {
      result = middleTime;
      maxTime = middleTime - 1;
    } else {
      minTime = middleTime + 1;
    }
  }

  return result;
}

// TODO 이거 따지다가 O(n) 나오는데...
function checkAllPassengersCanSimSa(totalTime: number, simsaTimes: number[], personCount: number): boolean {
  let accPersonCount = 0;

  for (const simsa of simsaTimes) {
    const person = Math.floor(totalTime / simsa);
    accPersonCount += person;

    if (accPersonCount >= personCount) {
      return true;
    }
  }

  return false;
}

function calcMinSimsaTime(personCount: number, simsaTimes: number[]) {
  const sortedSimsaTimes = simsaTimes.toSorted((a, b) => a - b); // TODO 배열길이 다 필요없는데 필요한만큼만 정렬해도 되는데... 그치만 O(n^2)는 좀...
  return sortedSimsaTimes[personCount - 1];
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: 28
console.log(solution(6, [7, 10]));
// expected: 3
console.log(solution(3, [1, 2, 3, 4, 5, 6]));
