/**
 * Capitalize the first letter of a string.
 *
 * @example
 * capitalize('hello') // => 'Hello'
 * capitalize('hello world') // => 'Hello world'
 */
export default function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
