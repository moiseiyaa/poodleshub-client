/**
 * Common color names for puppies
 * This provides a static list of typical puppy colors for the application
 */
export const getAvailableColors = (): string[] => {
  return [
    'black',
    'white',
    'golden',
    'cream',
    'apricot',
    'chocolate',
    'black and white',
    'red',
    'red and white',
    'blue merle',
    'sable'
  ];
};

/**
 * Get formatted color names for display
 * Converts lowercase color names to proper case
 */
export const getFormattedColors = (): string[] => {
  const colors = getAvailableColors();
  return colors.map(color => 
    color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
  );
};

/**
 * Get puppies by color (placeholder for API integration)
 */
export const getPuppiesByColor = async (color: string) => {
  // This would typically make an API call
  // For now, return empty array to prevent errors
  return [];
};

/**
 * Check if a specific color is available in any puppy
 */
export const isColorAvailable = (color: string): boolean => {
  const availableColors = getAvailableColors();
  return availableColors.includes(color.toLowerCase());
};
