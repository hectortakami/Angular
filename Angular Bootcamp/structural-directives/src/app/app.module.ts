import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Material Imports
import {
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { BodyComponent } from "./components/body/body.component";
import { FooterComponent } from './components/shared/footer/footer.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, BodyComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Material Imports
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
