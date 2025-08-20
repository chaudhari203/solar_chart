
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  standalone: true,
  selector: 'app-monthlygeneration',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './monthlygeneration.html',
  styleUrls: ['./monthlygeneration.css']
})
export class Monthlygeneration implements OnInit {
  monthlyData = [
    { month: '2025-06', totalenergykWh: 4283 },
    { month: '2025-08', totalenergykWh: 3627 },
    { month: '2025-09', totalenergykWh: 1509 },
    { month: '2025-10', totalenergykWh: 6765 }
  ];

  chartData: any[] = [];

  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month ';
  showYAxisLabel = true;
  yAxisLabel = 'Energy (kWh)';

  ngOnInit() {
  this.chartData = [
    {
      name: 'Energy Generated',
      series: this.monthlyData.map(item => ({
        name: item.month,
        value: item.totalenergykWh
      }))
    }
  ];

}

}



