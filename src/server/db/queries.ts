import "server-only";

import { db } from ".";
import { files_table, folders_table } from "~/server/db/schema";
import { and, asc, eq, isNull } from "drizzle-orm";

export function getFolders(folderId: number) {
  return db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, folderId))
    .orderBy(asc(folders_table.id));
}

export function getFiles(folderId: number) {
  return db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, folderId))
    .orderBy(asc(files_table.id));
}

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(folders_table)
      .where(eq(folders_table.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0].parent;
  }

  return parents;
}

export async function getFolderById(folderId: number) {
  const folder = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.id, folderId));

  return folder[0];
}

export async function getRootFolderForUser(userId: string) {
  const folder = await db
    .select()
    .from(folders_table)
    .where(
      and(eq(folders_table.ownerId, userId), isNull(folders_table.parent)),
    );

  return folder[0];
}
