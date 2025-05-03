export function applyOpacityToColor(color: string, opacity: number): string {
  // Ensure opacity is between 0 and 1
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be a value between 0 and 1.");
  }

  // Extract RGB values from hex color
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(color);
  if (!rgb) {
    throw new Error("Invalid color format. Please provide a valid hex color.");
  }

  // Return the color in rgba format
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}
