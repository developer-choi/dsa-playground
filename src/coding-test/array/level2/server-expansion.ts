/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/389479
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function serverExpansionSolution(players: number[], maxUserLimitPerServer: number, operatingTimeLimit: number) {
  let operatingServers: {startedHours: number; count: number;}[] = [];
  let accumalateServerIncreasementCount = 0;

  for (let i = 0 ; i < players.length; i++) {
    const needServerCapacity = Math.floor(players[i] / maxUserLimitPerServer) * operatingTimeLimit;
    const currentCapacity = (operatingServers.length + 1) * maxUserLimitPerServer;

    const isExceed = needServerCapacity > currentCapacity;

    if(isExceed) {
      operatingServers.push({startedHours: i, count: needServerCapacity - operatingServers.length});
      accumalateServerIncreasementCount++;
    }

    operatingServers = operatingServers.filter(({startedHours}) => (i - startedHours + 1) < operatingTimeLimit);
  }

  return accumalateServerIncreasementCount;
}
