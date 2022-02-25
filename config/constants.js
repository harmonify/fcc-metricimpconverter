const units = {
  gal: "gal",
  L: "L",
  mi: "mi",
  km: "km",
  lbs: "lbs",
  kg: "kg",
};

const unitsLongName = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

const unitsMap = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};


module.exports = {
  units,
  unitsLongName,
  unitsMap,
};
