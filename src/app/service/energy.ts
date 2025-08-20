import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Energy {
  constructor(private http:HttpClient){}
  getDailyEnergyGeneration(){
    const url ="http://localhost:3000/daily";
    return this.http.get(url)
  }
  getMonthlyEnergyGeneration(){
    const url ="http://localhost:3000/monthly";
    return this.http.get(url)
  }
}
