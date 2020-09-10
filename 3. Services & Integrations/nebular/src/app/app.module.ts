import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Nebular UI
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTooltipModule,
  NbBadgeModule,
  NbToggleModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";

// Translate I18N
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ProfileComponent } from "./components/profile/profile.component";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Nebular Imports
    NbThemeModule.forRoot({ name: "cosmic" }),
    NbSidebarModule.forRoot(),
    BrowserAnimationsModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NbToggleModule,

    // Translate Imports
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
