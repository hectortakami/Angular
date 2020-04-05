import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  // Line Chart
  public lineChartType = 'line';
  // Sets each data set visible or not in chart
  public lineChartLegend = true;

  // Data sets to display in graphic
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // x & y axis declaration
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    legend: {
      labels: { fontColor: 'white' }
    },
    scales: {
      xAxes: [
        {
          id: 'x-axis',
          position: 'bottom',
          ticks: {
            fontColor: '#ceceeb'
          }
        }
      ],
      yAxes: [
        {
          id: 'y-axis',
          position: 'left',
          ticks: {
            fontColor: '#ceceeb'
          }
        }
      ]
    },
    annotation: {
      annotations: []
    }
  };

  // X-axis labes
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];

  // Data set colors
  public lineChartColors: Color[] = [
    {
      // Purple
      backgroundColor: 'rgba(161, 110, 255, 0.32)',
      borderColor: 'rgba(161, 110, 255, 0.48)',
      pointBackgroundColor: '#ceceeb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ceceeb'
    },
    {
      // Green
      backgroundColor: 'rgba(0, 214, 143, 0.32)',
      borderColor: 'rgba(0, 214, 143, 0.48)',
      pointBackgroundColor: '#ceceeb',
      pointBorderColor: '#ffff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ceceeb'
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
}
