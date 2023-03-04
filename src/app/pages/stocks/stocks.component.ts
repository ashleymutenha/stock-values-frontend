import { Component, Input } from '@angular/core';
import {StockServiceService } from '../../stock-service.service';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent {
   
  stocks:any =[]



  constructor(private api:StockServiceService){}


  ngOnInit():void {

    this.getStocks()

  }


  getStocks(){

    this.api.getStocks().subscribe(res=>{

      for( var data of res){
        this.stocks.push(data)
      }

    })
    this.api.stockArray = this.stocks
  }

  selectStock(id:any){
    this.api.stockID = id

   
  }


  //gives lighgreen background to selected stock
  styleSelectedStock(id:any){
     if(id == this.api.stockID){
      return "table-row selectedStock"
     }
     else{
      return "table-row"
     }
  }

  //order elements in ascending Order by a selected data field

  orderAscending(dataField:any, dataArray:any){
    let dataContainer = dataArray.sort((first: any, second: any) =>
    first[dataField] > second[dataField]
      ? 1
      : second[dataField] > first[dataField]
      ? -1
      : 0
  );

  dataArray = dataContainer;


  }

  //order elements in descending Order by a selected data field

  orderDescending(dataField:any, dataArray:any){
    let dataContainer = dataArray.sort((first: any, second: any) =>
    first[dataField] < second[dataField]
      ? 1
      : second[dataField] < first[dataField]
      ? -1
      : 0
  );

  dataArray = dataContainer;

  }

 

  //search functionality implementation

  searchStockValues(event:any){
    if(event.target.value.length ==0){
      this.stocks =this.api.stockArray
    }

    else{
    let resultantArray:any=[]
    for(var value of this.api.stockArray){

      for (const[key ,_value] of Object.entries(value)){
        if(value[key].toString().toLowerCase().includes(event.target.value.toLowerCase())){
          resultantArray.push(value)
        }
        
      }
    }
    this.stocks = resultantArray
  }
}



}
