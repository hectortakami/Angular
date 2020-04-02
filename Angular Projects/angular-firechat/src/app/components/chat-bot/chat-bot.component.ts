import { Component, OnInit } from "@angular/core";
import { MessageModel } from "src/app/models/message-model";
import { UserModel } from "src/app/models/user-model";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-chat-bot",
  templateUrl: "./chat-bot.component.html",
  styleUrls: ["./chat-bot.component.scss"]
})
export class ChatBotComponent implements OnInit {
  messages: MessageModel[] = [];

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
    const msgUser: UserModel = {
      name: userName,
      avatar: avatar
    };
    this.firestore.append2Collection(event.message.toString(), reply, msgUser);
  }

  constructor(private firestore: FirestoreService) {
    this.firestore.loadCollection().subscribe((response: MessageModel[]) => {
      this.messages = response;
    });
  }

  ngOnInit(): void {}
}
