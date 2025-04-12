import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { type DB_FileType, type DB_FolderType } from "~/server/db/schema";
import { deleteFile } from "~/server/actions";
export function FileRow(props: Readonly<{ file: DB_FileType }>) {
  const { file } = props;

  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>

        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Delete file"
            onClick={() => {
              void deleteFile(file.id);
            }}
          >
            <Trash2Icon className="text-gray-400" size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FileFolder(
  props: Readonly<{
    folder: DB_FolderType;
    handleFolderClick: () => void;
  }>,
) {
  const { folder, handleFolderClick } = props;

  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-2 text-gray-400">{"folder"}</div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
