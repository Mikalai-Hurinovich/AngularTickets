export interface IUser {
  id: number;
  userName: string;
  userPassword?: string;
  userEmail: string;
  isAdmin?: boolean;
}
