import { Component } from '@angular/core';
import { ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent {
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      labels: { fontColor: 'white' }
    }
  };
  public radarChartLabels: Label[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  // Data set colors
  public radarChartColors: Color[] = [
    {
      // Yellow
      backgroundColor: 'rgba(255, 170, 0, 0.32)',
      borderColor: 'rgba(255, 170, 0, 0.48)'
    },
    {
      // Red
      backgroundColor: 'rgba(255, 61, 113, 0.32)',
      borderColor: 'rgba(255, 61, 113, 0.48)'
    }
  ];

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
