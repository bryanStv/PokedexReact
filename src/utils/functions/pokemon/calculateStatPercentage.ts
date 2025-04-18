//export const MAX_STAT = 255;
const MAX_STATS = {
  hp: 255, // Blissey
  attack: 181, // Kartana
  defense: 250, // Eternamax
  specialAttack: 194, // Mega Mewtwo Y
  specialDefense: 250, // Eternamax
  speed: 200, // Regieleki
};

export function calculateStatPercentage(
  stat: number,
  statType: keyof typeof MAX_STATS
): number {
  const max = MAX_STATS[statType];
  return parseFloat(((stat / max) * 100).toFixed(2));
}
