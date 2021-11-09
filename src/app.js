import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import jwtMiddleware from "./middlewares/jwt";
import cors from "cors";
import db from "./models/index";

const app = express();

const sequelize = db.sequelize;
(async () => {
  await sequelize.sync();
 })();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(jwtMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(createError(500, 'Internal Server Error'));
});

module.exports = app;
