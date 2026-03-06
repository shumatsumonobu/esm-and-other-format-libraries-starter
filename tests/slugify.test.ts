import { slugify } from '~/mylib';

test('converts spaces to hyphens', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

test('trims and collapses whitespace', () => {
  expect(slugify('  Foo  BAR  baz ')).toBe('foo-bar-baz');
});

test('removes special characters', () => {
  expect(slugify('Hello, World!')).toBe('hello-world');
});

test('handles empty string', () => {
  expect(slugify('')).toBe('');
});
