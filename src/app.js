var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var nutritionRouter = require("./routes/nutrition");
var authRouter = require("./routes/auth");
var userRouter = require("./routes/user");
var filterRouter = require("./routes/filter");
var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

app.use("/", indexRouter);
app.use("/nutrition", nutritionRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/filter", filterRouter);
app.use(limiter); //ngelimit hit

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
  console.log(`API is Running on ${port}`);
});

module.exports = app;
