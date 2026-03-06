/**
 * Truncate a string to the given length and append a suffix.
 *
 * @example
 * truncate('Hello World', 5) // => 'Hello...'
 * truncate('Hi', 10) // => 'Hi'
 * truncate('Hello World', 5, ' [more]') // => 'Hello [more]'
 */
export default function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}
