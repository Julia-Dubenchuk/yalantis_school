import express from 'express';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { homeRoutes, add_user, get_user } from '../services/render';
import { create, find } from '../controller/controller';

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb): void => cb(null, 'uploads/'),
  filename: (req, file, cb): void => cb(null, 'photo' + path.extname(file.originalname)),
});

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback | any): void => {
  const filetypes = /jpeg|jpg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only type jpg!');
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', add_user);

/**
 *  @description add users
 *  @method GET /user
 */
route.get('/:id', get_user);

/**
 *  @description create user
 *  @method POST /api/users
 */
route.post('/api/users', upload.single('photo'), create);

/**
 *  @description get users
 *  @method GET /api/users
 */
route.get('/api/users', find);

export default route;
