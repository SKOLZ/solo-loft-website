export const formatNumber = (number: number) => {
  // Split the number into integer and decimal parts
  let parts = number.toString().split(".");

  // Format the integer part with thousand separators
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Return the formatted number with decimals if they exist
  return parts[1] ? parts[0] + "," + parts[1] : parts[0];
};
