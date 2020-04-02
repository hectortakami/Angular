import { Component, OnInit } from "@angular/core";
import { MessageModel } from "src/app/models/message-model";
import { UserModel } from "src/app/models/user-model";
import { FirestoreService } from "src/app/services/firestore.service";
import { FireauthService } from "src/app/services/fireauth.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  messages: MessageModel[] = [];
  user: UserModel = {
    name: "doggy",
    avatar: "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
  };

  constructor(
    private firestore: FirestoreService,
    private fireauth: FireauthService
  ) {
    this.firestore.loadCollection().subscribe((response: MessageModel[]) => {
      this.messages = response;
    });

    this.user = this.fireauth.user;
  }

  fireLogout() {
    this.fireauth.logout();
  }

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
    this.firestore.append2Collection(
      event.message.toString(),
      reply,
      this.user
    );
  }

  ngOnInit(): void {}
}
