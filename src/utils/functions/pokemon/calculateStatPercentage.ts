export const MAX_STAT = 255;

export function calculateStatPercentage(stat: number): number {
  return parseFloat(((stat / MAX_STAT) * 100).toFixed(2));
}
