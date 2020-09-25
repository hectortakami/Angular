import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbIconModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HttpClientModule } from '@angular/common/http';
import { SanitizePipe } from './services/sanitize.pipe';

@NgModule({
  declarations: [AppComponent, SanitizePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbActionsModule,
    NbActionsModule,
    NbIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
