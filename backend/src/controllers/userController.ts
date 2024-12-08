import { Request, Response } from "express";
import { User, UserStore } from "../models/User";

const store = new UserStore();

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await store.getAll();
    res.json(users);
    console.log(users[0].id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: User = await store.getById(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };
    await store.create(user);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
