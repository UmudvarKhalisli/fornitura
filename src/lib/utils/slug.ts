export function slugify(text: string): string {
  const map: Record<string, string> = {
    ə: 'e', ü: 'u', ö: 'o', ğ: 'g', ş: 's', ç: 'c',
    ı: 'i', İ: 'i', Ə: 'e', Ü: 'u', Ö: 'o', Ğ: 'g', Ş: 's', Ç: 'c',
  };
  return text
    .toLowerCase()
    .split('')
    .map((c) => map[c] || c)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
