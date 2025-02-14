export const envs = {
  apiUrl: process.env.API_URL as string,
};

export const apiEndpoints = {
  user: {
    login: `${envs.apiUrl}/users/login/`,
    register: `${envs.apiUrl}/users/create/`,
    userByEmail: `${envs.apiUrl}/users/by-email/`,
  },
  notes: {
    findNotesByUser: `${envs.apiUrl}/notes/`,
    findNoteById: `${envs.apiUrl}/notes/by-id`,
    createNote: `${envs.apiUrl}/notes/create`,
    updateNote: `${envs.apiUrl}/notes/update`,
    deleteNote: `${envs.apiUrl}/notes/delete`,
  },
  folders: {
    findFoldersByUser: `${envs.apiUrl}/folders/`,
    createFolder: `${envs.apiUrl}/folders/create/`,
    updateFolder: `${envs.apiUrl}/folders/update`,
    deleteFolder: `${envs.apiUrl}/folders/delete`,
  },
};
