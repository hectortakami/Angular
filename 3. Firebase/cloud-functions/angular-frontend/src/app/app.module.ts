import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbRouteTabsetModule,
  NbIconModule,
  NbToastrModule
} from '@nebular/theme';
import { ChartsModule } from 'ng2-charts';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './components/home/home.component';
import { VotesComponent } from './components/votes/votes.component';
import { GraphsComponent } from './components/graphs/graphs.component';

import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, VotesComponent, GraphsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbRouteTabsetModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    ChartsModule,
    HttpClientModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
