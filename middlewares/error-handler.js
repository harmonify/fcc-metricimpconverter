module.exports = function (err, req, res, next) {
  const status = err.status || 500;

  res.status(status);

  // render the error page
  if (process.env.NODE_ENV === "test") {
    // only providing error in development
    console.error(err);
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
