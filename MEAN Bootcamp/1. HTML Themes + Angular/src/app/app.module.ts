import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { BreadCrumbComponent } from './shared/bread-crumb/bread-crumb.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProgressBarComponent } from './pages/progress-bar/progress-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GraphicComponent } from './pages/graphic/graphic.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    BreadCrumbComponent,
    FooterComponent,
    ProgressBarComponent,
    DashboardComponent,
    NotFoundComponent,
    GraphicComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
