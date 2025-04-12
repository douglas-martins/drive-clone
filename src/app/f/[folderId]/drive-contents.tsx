"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FileFolder, FileRow } from "./file-row";
// Important to import only then type, so the client don't import the role db wrapper.
import { type DB_FileType, type DB_FolderType } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";

import "@uploadthing/react/styles.css";

export default function DriveContents(
  props: Readonly<{
    files: DB_FileType[];
    folders: DB_FolderType[];
    parents: DB_FolderType[];
    currentFolderId: number;
  }>,
) {
  const navigate = useRouter();

  function handleFolderClick(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/f/1" className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FileFolder
                key={folder.id}
                folder={folder}
                handleFolderClick={() => handleFolderClick(folder.id)}
              />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <UploadButton
          endpoint="driveUploader"
          input={{ folderId: props.currentFolderId }}
          onClientUploadComplete={() => navigate.refresh()}
        />
      </div>
    </div>
  );
}
