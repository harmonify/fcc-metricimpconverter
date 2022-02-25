const { units, unitsMap, unitsLongName } = require("../config").constants;

function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    const num = input.split("/");
    const wholeOrDecimalRe = /^[\d]+(\.[\d]+)?/;

    if (num.length === 1) {
      result = num[0].match(wholeOrDecimalRe) ? parseFloat(num[0]) : 1;
    } else if (num.length === 2) {
      result = parseFloat(num[0]) / parseFloat(num[1]);
    } else {
      result = NaN;
    }

    if (isNaN(result)) {
      result = "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (result === null) {
      return "invalid unit";
    }
    const properUnit = this.filterUnit(result[0]);
    if (units[properUnit] === undefined) {
      return "invalid unit";
    }
    return units[properUnit];
  };

  this.getReturnUnit = function (initUnit) {
    const properUnit = this.filterUnit(initUnit);
    if (unitsMap[properUnit]) {
      return unitsMap[properUnit];
    }
    return "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    const properUnit = this.filterUnit(unit);
    if (unitsLongName[properUnit]) {
      return unitsLongName[properUnit];
    }
    return "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case units.gal:
        result = initNum * galToL;
        break;
      case units.l:
        result = initNum / galToL;
        break;
      case units.mi:
        result = initNum * miToKm;
        break;
      case units.km:
        result = initNum / miToKm;
        break;
      case units.lbs:
        result = initNum * lbsToKg;
        break;
      case units.kg:
        result = initNum / lbsToKg;
        break;
      default:
        return "invalid unit";
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      this.filterUnit(initUnit)
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.filterUnit = function (unit) {
    return unit.toLowerCase();
  };
}

module.exports = ConvertHandler;
