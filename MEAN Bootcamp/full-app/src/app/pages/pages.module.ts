import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicComponent } from './graphic/graphic.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    GraphicComponent,
    NotFoundComponent,
    ProgressBarComponent,
    PagesComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    DashboardComponent,
    GraphicComponent,
    NotFoundComponent,
    ProgressBarComponent,
    PagesComponent,
  ],
})
export class PagesModule {}
