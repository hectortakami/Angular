import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbProgressBarModule,
  NbButtonModule,
  NbSpinnerModule,
  NbListModule,
  NbIconModule,
  NbRouteTabsetModule,
  NbAlertModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { FirebaseService } from './services/firebase.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireStorageModule, // storage
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbProgressBarModule,
    NbButtonModule,
    NbRouteTabsetModule,
    NbSpinnerModule,
    NbListModule,
    NbIconModule,
    NbAlertModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
