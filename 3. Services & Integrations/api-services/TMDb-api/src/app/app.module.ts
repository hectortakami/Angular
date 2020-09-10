import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbRouteTabsetModule,
  NbBadgeModule,
  NbSpinnerModule,
  NbAlertModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { MoviesComponent } from "./components/movies-home/movies.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { SearchComponent } from "./components/search/search.component";
import { CropTitlePipe } from "./services/crop-title.pipe";
import { DefaultImagePipe } from "./services/default-image.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponent,
    SearchComponent,
    CropTitlePipe,
    DefaultImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "dark" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbRouteTabsetModule,
    NbBadgeModule,
    NbSpinnerModule,
    NbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
