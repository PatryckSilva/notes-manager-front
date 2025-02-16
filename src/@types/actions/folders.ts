import { INote } from "./notes";

export interface IFolder {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  notes: INote[];
  userId: string;
}
