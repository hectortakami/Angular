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
      icon: 'bar-chart-2-outline',
      route: './home',
      responsive: true
    },
    {
      title: 'Vote',
      icon: 'checkmark-circle-outline',
      route: './vote',
      responsive: true
    }
  ];
}
