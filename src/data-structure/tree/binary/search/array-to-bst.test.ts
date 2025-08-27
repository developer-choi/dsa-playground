import {recursiveInorderIsBST} from '@/data-structure/tree/binary/search/is-bst';
import {recursiveArrayToBST} from '@/data-structure/tree/binary/search/array-to-bst';

// yarn test src/data-structure/tree/binary/search/array-to-bst.test.ts
describe('recursiveArrayToBST', () => {
  it('should create a valid BST for a general case', () => {
    const input = [10, 5, 1, 7, 40, 50];
    const root = recursiveArrayToBST(input);
    expect(recursiveInorderIsBST(root)).toBe(true);
  });

  it('should return undefined for an empty array', () => {
    const root = recursiveArrayToBST([]);
    expect(root).toBeUndefined();
  });

  it('should create a single-node tree for a single-element array', () => {
    const root = recursiveArrayToBST([10]);
    expect(root?.data).toBe(10);
    expect(recursiveInorderIsBST(root)).toBe(true);
  });
});
