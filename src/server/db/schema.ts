// Guaranty that the schema is only available on the server, sending a RuntimeError if it's imported on the client.
// import "server-only";

import {
  bigint,
  text,
  index,
  singlestoreTableCreator,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),

    name: text("name").notNull(),
    size: bigint("size", { mode: "number", unsigned: true }).notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (tempTable) => {
    return [
      index("idx_parent").on(tempTable.parent),
      index("idx_owner_id").on(tempTable.ownerId),
    ];
  },
);

export type DB_FileType = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),

    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (tempTable) => {
    return [
      index("idx_parent").on(tempTable.parent),
      index("idx_owner_id").on(tempTable.ownerId),
    ];
  },
);

export type DB_FolderType = typeof folders_table.$inferSelect;
