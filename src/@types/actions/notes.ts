import { IUser } from "./user";

export interface INotes {
  id: string;
  title: string;
  content: string;
  user: IUser;
  folderId: string;
}

export interface TCreateNoteBody {
  title: string;
  content: string;
}
