import "server-only";
import { db } from ".";
import { files_table } from "./schema";

export async function createFile(payload: {
  file: { name: string; size: number; url: string; parent: number };
  userId: string;
}) {
  return await db.insert(files_table).values({ ...payload.file, parent: 1 });
}
