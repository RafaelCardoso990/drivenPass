import joi from "joi";
import { CreateUserData } from "../services/authService.js";

export const signUpSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required().min(10),
});

export const signInSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});