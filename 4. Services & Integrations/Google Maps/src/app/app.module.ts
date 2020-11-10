import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AgmCoreModule } from "@agm/core";

import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbToastrModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { GoogleMapComponent } from "./components/google-map/google-map.component";
import { MapMarkerDialogComponent } from "./components/map-marker-dialog/map-marker-dialog.component";

@NgModule({
  declarations: [AppComponent, GoogleMapComponent, MapMarkerDialogComponent],
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
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCcTAoRy5qZnQbqPilCbqmsY2cFVcv5Jjc"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
