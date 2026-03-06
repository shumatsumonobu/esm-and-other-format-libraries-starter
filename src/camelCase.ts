/**
 * Convert a string to camelCase.
 *
 * @example
 * camelCase('hello world') // => 'helloWorld'
 * camelCase('foo-bar-baz') // => 'fooBarBaz'
 * camelCase('FooBar') // => 'fooBar'
 */
export default function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ch, index) =>
      index === 0 ? ch.toLowerCase() : ch.toUpperCase()
    )
    .replace(/[\s\-_]+/g, '');
}
