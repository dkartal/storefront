import { Request, Response } from "express";
import { User, UserStore } from "../models/User";

const store = new UserStore();

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await store.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: User = await store.getById(parseInt(req.params.id));
    res.status(200).json(user);
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
    const created = await store.create(user);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
