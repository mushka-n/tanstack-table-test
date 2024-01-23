export const addF = (...numbers: number[]): number =>
  +numbers.reduce((sum, num) => sum + num, 0).toFixed(3);
