## Angular Directives

#### Structural Directives

https://angular.io/guide/structural-directives#structural-directives

- ##### \*ngIf
  ```html
  <div *ngIf="<boolean expression>"></div>
  ```
- ##### \*ngForOf

  ```html
  <li *ngFor="let item in collection; let i=index;"></li>
  ```

- ##### \*ngSwitch
  ```html
  <span [ngSwitch]="<switch value>">
    <div *ngSwitchCase="<first case>"></div>
    <div *ngSwitchCase="<second case>"></div>
    <div *ngSwitchCase="<third case>"></div>
    ...
    <div *ngSwitchDefault></div>
  </span>
  ```

#### Attribute Directives

- ##### ngStyle
  ```html
  <div [ngStyle]="{'css-property': <css-value>}""></div>
  ```
- ##### ngClass
  ```html
  <div [ngClass]="{'class': <boolean>}"></div>
  ```
