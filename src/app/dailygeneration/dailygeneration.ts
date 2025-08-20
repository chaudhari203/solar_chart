import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dailygeneration',
  imports: [
    CommonModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './dailygeneration.html',
  styleUrls: ['./dailygeneration.css']
})
export class Dailygeneration implements OnInit {

  dailydata = [
    { date: '2025-08-01', energy_kWh: 124.5 },
    { date: '2025-08-02', energy_kWh: 138.2 },
    { date: '2025-08-03', energy_kWh: 140.2 },
    { date: '2025-08-04', energy_kWh: 165.5 },
    { date: '2025-08-05', energy_kWh: 170.0 },
  ];

  chartData: any[] = [];

  view: [number, number] = [500, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Energy(KWH)';
  timeline = true;
  doughnut = true;
  showLabels = true;

dateRange: { begin: Date | null, end: Date | null } = { begin: null, end: null };
  constructor() {}

ngOnInit() {
  const sortedData = [...this.dailydata].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  this.dateRange.begin = new Date(sortedData[0].date);
  this.dateRange.end = new Date(sortedData[sortedData.length - 1].date);

  this.updateChart(this.dailydata);
}

filterData() {
  const start = this.dateRange.begin;
  const end = this.dateRange.end;

  let filtered = this.dailydata;

  if (start && end) {
    const normalizedEnd = new Date(end);
    normalizedEnd.setHours(23, 59, 59, 999);

    filtered = this.dailydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= normalizedEnd;
    });
  } else if (start) {
    filtered = this.dailydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === start.toDateString();
    });
  }

  this.updateChart(filtered);
}


  updateChart(data: any[]) {
    this.chartData = data.map(item => ({
      name: item.date,
      value: item.energy_kWh
    }));
  }
}
