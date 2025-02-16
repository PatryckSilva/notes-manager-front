import { IUser } from "./user";

export interface INote {
  id: string;
  title: string;
  content: string;
  user: IUser;
  folderId: string;
}

export interface TCreateNoteBody {
  title: string;
  content: string;
  folderId?: string;
}

export interface TUpdateNoteBody {
  title?: string;
  content?: string;
  folderId?: string;
}
