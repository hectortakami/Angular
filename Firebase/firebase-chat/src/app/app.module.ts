import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbChatModule,
  NbSpinnerModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

// Angular Fire Imports
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { ChatComponent } from "./components/chat-user/chat.component";
import { ChatBotComponent } from "./components/chat-bot/chat-bot.component";
import { LoginComponent } from "./components/login/login.component";
import { CropnamePipe } from './services/cropname.pipe';

@NgModule({
  declarations: [AppComponent, ChatComponent, ChatBotComponent, LoginComponent, CropnamePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "dark" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule.forRoot(),
    NbSpinnerModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
