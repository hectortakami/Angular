import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ItemModel } from 'src/app/models/item';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent {
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];

  constructor(private firebase: FirebaseService) {
    this.firebase.getCollection().subscribe((response: ItemModel[]) => {
      response.forEach(item => {
        this.pieChartLabels.push(item.name);
        this.pieChartData.push(item.votes);
      });
    });
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'white',
        fontSize: 20
      }
    }
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 61, 113, 0.48)',
        'rgba(0, 214, 143, 0.48)',
        'rgba(0, 149, 255, 0.48)',
        'rgba(255, 170, 0, 0.48)'
      ],
      borderColor: 'rgba(143, 155, 179, 0.48)'
    }
  ];
}
