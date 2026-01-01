// TypeScript version of the useRandomImage composable

/**
 * Returns a random cover image path from the covers folder
 * @returns {string} Path to a random cover image
 */
export function getRandomCoverImage(): string {
  const totalCovers = 22; // Total number of cover images
  const randomCoverNumber = Math.floor(Math.random() * totalCovers) + 1;
  return `/images/covers/cover_${randomCoverNumber}.jpg`;
}
