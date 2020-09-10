import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbRouteTabsetModule,
  NbInputModule,
  NbListModule,
  NbAlertModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { HomeComponent } from "./components/home/home.component";
import { SearchComponent } from "./components/search/search.component";
import { ArtistComponent } from "./components/artist/artist.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";

import { HttpClientModule } from "@angular/common/http";
import { ArtistCardComponent } from "./components/shared/artist-card/artist-card.component";
import { LoadingComponent } from "./components/shared/loading/loading.component";
import { SanitizePipe } from "./pipes/sanitize.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistComponent,
    NavbarComponent,
    ArtistCardComponent,
    LoadingComponent,
    SanitizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "dark" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbRouteTabsetModule,
    NbIconModule,
    HttpClientModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
