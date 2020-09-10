import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbAlertModule,
  NbSelectModule,
  NbRadioModule,
  NbListModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { TemplateFormComponent } from "./components/template-form/template-form.component";
import { ReactiveFormComponent } from "./components/reactive-form/reactive-form.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, TemplateFormComponent, ReactiveFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbAlertModule,
    NbSelectModule,
    NbListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
