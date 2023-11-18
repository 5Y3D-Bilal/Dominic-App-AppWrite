import { Client, Account, Avatars, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  storageid: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  databasesId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  savesCollection: import.meta.env.VITE_APPWRITE_SAVES_COLLECTIONS_ID,
  userCollection: import.meta.env.VITE_APPWRITE_USERS_COLLECTIONS_ID,
  postCollection: import.meta.env.VITE_APPWRITE_POSTS_COLLECTIONS_ID,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint("https://cloud.appwrite.io/v1");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
