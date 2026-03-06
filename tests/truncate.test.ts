import { truncate } from '~/mylib';

test('truncates a long string with default suffix', () => {
  expect(truncate('Hello World', 5)).toBe('Hello...');
});

test('returns the original string if shorter than length', () => {
  expect(truncate('Hi', 10)).toBe('Hi');
});

test('supports custom suffix', () => {
  expect(truncate('Hello World', 5, ' [more]')).toBe('Hello [more]');
});

test('handles exact length', () => {
  expect(truncate('Hello', 5)).toBe('Hello');
});
