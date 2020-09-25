## Google Maps

Angular Maps Module (AGM) Docs: https://angular-maps.com/
Create Google Maps [API KEY]: https://console.cloud.google.com/google/maps-apis/start

```console
npm install @agm/core --save
```

_app.module.ts_

```typescript
import { AgmCoreModule } from '@agm/core';
// ...
imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_MAPS_API_KEY'
    })
  ],
```

###### AGM Usage

- Create Map
  _google-map.component.html_

  ```html
  <agm-map
    (mapClick)="clickOnMap($event)"
    [latitude]="<MAP_LATITUDE>"
    [longitude]="<MAP_LONGITUDE>"
  >
    <!-- ALL MARKERS GOES HERE -->
  </agm-map>
  ```

  _google-map.component.ts_

  ```typescript
  mapMarkers: MapMarker[] = [];
  latitude = 40.73061;
  longitude = -73.935242;

   onClickMap(event: Event){
    // event returns an object coords with the clicked latitude and longitude
    // coords = { lat: <number>, lng: <number>}
  }
  ```

* Map Marker

  The best practice is create a model to manage the map market properties
  _map-market.ts_

  ```typescript
  export class MapMarker {
    constructor(
      public latitude: number,
      public longitude: number // More MapMarker properties if needed
    ) {}
  }
  ```

  _google-map.component.html_

  ```html
    <agm-marker
    [latitude]="<MARKER_LATITUDE>"
    [longitude]="<MARKER_LONGITUDE>"
    >
      <!-- INFO WINDOW GOES HERE -->
    </agm-map>
  ```

* Info Window (Dialog when marker is clicked)

  _google-map.component.html_

  ```html
  <agm-info-window>
    <!-- Window design goes here -->
  </agm-info-window>
  ```
