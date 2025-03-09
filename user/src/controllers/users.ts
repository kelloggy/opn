import { Request, Response } from "express";
import { users, User } from "../models/users";
import { v4 as uuidv4 } from "uuid";

export const register = (req: Request, res: Response): void => {
  const newUser: User = { id: uuidv4(), ...req.body };
  users.push(newUser);
  res.json({ message: "User registered successfully", data: newUser });
};

// Get user profile
export const getProfile = (req: Request, res: Response): void => {
  const user = users.find((u) => u.id === req.params.profileId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "Profile fetched", data: user });
};

// Update user profile
export const updateProfile = (req: Request, res: Response): void => {
  const user = users.find((u) => u.id === req.params.profileId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  Object.assign(user, req.body);
  res.json({ message: "Profile updated", data: user });
};

// Delete user profile
export const deleteProfile = (req: Request, res: Response): void => {
  const index = users.findIndex((u) => u.id === req.params.profileId);
  if (index === -1) {
    res.status(404).json({ message: "User not found" });
  }
  users.splice(index, 1);
  res.json({ message: "Profile deleted" });
};

export const changePassword = (req: Request, res: Response): void => {
  const user = users.find((u) => u.id === req.params.profileId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (user.password != req.body.password) {
    res.status(400).json({ message: "Incorrect password" });
    return;
  }

  user.password = req.body.newPassword;
  res.json({ message: "Password changed successfully" });
};
