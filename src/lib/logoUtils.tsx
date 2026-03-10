// A curated palette of "tech" colors that look great with Bloom/Glow
const LOGO_PALETTE = [
  '#ff0055', // Neon Red/Pink
  '#00f3ff', // Cyan
  '#ffd700', // Gold
  '#ff4d00', // Orange Red
  '#bfff00', // Lime
  '#00ff9f', // Spring Green
  '#00bfff', // Sky Blue
  '#9900ff', // Violet
  '#ffffff', // White
  '#bd00ff', // Electric Purple
  '#ff00aa', // Hot Pink
  '#2a00ff', // Deep Blue
];

// Better hash function (djb2)
const getHash = (str: string): number => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return Math.abs(hash);
};

export const stringToPaletteColor = (str: string): string => {
  const hash = getHash(str);
  const index = hash % LOGO_PALETTE.length;
  return LOGO_PALETTE[index];
};

export type PolyType = 'icosa' | 'octa' | 'dodeca';

export const getPolyType = (key: string): PolyType => {
  const types: PolyType[] = ['icosa', 'octa', 'dodeca'];
  // Using the same hash function for consistency
  const hash = getHash(key);
  return types[hash % types.length];
};