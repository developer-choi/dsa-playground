export {};

/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/43238?language=javascript
 * 왜 정확도 4번에서 런타임 에러가 나는지 모르겠음...
 */
function solution(personCount: number, simsaTimes: number[]) {
  if (simsaTimes.length >= personCount) {
    return calcMinSimsaTime(personCount, simsaTimes);
  }

  const rate = personCount / simsaTimes.length;

  let minTime = 0;
  let maxTime = simsaTimes.reduce((a, b) => a + b * Math.ceil(rate), 0);
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
  const sortedSimsaTimes = simsaTimes.toSorted((a, b) => a - b);
  return sortedSimsaTimes[personCount - 1];
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: 28
console.log(solution(6, [7, 10]));
// expected: 3
console.log(solution(3, [1, 2, 3, 4, 5, 6]));
