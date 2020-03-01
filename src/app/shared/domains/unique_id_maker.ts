export function getUniqueStr(myStrong?: number): number {
  let strong = 1000;
  if (myStrong) {
    strong = myStrong;
  }
  return new Date().getTime() + Math.floor(strong * Math.random());
}
