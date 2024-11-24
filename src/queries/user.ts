'use server';

import { db } from '@/db';
import { type InsertUser, type SelectUser, usersTable } from '@/schema/users';
import { eq } from 'drizzle-orm';

export const createUser = async (data: InsertUser): Promise<void> => {
  await db.insert(usersTable).values(data);
};

export const getAllUsers = async (): Promise<SelectUser[]> => db.select().from(usersTable);

export const getUser = async (id: SelectUser['id']): Promise<SelectUser[]> =>
  db.select().from(usersTable).where(eq(usersTable.id, id));

export const updateUser = async (id: SelectUser['id'], data: Partial<Omit<SelectUser, 'id'>>) =>
  db.update(usersTable).set(data).where(eq(usersTable.id, id));

export const deleteUser = async (id: SelectUser['id']) => db.delete(usersTable).where(eq(usersTable.id, id));
