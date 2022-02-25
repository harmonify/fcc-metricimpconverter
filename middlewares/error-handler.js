module.exports = function (err, req, res, next) {
  const { NODE_ENV } = process.env;
  const status = err.status || 500;

  res.status(status);

  // render the error page if not in production
  if (NODE_ENV === "test") {
    console.error({
      message: err.message,
      status,
    });
  }

  if (status !== 500) {
    res.json({
      message: err.message,
      status,
    });
  } else {
    res.json({
      message: "Something went wrong",
      status,
    });
  }
};
