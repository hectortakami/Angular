import { Component, OnInit, ViewChild } from '@angular/core';
import * as faker from 'faker/locale/es_MX';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  users: { name: string; title: string }[] = [];

  constructor() {
    for (let i = 0; i < 500; i++) {
      var name = faker.name.firstName() + ' ' + faker.name.lastName();
      var title = faker.name.jobTitle();
      this.users.push({
        name: name,
        title: title
      });
    }
  }

  move2Start() {
    this.viewport.scrollToIndex(0);
  }
  move2Middle() {
    const middle = this.users.length / 2;
    this.viewport.scrollToIndex(middle - 1);
  }
  move2End() {
    this.viewport.scrollToIndex(this.users.length);
  }
}
