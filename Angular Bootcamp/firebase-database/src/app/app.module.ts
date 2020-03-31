import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbListModule,
  NbCardModule,
  NbButtonModule,
  NbSpinnerModule,
  NbAlertModule,
  NbInputModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { RegisterComponent } from "./components/register/register.component";
import { ShowComponent } from "./components/show/show.component";

@NgModule({
  declarations: [AppComponent, RegisterComponent, ShowComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "cosmic" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbAlertModule,
    NbInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
