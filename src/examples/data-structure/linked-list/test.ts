import LinkedList from './index';
import SinglyLinkedList from './SinglyLinkedList';

const linkedListImplementations = [
  {name: 'SinglyLinkedList', Constructor: SinglyLinkedList},
];

describe.each(linkedListImplementations)('$name', ({Constructor}) => {
  let list: LinkedList;

  beforeEach(() => {
    list = new Constructor();
  });

  describe('Initial State', () => {
    it('should be created with an empty list', () => {
      expect(list.length()).toBe(0);
      expect(list.getHead()).toBeUndefined();
      expect(list.getTail()).toBeUndefined();
      expect(list.toString()).toBe('');
    });
  });

  describe('push()', () => {
    it('should add a node to an empty list', () => {
      list.push(10);
      expect(list.length()).toBe(1);
      expect(list.getHead()).toBe(10);
      expect(list.getTail()).toBe(10);
      expect(list.toString()).toBe('10');
    });

    it('should add multiple nodes to the list correctly', () => {
      list.push(1);
      expect(list.length()).toBe(1);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(1);
      expect(list.toString()).toBe('1');

      list.push(2);
      expect(list.length()).toBe(2);
      expect(list.getHead()).toBe(1); // head는 그대로
      expect(list.getTail()).toBe(2); // tail은 변경
      expect(list.toString()).toBe('1,2');

      list.push(3);
      expect(list.length()).toBe(3);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(3);
      expect(list.toString()).toBe('1,2,3');
    });
  });

  describe('get()', () => {
    beforeEach(() => {
      list.push(10);
      list.push(20);
      list.push(30);
    });

    it('should get the data at a specific index', () => {
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(20);
      expect(list.get(2)).toBe(30);
    });

    it('should return undefined for out-of-bounds indices', () => {
      expect(list.get(3)).toBeUndefined();
      expect(list.get(-1)).toBeUndefined();
    });

    it('should return undefined for an empty list', () => {
      expect(new Constructor().get(0)).toBeUndefined();
    });
  });

  describe('insertAt()', () => {
    it('should insert a node at the beginning of an empty list', () => {
      list.insertAt(0, 5);
      expect(list.length()).toBe(1);
      expect(list.getHead()).toBe(5);
      expect(list.getTail()).toBe(5);
      expect(list.toString()).toBe('5');
    });

    it('should insert a node at the beginning of a non-empty list', () => {
      list.push(10);
      list.push(20);
      list.insertAt(0, 5);
      expect(list.length()).toBe(3);
      expect(list.getHead()).toBe(5);
      expect(list.getTail()).toBe(20);
      expect(list.toString()).toBe('5,10,20');
    });

    it('should insert a node in the middle of the list', () => {
      list.push(10);
      list.push(30);
      list.insertAt(1, 20);
      expect(list.length()).toBe(3);
      expect(list.get(1)).toBe(20);
      expect(list.getTail()).toBe(30);
      expect(list.toString()).toBe('10,20,30');
    });

    it('should insert a node at the end of the list', () => {
      list.push(10);
      list.push(20);
      list.insertAt(2, 30); // length와 같은 index에 삽입
      expect(list.length()).toBe(3);
      expect(list.getTail()).toBe(30);
      expect(list.toString()).toBe('10,20,30');
    });

    it('should not do anything for out-of-bounds indices', () => {
      list.push(10);
      list.insertAt(5, 50); // 현재 길이(1)보다 큰 인덱스
      expect(list.length()).toBe(1);
      expect(list.toString()).toBe('10');
    });
  });

  describe('deleteAt()', () => {
    beforeEach(() => {
      list.push(10);
      list.push(20);
      list.push(30);
      list.push(40);
    });

    it('should delete a node from the beginning', () => {
      expect(list.deleteAt(0)).toBe(10);
      expect(list.length()).toBe(3);
      expect(list.getHead()).toBe(20);
      expect(list.toString()).toBe('20,30,40');
    });

    it('should delete a node from the middle', () => {
      expect(list.deleteAt(1)).toBe(20);
      expect(list.length()).toBe(3);
      expect(list.getHead()).toBe(10);
      expect(list.getTail()).toBe(40);
      expect(list.toString()).toBe('10,30,40');
    });

    it('should delete a node from the end', () => {
      expect(list.deleteAt(3)).toBe(40);
      expect(list.length()).toBe(3);
      expect(list.getTail()).toBe(30);
      expect(list.toString()).toBe('10,20,30');
    });

    it('should handle deletion until the list is empty', () => {
      expect(list.deleteAt(0)).toBe(10);
      expect(list.toString()).toBe('20,30,40');
      expect(list.deleteAt(1)).toBe(30); // 20, 40
      expect(list.toString()).toBe('20,40');
      expect(list.deleteAt(1)).toBe(40);
      expect(list.toString()).toBe('20');
      expect(list.getHead()).toBe(20);
      expect(list.getTail()).toBe(20);

      expect(list.deleteAt(0)).toBe(20);
      expect(list.toString()).toBe('');
      expect(list.getHead()).toBeUndefined();
      expect(list.getTail()).toBeUndefined();
      expect(list.length()).toBe(0);
    });

    it('should make the list empty if the only element is deleted', () => {
      const singleItemList = new Constructor();
      singleItemList.push(100);
      expect(singleItemList.deleteAt(0)).toBe(100);

      expect(singleItemList.length()).toBe(0);
      expect(singleItemList.getHead()).toBeUndefined();
      expect(singleItemList.getTail()).toBeUndefined();
    });

    it('should not change the list for out-of-bounds indices', () => {
      expect(list.deleteAt(10)).toBeUndefined();
      expect(list.length()).toBe(4);
      expect(list.toString()).toBe('10,20,30,40');
    });
  });

  describe('findIndex()', () => {
    beforeEach(() => {
      list.push(10);
      list.push(20);
      list.push(30);
      list.push(20); // duplicate
    });

    it('should return the index of a given data', () => {
      expect(list.findIndex(10)).toBe(0);
      expect(list.findIndex(30)).toBe(2);
    });

    it('should return the index of the first occurrence of duplicate data', () => {
      expect(list.findIndex(20)).toBe(1);
    });

    it('should return -1 if data is not found', () => {
      expect(list.findIndex(99)).toBe(-1);
    });

    it('should return -1 for an empty list', () => {
      const emptyList = new Constructor();
      expect(emptyList.findIndex(10)).toBe(-1);
    });
  });
});
