import axios from 'axios';
import { Request, Response } from 'express';
import { User } from '../../interfaces/user';

export const homeRoutes = (req: Request, res: Response) => {
  axios
    .get<User[]>(`${process.env.URI}/api/users`)
    .then((response) => res.render('index', { users: response.data }))
    .catch((err) => {
      res.send(err);
    });
};

export const add_user = (req: Request, res: Response) => {
  res.render('add_user');
};

export const get_user = (req: Request, res: Response) => {
  axios
    .get<User>(`${process.env.URI}/api/users?id=${req.params.id}`)
    .then((response) => res.render('user', { user: response.data }))
    .catch((err) => {
      res.send(err);
    });
};
