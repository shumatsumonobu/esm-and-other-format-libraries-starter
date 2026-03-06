import { camelCase } from '~/mylib';

test('converts space-separated words', () => {
  expect(camelCase('hello world')).toBe('helloWorld');
});

test('converts hyphen-separated words', () => {
  expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
});

test('converts PascalCase to camelCase', () => {
  expect(camelCase('FooBar')).toBe('fooBar');
});

test('handles single word', () => {
  expect(camelCase('hello')).toBe('hello');
});
