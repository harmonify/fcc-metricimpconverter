function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    const num = input.split("/");
    const wholeOrDecimalRe = /[\d]+(\.[\d]+)?/;

    if (num.length === 1) {
      result = num[0].match(wholeOrDecimalRe) ? parseFloat(num[0]) : 1;
    } else if (num.length === 2) {
      result = parseFloat(num[0]) / parseFloat(num[1]);
    } else {
      result = NaN;
    }

    if (isNaN(result)) {
      result = new Error("invalid number");
    }

    return result;
  };

  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (result) {
      return result[0];
    }
    return new Error("invalid unit");
  };

  this.getReturnUnit = function (initUnit) {
    const result = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    if (result[initUnit]) {
      return result[initUnit];
    }

    return new Error("invalid unit");
  };

  this.spellOutUnit = function (unit) {
    const result = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    if (result[unit]) {
      return result[unit];
    }

    return new Error("invalid unit");
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        return new Error("invalid unit");
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
