export const round = function (value, decimals) {
  if (value === "" || value === undefined) {
    return "";
  }
  // check and round negative values
  return value >= 0
    ? Number(Math.round(value + "e" + decimals) + "e-" + decimals)
    : Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};
