import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  images: any[] = [];
  constructor(private firebase: FirebaseService) {
    this.loading = true;
    this.firebase.loadStorage().subscribe(response => {
      this.images = response;
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
