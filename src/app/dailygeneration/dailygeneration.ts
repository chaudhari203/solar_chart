
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Energy } from '../service/energy';

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
  generatedenergy: any[] = [];  
  chartData: any[] = [];

  view: [number, number] = [500, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Energy (kWh)';
  timeline = true;
  doughnut = true;
  showLabels = true;

  dateRange: { begin: Date | null; end: Date | null } = { begin: null, end: null };

  constructor(private energy: Energy) {}

  ngOnInit() {
    this.energy.getEnergyGeneration().subscribe((res: any) => {
      this.generatedenergy = res.daily || [];
      console.log('Daily Data:', this.generatedenergy);

      if (this.generatedenergy.length > 0) {
        const sortedData = [...this.generatedenergy].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        this.dateRange.begin = new Date(sortedData[0].date);
        this.dateRange.end = new Date(sortedData[sortedData.length - 1].date);

        this.updateChart(this.generatedenergy);
      }
    });
  }

  filterData() {
    const start = this.dateRange.begin;
    const end = this.dateRange.end;

    let filtered = this.generatedenergy;

    if (start && end) {
      const normalizedEnd = new Date(end);
      normalizedEnd.setHours(23, 59, 59, 999);

      filtered = this.generatedenergy.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= normalizedEnd;
      });
    } else if (start) {
      filtered = this.generatedenergy.filter(item => {
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

