import {helloWorld} from '@/utils/index';

test('name', () => {
  expect(helloWorld()).toBe('hello world');
});
