import { Component } from '@angular/core';
import { Dailygeneration } from './dailygeneration/dailygeneration';
import { Monthlygeneration } from './monthlygeneration/monthlygeneration';

@Component({
  selector: 'app-root',
  imports: [Dailygeneration,Monthlygeneration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(){

  }

}
