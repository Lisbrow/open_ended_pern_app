import { getMoodCategory } from './moodUtils';

test('score 4 is positive', () => {
  expect(getMoodCategory(4)).toBe('positive');
});

test('score 3 is neutral', () => {
  expect(getMoodCategory(3)).toBe('neutral');
});

test('score 2 is negative', () => {
  expect(getMoodCategory(2)).toBe('negative');
});

