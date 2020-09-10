import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  year = new Date().getFullYear();
  tabs: any[] = [
    {
      title: 'Home',
      icon: 'archive',
      responsive: true,
      route: './home'
    },
    {
      title: 'Upload',
      icon: 'cloud-upload',
      responsive: true,
      route: ['./upload']
    }
  ];
}
