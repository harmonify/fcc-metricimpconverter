const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  test("Test Example", function (done) {
    chai
      .request(server)
      .get("/")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isTrue(true, "Example optional error description");
        done();
      });
  });

  suite("GET request to /api/convert", function () {
    const baseUrl = "/api/convert";
    const urlWithInput = (input) => `${baseUrl}?input=${input}`;

    test("Convert a valid input such as 10L", function (done) {
      chai
        .request(server)
        .get(urlWithInput("10L"))
        .end(function (err, res) {
          const { initNum, initUnit, returnNum, returnUnit, string } = res.body;

          assert.equal(res.status, 200);
          assert.equal(initNum, 10);
          assert.equal(initUnit, "L");
          assert.equal(returnNum, 2.64172);
          assert.equal(returnUnit, "gal");
          assert.equal(string, "10 liters converts to 2.64172 gallons");

          done();
        });
    });

    test("Convert an invalid input such as 32g", function (done) {
      chai
        .request(server)
        .get(urlWithInput("32g"))
        .end(function (err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "invalid unit");

          done();
        });
    });

    test("Convert a invalid number such as 3/7.2/4kg", function (done) {
      chai
        .request(server)
        .get(urlWithInput("3/7.2/4kg"))
        .end(function (err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "invalid number");

          done();
        });
    });

    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram", function (done) {
      chai
        .request(server)
        .get(urlWithInput("3/7.2/4kilomegagram"))
        .end(function (err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "invalid number and unit");

          done();
        });
    });

    test("Convert with no number such as kg", function (done) {
      chai
        .request(server)
        .get(urlWithInput("kg"))
        .end(function (err, res) {
          const { initNum, initUnit, returnNum, returnUnit, string } = res.body;

          assert.equal(res.status, 200);
          assert.equal(initNum, 1);
          assert.equal(initUnit, "kg");
          assert.equal(returnNum, 2.20462);
          assert.equal(returnUnit, "lbs");
          assert.equal(string, "1 kilograms converts to 2.20462 pounds");

          done();
        });
    });
  });
});
