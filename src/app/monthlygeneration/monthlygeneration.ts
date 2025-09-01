
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { Energy } from '../service/energy';   // ✅ import your service

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  standalone: true,
  selector: 'app-monthlygeneration',
  templateUrl: './monthlygeneration.html',
  styleUrls: ['./monthlygeneration.css'],
  imports: [
    CommonModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Monthlygeneration implements OnInit {
  monthlyData: any[] = [];   // ✅ now will come from JSON
  chartData: any[] = [];
  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Energy (kWh)';

  readonly date = new FormControl(moment());

  constructor(private energy: Energy) {}

  ngOnInit() {
    this.energy.getEnergyGeneration().subscribe((res: any) => {
      // ✅ Extract monthly part
      this.monthlyData = res.monthly || [];
      console.log('Monthly Data:', this.monthlyData);

      const currentMonth = moment().format('YYYY-MM');
      this.updateChart(currentMonth);
    });
  }

  updateChart(selectedMonth?: string) {
    let filteredData = this.monthlyData;

    if (selectedMonth) {
      filteredData = this.monthlyData.filter(d => d.month === selectedMonth);
    }

    this.chartData = [
      {
        name: 'Energy Generated',
        series: filteredData.map(item => ({
          name: item.month,
          value: item.totalenergykWh
        }))
      }
    ];
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    const selectedMonth = ctrlValue.format('YYYY-MM');
    this.updateChart(selectedMonth);
  }
}
