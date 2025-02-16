import { INote } from "./notes";

export interface ICreateFolderBody {
  name: string;
}

export interface IFolder {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  notes: INote[];
  userId: string;
}
