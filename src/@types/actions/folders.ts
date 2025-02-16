import { INotes } from "./notes";

export interface IFolder {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  notes: INotes[];
  userId: string;
}
