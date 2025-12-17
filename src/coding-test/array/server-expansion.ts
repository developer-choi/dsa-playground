/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/389479
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function getAccumulatedServerIncreasementCount(playerCounts: number[], playerCapacityOfServer: number, serverOperatingTime: number): number {
  let accumulatedServerIncreasementCount = 0;
  let operatingServers: {count: number, increasedTime: number}[] = [];

  for(let i = 0; i < playerCounts.length; i++) {
    const playerCount = playerCounts[i];
    const operatingServerCount = operatingServers.reduce((a, b) => a + b.count, 0);
    const maxPlayerCapacity = (operatingServerCount + 1) * playerCapacityOfServer - 1;
    const needServerCount = maxPlayerCapacity > playerCount ? 0 : Math.ceil((playerCount - maxPlayerCapacity) / playerCapacityOfServer);
    accumulatedServerIncreasementCount += needServerCount;

    if (needServerCount) {
      operatingServers.push({count: needServerCount, increasedTime: i});
    }

    operatingServers = operatingServers.filter((({increasedTime}) => (i - increasedTime) < serverOperatingTime - 1));
  }

  return accumulatedServerIncreasementCount;
}
