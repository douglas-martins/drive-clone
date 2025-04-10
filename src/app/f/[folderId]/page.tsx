import { db } from "~/server/db";
import DriveContents from "~/app/drive-contents";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
export default async function GoogleDriveClone(
  props: Readonly<{ params: Promise<{ folderId: string }> }>,
) {
  const params = await props.params;

  const parseFolderId = parseInt(params.folderId);

  if (isNaN(parseFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parseFolderId));
  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parseFolderId));

  return <DriveContents files={files} folders={folders} />;
}
