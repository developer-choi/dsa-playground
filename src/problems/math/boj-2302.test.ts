import {dp} from './boj-2302';

const solutions = [
  {name: 'dp', fn: dp},
];

describe.each(solutions)('극장 좌석 > $name', () => {
  describe('General cases', () => {
    it.todo('문제에서 제시한 예시는 만족해야한다.');
  });

  describe('Boundary cases', () => {
    it.todo('VIP 좌석이 서로 딱붙어 있는 경우에도 잘 동작해야한다.');

    it.todo('VIP 좌석이 없는 경우에도 잘 동작해야한다.');

    it.todo('전체 좌석수가 1개여도 잘 동작해야한다.');

    it.todo('전체 좌석수가 0개여도 잘 동작해야한다.');
  });
});
