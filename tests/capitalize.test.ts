import { capitalize } from '~/mylib';

test('capitalizes the first letter', () => {
  expect(capitalize('hello')).toBe('Hello');
});

test('leaves already capitalized strings unchanged', () => {
  expect(capitalize('Hello')).toBe('Hello');
});

test('handles empty string', () => {
  expect(capitalize('')).toBe('');
});

test('capitalizes only the first letter of a sentence', () => {
  expect(capitalize('hello world')).toBe('Hello world');
});
