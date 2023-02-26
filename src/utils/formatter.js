export const round = function (value, decimals) {
  if (value === "" || value === undefined) {
    return "";
  }
  // check and round negative values
  return value >= 0
    ? Number(Math.round(value + "e" + decimals) + "e-" + decimals)
    : Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};


export const secondsToTime = function (e, format = "m:s") {
  var h = Math.floor(e / 3600)
    .toString()
    .padStart(2, "0");
  var m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");
  return format === "h:m"
    ? (h > 0 ? h + " hrs " : "") + m + " mins"
    : m + ":" + s;
};