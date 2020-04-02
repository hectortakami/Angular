import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { MessageModel } from "../models/message-model";
import { UserModel } from "../models/user-model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  private chatsCollection: AngularFirestoreCollection<MessageModel>;

  constructor(private firestore: AngularFirestore) {}

  loadCollection() {
    this.chatsCollection = this.firestore.collection<MessageModel>(
      "chats",
      query => query.orderBy("date", "desc").limit(10)
    );
    return this.chatsCollection.valueChanges().pipe(
      map((response: MessageModel[]) => {
        return response.reverse();
      })
    );
  }

  append2Collection(msgText: string, msgReply: boolean, msgUser: UserModel) {
    let newMsg: MessageModel = {
      text: msgText,
      date: new Date().getTime(),
      reply: msgReply,
      user: msgUser
    };
    return this.chatsCollection.add(newMsg);
  }
}
