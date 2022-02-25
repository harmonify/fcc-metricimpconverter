"use strict";

const expect = require("chai").expect;
const { ConvertHandler } = require("../controllers");
const { ErrorWithStatus } = require("../utilities");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  /**
   * GET /api/convert?[input]
   *
   * Convert the input to appropriate unit (metric/imp)
   *
   * Params:
   * -  input: string
   *
   * Responses:
   * -  200 Success
   * -  400 Bad Request, client send an invalid `input`.
   * -  500 Server Error, if there are any uncaught exceptions.
   */
  app.get("/api/convert", (req, res, next) => {
    try {
      let { input } = req.query;
      if (!input) {
        throw new ErrorWithStatus("invalid input", 200);
      }
      input = input.toLowerCase();

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      const initNumIsInvalid = initNum === "invalid number";
      const initUnitIsInvalid = initUnit === "invalid unit";

      // we passed 200 here because FCC's test suite expects a success
      if (initNumIsInvalid && initUnitIsInvalid) {
        throw new ErrorWithStatus("invalid number and unit", 200);
      } else if (initNumIsInvalid) {
        throw new ErrorWithStatus("invalid number", 200);
      } else if (initUnitIsInvalid) {
        throw new ErrorWithStatus("invalid unit", 200);
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({ initNum, initUnit, returnNum, returnUnit, string });
    } catch (err) {
      next(err);
    }
  });
};
