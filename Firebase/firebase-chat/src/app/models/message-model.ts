import { UserModel } from "./user-model";

export interface MessageModel {
  text: string;
  date: number;
  reply: boolean;
  user: UserModel;
}
