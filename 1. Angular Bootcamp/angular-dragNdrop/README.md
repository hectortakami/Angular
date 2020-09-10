## NG-Faker

https://www.npmjs.com/package/faker

```console
npm install faker --save
npm install @types/faker --save
```

_faker-usage.component.ts_

```typescript
import * as faker from 'faker';
// If the data needs to be regional (in this case names in spanish from Mexico)
// import * as faker from 'faker/locale/es_MX'
```

## Drag & Drop | Virtual Scroll

Install Component Development Kit (CDK)

```console
    npm install @angular/cdk
```

- ##### Drag & Drop

  _app.module.ts_

  ```typescript
  import { DragDropModule } from '@angular/cdk/drag-drop';
  // ...
  imports: [
    DragDropModule
  ],
  ```

  _drag-&-drop.component.html_

  ```html
  <!-- Container of draggable elements -->
  <nb-card-body
    cdkDropList
    #DropListID="cdkDropList"
    [cdkDropListData]="listData"
    [cdkDropListConnectedTo]="[<DropListID>, <DropListID>, ...]"
    (cdkDropListDropped)="onDrop($event)"
  >
    <!-- Draggable element -->
    <nb-alert cdkDrag *ngFor="let item of listData; let i = index">
      <!-- Content -->
    </nb-alert>
  </nb-card-body>
  ```

  _drag-&-drop.component.ts_

  ```typescript
  import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem
  } from '@angular/cdk/drag-drop';
  // ...
  listData = ['Get to work', 'Go home', ...];
  // More DropList data must be declared here as well

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Drag & Drop elements in the same DropList
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move elements from one DropList to another
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  ```

- ##### Virtual Scroll

  _app.module.ts_

  ```typescript
  import { ScrollingModule } from '@angular/cdk/scrolling';
  // ...
  imports: [
    ScrollingModule
  ],
  ```

  _virtual-scroll.component.html_

  ```html
  <cdk-virtual-scroll-viewport itemSize="125" style="height: 100%">
    <nb-list-item
      *cdkVirtualFor="let user of users; let i = index; let counter = count"
    >
      <nb-user
        class="animated slideInLeft slow"
        size="giant"
        [name]="user.name"
        [title]="user.title"
        badgeText="{{ i + 1 }}/{{ counter }}"
        badgeStatus="primary"
        badgePosition="bottom right"
      >
      </nb-user>
    </nb-list-item>
  </cdk-virtual-scroll-viewport>
  ```

  _virtual-scroll.component.ts_

  ```typescript
  import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
  // ...

  // Declare the scroll container as TS element to work with
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  // Scroll position funtions
  move2Start() {
      this.viewport.scrollToIndex(0);
  }
  move2Middle() {
      const middle = items.length / 2;
      this.viewport.scrollToIndex(middle - 1);
  }
  move2End() {
      this.viewport.scrollToIndex(items.length);
  }
  ```
