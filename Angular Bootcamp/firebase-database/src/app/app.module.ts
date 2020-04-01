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
  NbInputModule,
  NbToastrModule,
  NbIconConfig
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { ReactiveFormsModule } from "@angular/forms";
import { FormularyCrudComponent } from "./components/formulary-crud/formulary-crud.component";
import { ShowComponent } from "./components/show/show.component";

import { HttpClientModule } from "@angular/common/http";
const iconConfig: NbIconConfig = { icon: "", pack: "eva" };

@NgModule({
  declarations: [AppComponent, FormularyCrudComponent, ShowComponent],
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
    NbInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbToastrModule.forRoot(iconConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
