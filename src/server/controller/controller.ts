import Userdb from '../model/model';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Request, Response } from 'express';
import { User } from '../../interfaces/user';

// create and save new user
export const create = async (req: any, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be emtpy!' });
    return;
  }

  if (req.file) {
    await sharp(req.file.path)
      .resize(200, 200)
      .toFile(`${req.file.destination}crop_${req.file.filename}`);
    fs.unlinkSync(req.file.path);
  }

  // new user
  const user = new Userdb({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  // save user in the database
  user
    .save(user)
    .then((data: User) => {
      res.status(200).send({ id: data.id });

      if (req.file) {
        fs.mkdir(path.join(`uploads/`, data.id), (err) => {
          if (err) throw err;

          fs.rename(
            `${req.file.destination}crop_${req.file.filename}`,
            `uploads/${data.id}/${req.file.filename}`,
            async (err) => {
              if (err) throw err;
              console.log('Successfully renamed!');
            }
          );
        });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating a create operation',
      });
    });
};

// retrieve and return all users / retrive and return a single user
export const find = (req: Request, res: Response) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data: User) => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id });
        } else {
          res.send(data);
        }
      })
      .catch(() => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id });
      });
  } else {
    Userdb.find()
      .then((users: User[]) => {
        res.send(users);
      })
      .catch((err: Error) => {
        res
          .status(500)
          .send({ message: err.message || 'Error Occurred while retriving user information' });
      });
  }
};
