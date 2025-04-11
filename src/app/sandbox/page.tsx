import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table, files_table } from "~/server/db/schema";

export default function SandboxPage() {
  const onAction = async () => {
    // This js make the client call this function, not that is executed on the server.
    "use server";

    const folderInsert = await db.insert(folders_table).values(
      mockFolders.map((folder, index) => ({
        id: index + 1,
        name: folder.name,
        parent: index !== 0 ? 1 : null,
      })),
    );
    console.log(folderInsert);

    const fileInsert = await db.insert(files_table).values(
      mockFiles.map((file, index) => ({
        id: index + 1,
        name: file.name,
        // type: file.type,
        size: 5000,
        url: file.url,
        parent: (index % 3) + 1,
      })),
    );
    console.log(fileInsert);
  };

  return (
    <div className="flex flex-col gap-4">
      Sandbox
      <form action={onAction}>
        <button>Seed</button>
      </form>
    </div>
  );
}
