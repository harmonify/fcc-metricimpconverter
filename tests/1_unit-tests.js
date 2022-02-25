const chai = require("chai");
let assert = chai.assert;

const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Test Example", function () {
    assert.isTrue(true, "Example optional error description");
  });

  test("convertHandler should correctly read a whole number input", function () {
    const inputs = {
      "32L": 32,
      "1gal": 1,
      "2km": 2,
      "1lbs": 1,
      "1kg": 1,
      "10mi": 10,
    };

    for (let input in inputs) {
      assert.equal(convertHandler.getNum(input), inputs[input]);
    }
  });

  test("convertHandler should correctly read a decimal number input", function () {
    const inputs = {
      "3.2L": 3.2,
      "0.01gal": 0.01,
      "0.001km": 0.001,
      "0.80lbs": 0.8,
      "4.0kg": 4.0,
      "4.4423mi": 4.4423,
    };

    for (let input in inputs) {
      assert.equal(convertHandler.getNum(input), inputs[input]);
    }
  });

  test("convertHandler should correctly read a fractional input", function () {
    const inputs = {
      "1/2L": 0.5,
      "1/4gal": 0.25,
      "1/8km": 0.125,
      "1/16lbs": 0.0625,
      "1/1kg": 1,
      "1/10mi": 0.1,
    };

    for (let input in inputs) {
      assert.equal(convertHandler.getNum(input), inputs[input]);
    }
  });

  test("convertHandler should correctly read a fractional input with a decimal", function () {
    const inputs = {
      "1.5/2L": 0.75,
      "3/1.5gal": 2,
      "1.5/1.5km": 1,
      "1.75/2lbs": 0.875,
      "1.5/1kg": 1.5,
      "1.5/10mi": 0.15,
    };

    for (let input in inputs) {
      assert.equal(convertHandler.getNum(input), inputs[input]);
    }
  });

  test("convertHandler should correctly return an error on a double-fraction", function () {
    const inputs = [
      "1/2/3L",
      "1.1/2/3gal",
      "1/2.2/3km",
      "1/2/3.3lbs",
      "1.1/2.2/3kg",
      "1.1/2/3.3mi",
      "1/2.2/3.3mi",
      "1.2/2.2/3.3mi",
    ];

    inputs.forEach((input) => {
      assert.equal(convertHandler.getNum(input), "invalid number");
    });
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    const inputs = ["L", "gal", "km"];

    inputs.forEach((input) => {
      assert.equal(
        convertHandler.getNum(input),
        1,
        `${input} expected to be 1`
      );
    });
  });

  test("convertHandler should correctly read each valid input unit", function () {
    const inputs = {
      "32L": "L",
      "1gal": "gal",
      "2km": "km",
      "1lbs": "lbs",
      "1kg": "kg",
      "10mi": "mi",
    };

    for (let input in inputs) {
      assert.equal(convertHandler.getUnit(input), inputs[input]);
    }
  });

  test("convertHandler should correctly return an error for an invalid input unit", function () {
    const inputs = ["a", "b", "c", "d", "e"];

    for (let input in inputs) {
      assert.equal(convertHandler.getUnit(input), "invalid unit");
    }
  });

  test("convertHandler should return the correct return unit for each valid input unit", function () {
    const inputs = {
      L: "gal",
      gal: "L",
      kg: "lbs",
      lbs: "kg",
      km: "mi",
      mi: "km",
    };

    for (let input in inputs) {
      assert.equal(convertHandler.getReturnUnit(input), inputs[input], "Expected " + input + " to be " + inputs[input]);
    }
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
    const inputs = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    for (let input in inputs) {
      assert.equal(convertHandler.spellOutUnit(input), inputs[input]);
    }
  });

  // test `convert` function
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  const delta = 0.00001;

  test("convertHandler should correctly convert gal to L", function () {
    const initNum = 32;
    const result = initNum * galToL;
    assert.closeTo(convertHandler.convert(initNum, "gal"), result, delta);
  });

  test("convertHandler should correctly convert L to gal", function () {
    const initNum = 10;
    const result = initNum / galToL;
    assert.closeTo(convertHandler.convert(initNum, "L"), result, delta);
  });

  test("convertHandler should correctly convert mi to km", function () {
    const initNum = 16;
    const result = initNum * miToKm;
    assert.closeTo(convertHandler.convert(initNum, "mi"), result, delta);
  });

  test("convertHandler should correctly convert km to mi", function () {
    const initNum = 32;
    const result = initNum / miToKm;
    assert.closeTo(convertHandler.convert(initNum, "km"), result, delta);
  });

  test("convertHandler should correctly convert lbs to kg", function () {
    const initNum = 78;
    const result = initNum * lbsToKg;
    assert.closeTo(convertHandler.convert(initNum, "lbs"), result, delta);
  });

  test("convertHandler should correctly convert kg to lbs", function () {
    const initNum = 80;
    const result = initNum / lbsToKg;
    assert.closeTo(convertHandler.convert(initNum, "kg"), result, delta);
  });
});
