export function isTranslateNotEmpty(obj: Object) {
  for (const [, value] of Object.entries(obj)) {
    if (typeof value === 'string' && !value.trim()) return false;
  }
  return true;
}
