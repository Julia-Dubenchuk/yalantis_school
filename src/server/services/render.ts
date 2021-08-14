import axios from 'axios';
import { Request, Response } from 'express';
import { User } from '../../interfaces/user';

export const homeRoutes = (req: Request, res: Response) => {
  // Make a get request to /api/users
  axios
    .get<User[]>('http://localhost:3000/api/users')
    .then((response) => res.render('index', { users: response.data }))
    .catch((err) => {
      res.send(err);
    });
};

export const add_user = (req: Request, res: Response) => {
  res.render('add_user');
};
