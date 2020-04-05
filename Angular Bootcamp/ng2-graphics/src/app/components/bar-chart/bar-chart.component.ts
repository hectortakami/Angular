import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
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
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public barChartColors: Color[] = [
    {
      // Red
      backgroundColor: 'rgba(255, 61, 113, 0.48)',
      borderColor: 'rgba(255, 61, 113, 0.32)',
      pointBackgroundColor: '#ceceeb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ceceeb'
    },
    {
      // Blue
      backgroundColor: 'rgba(0, 149, 255, 0.48)',
      borderColor: 'rgba(0, 149, 255, 0.32)',
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
