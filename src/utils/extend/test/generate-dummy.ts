import {randomNumber, range} from '@forworkchoe/core/utils';

export function randomRotatedNumberArray(length: number, sort: 'asc' | 'desc' = 'asc'): number[] {
  if (length <= 2) {
    throw new TypeError('length must be greater than 2');
  }

  const initialArray = sort === 'asc' ? range(1, length) : range(length, 1);
  const rotateAmount = randomNumber(1, length - 1);
  const partToMove = initialArray.slice(0, rotateAmount);
  const remainingPart = initialArray.slice(rotateAmount);
  return remainingPart.concat(partToMove);
}
