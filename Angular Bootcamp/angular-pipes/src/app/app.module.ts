import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbTreeGridModule,
  NbCardModule,
  NbButtonModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { AppRoutingModule } from "./app-routing.module";

import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import localeFr from "@angular/common/locales/fr";
import { CapitalizePipe } from "./pipes/capitalize.pipe";
import { DomSanitizerPipe } from './pipes/dom-sanitizer.pipe';
import { PasswordPipe } from './pipes/password.pipe';
registerLocaleData(localeEs);
registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, CapitalizePipe, DomSanitizerPipe, PasswordPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "cosmic" }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "en"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
