
import BookRouter from './routes/book'
import CategoryRouter from './routes/category'
import BorrowRouter from './routes/borrow'
import UserRouter from './routes/user'
import LoginRouter from './routes/login'
import LogoutRouter from './routes/logout'

import express, { Request, Response, NextFunction } from 'express'
import session from "express-session"
import { SECRET_KEY } from './constant'


var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//connect to DB
require('./model/index')
var MongoClient = require("mongodb").MongoClient

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session check user login
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 1000 }//expired in 1 day
  })
)

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.url.includes("/login") && !req.url.includes("/logout")) {
    if (!(req.session as any).user) {
      return res.status(401).json({ message: "Please Login!" })
    }
  }
  next()
})

//api
app.use('/api/books', BookRouter)
app.use('/api/categories', CategoryRouter)
app.use('/api/borrows', BorrowRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', LoginRouter)
app.use('/api/logout', LogoutRouter)


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

//server port
app.listen('3005', () => {
  console.log('server start 3005');

})

module.exports = app;
