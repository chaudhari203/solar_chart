import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Energy {
  constructor(private http:HttpClient){}
  getEnergyGeneration(){
    return this.http.get('assets/data.json')
  }
  
}
