import express from 'express';
import path from 'path';

import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import dbConnection from './connectDB.js';
import multer from 'multer';

const app = express();

//routes
import authRouter from './routes/auth.js';
import postsRouter from './routes/post.js';
import usersRouter from './routes/users.js';
import catergoryRouter from './routes/categories.js';

//DBConnection
dbConnection('mongodb://localhost:27017/', 'SimpleBlogAPI');

//Store of images
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'images');
  },
  filename: (request, file, cb) => {
    cb(null, 'Simple Blog');
  },
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (request, response) => {
  response.status(200).json({ message: 'file uploaded' });
});

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes appUse Routers
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/post', postsRouter);
app.use('/category', catergoryRouter);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
