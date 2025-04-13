import "server-only";
import { db } from ".";
import { files_table, folders_table } from "./schema";

export async function createFile(payload: {
  file: { name: string; size: number; url: string; parent: number };
  userId: string;
}) {
  return await db.insert(files_table).values({
    ...payload.file,
    ownerId: payload.userId,
  });
}

export async function onboardUser(userId: string) {
  const rootFolder = await db
    .insert(folders_table)
    .values({
      name: "Root",
      ownerId: userId,
      parent: null,
    })
    .$returningId();
  const rootFolderId = rootFolder[0]!.id;

  await db.insert(folders_table).values([
    {
      name: "Trash",
      ownerId: userId,
      parent: rootFolderId,
    },
    {
      name: "Shared",
      ownerId: userId,
      parent: rootFolderId,
    },
    {
      name: "Documents",
      ownerId: userId,
      parent: rootFolderId,
    },
  ]);

  return rootFolderId;
}
