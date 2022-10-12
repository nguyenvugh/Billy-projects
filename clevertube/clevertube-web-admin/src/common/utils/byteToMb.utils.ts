export function byteToMb(size: number) {
  const value = (size / (1024 * 1024)).toFixed(2);
  return value;
}
