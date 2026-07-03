// A curated palette of "tech" colors, also used to tint alias/service chips.
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

// djb2 hash
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
