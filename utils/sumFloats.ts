export const sumFloats = (...numbers: number[]): number =>
  +numbers.reduce((sum, num) => sum + num, 0).toFixed(3);
