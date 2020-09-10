## Chart.js (ng2-charts)

https://valor-software.com/ng2-charts/

##### Installation

```console
npm install --save ng2-charts
npm install --save chart.js
```

_app.module.ts_

```typescript
import { ChartsModule } from 'ng2-charts';
// ...
imports: [
  ChartsModule
  // ...
];
```

##### Chart.js Usage

- Line Chart
  https://valor-software.com/ng2-charts/#/LineChart

- Bar Chart
  https://valor-software.com/ng2-charts/#/BarChart

- Pie Chart
  https://valor-software.com/ng2-charts/#/PieChart

- Radar Chart
  https://valor-software.com/ng2-charts/#/RadarChart

Note: Add a width & height of 100% to make the chart fit responsively the content

```html
<canvas baseChart height="100%" width="100%" ...> </canvas>
```
