"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");
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
      const { input } = req.query;

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      const initNumIsInvalid = initNum === "invalid number";
      const initUnitIsInvalid = initUnit === "invalid unit";
      if (initNumIsInvalid && initUnitIsInvalid) {
        throw new ErrorWithStatus("invalid number and unit", 400);
      } else if (initNumIsInvalid) {
        throw new ErrorWithStatus("invalid number", 400);
      } else if (initUnitIsInvalid) {
        throw new ErrorWithStatus("invalid unit", 400);
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
