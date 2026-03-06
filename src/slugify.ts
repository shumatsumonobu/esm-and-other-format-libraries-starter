/**
 * Convert a string into a URL-friendly slug.
 *
 * @example
 * slugify('Hello World') // => 'hello-world'
 * slugify('  Foo  BAR  baz ') // => 'foo-bar-baz'
 */
export default function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
