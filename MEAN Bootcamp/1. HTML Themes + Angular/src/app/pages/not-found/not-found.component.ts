import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: [],
})
export class NotFoundComponent implements OnInit {
  year = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
