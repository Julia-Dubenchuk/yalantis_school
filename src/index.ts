import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import route from './server/routes/router';
import connectDB from './server/database/connection';

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));

fs.access('./uploads', (err) => {
  if (err) {
    fs.mkdirSync('./uploads');
  }
});

// load images
app.use('/uploads', express.static(path.resolve('uploads')));

// load routers
app.use('/', route);

app.listen(PORT, () => console.log('Start!!!'));
