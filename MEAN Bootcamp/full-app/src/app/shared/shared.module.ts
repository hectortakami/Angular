import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [CommonModule],
  exports: [
    BreadCrumbComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
  ],
})
export class SharedModule {}
