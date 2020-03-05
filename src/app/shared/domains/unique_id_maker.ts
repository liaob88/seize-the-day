export function getUniqueStr(): number {
  const strong = 1000;
  return new Date().getTime() + Math.floor(strong * Math.random());
}
