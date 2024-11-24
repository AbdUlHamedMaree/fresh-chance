"use server";

import { createUser, deleteUser } from "$/queries/user";
import { insertUserSchema } from "$/schema/users";

export const createUserAction = async (formData: FormData) =>
  createUser(insertUserSchema.parse(Object.fromEntries(formData)));

export const removeUserAction = async (formData: FormData) => {
  deleteUser(Number(formData.get("id")));
};
