/**
 * URL: https://www.acmicpc.net/problem/2302
 * Description: 극장 좌석 — 고정된 VIP 좌석을 제외한 나머지 좌석에 인접 교환만 허용할 때 가능한 배치 수
 */

export function dp(seatCount: number, vipSeatArray: number[]): number {
  if (seatCount <= 1) {
    return 1;
  }

  if (vipSeatArray.length === 0) {
    return fibonacci(seatCount);
  }

  let totalSwappableSeatCase: number = 1;
  let previousSeat = vipSeatArray[0];

  if (vipSeatArray[0] !== 1) {
    totalSwappableSeatCase *= fibonacci(vipSeatArray[0] - 1);
  }

  for (let i = 1 ; i < vipSeatArray.length ; i++) {
    const vipSeat = vipSeatArray[i];
    const vipSeatsAreStick = vipSeat === previousSeat + 1

    if (!vipSeatsAreStick) {
      totalSwappableSeatCase *= fibonacci(vipSeat - previousSeat - 1);
    }

    previousSeat = vipSeat;
  }

  const lastVipSeat = vipSeatArray[vipSeatArray.length - 1];

  if (lastVipSeat < seatCount) {
    totalSwappableSeatCase *= fibonacci(seatCount - lastVipSeat);
  }

  return totalSwappableSeatCase;
}

function fibonacci(value: number) {
  const cache: Record<number, number | undefined> = {};

  function internal(value: number): number {
    if (value === 1) {
      return 1;
    }

    if (value === 2) {
      return 2;
    }

    const dataInCache = cache[value];

    if (dataInCache !== undefined) {
      return dataInCache;
    }

    const result = internal(value - 1) + internal(value - 2);
    cache[value] = result;
    return result;
  }

  return internal(value);
}
