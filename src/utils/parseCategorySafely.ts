export default function parseCategorySafely(category: string[] | string | null) {
  if (!category) return '';

  if (typeof category === 'string') return category;

  if (category.length > 1) return category.join(', ');

  return category[0];
}
