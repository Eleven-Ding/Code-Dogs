export function formatPostItemTime(time: string) {
  const date = new Date(time);
  return date.toLocaleString();
}
