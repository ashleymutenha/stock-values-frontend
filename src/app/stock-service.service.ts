import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable
 } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  url = "http://localhost:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    }),
  };


  stockID:any

  stockArray:any

  constructor(private http:HttpClient) { }


  getStocks() :Observable<any>{
   return this.http.get(`${this.url}/getStocks`)
  }


  getStockValues() :Observable<any>{
    return this.http.get(`${this.url}/getStockValues`)
  }

  exportStockValues(data:any) :Observable<any>
  {
    return this.http.post(`${this.url}/exportStockValues`,JSON.stringify(data),this.httpOptions)
  }
}