# Routing & Navigation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Routes & Parameters

- Navigate in HTML Template

```html
<a [routerLink]="['/<route>']" routerLinkActive="active"> </a>
```

- Navigate from TS component

```javascript
import { Router } from "@angular/router";

this.router.navigate(["/<route>", "<params?>"]);
```

- Retreive Params from route

```javascript
import { ActivatedRoute } from "@angular/router";

this.activatedRouter.params.subscribe(myParams => {
  // TODO params values in 'myParams' variable
});
```

[Angular.io Router Docs](https://angular.io/guide/router)
