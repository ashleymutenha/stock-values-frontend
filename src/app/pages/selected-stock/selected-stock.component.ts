import { Component } from '@angular/core';
import { StockServiceService } from 'src/app/stock-service.service';
@Component({
  selector: 'app-selected-stock',
  templateUrl: './selected-stock.component.html',
  styleUrls: ['./selected-stock.component.scss']
})
export class SelectedStockComponent {

  stockValues:any =[]
 

  constructor(public api:StockServiceService){}

  ngOnInit():void{
    this.getStockValues()
    console.log(this.api.stockID)
  }


  // get all stock Values
  getStockValues(){
    this.api.getStockValues().subscribe(res=>{
      for(var value of res){
        this.stockValues.push(value)
      }
    })
  }

  // returns an array of stock Values of selected stock
  selectedStockValues(){
    let selectedValues:any =[]

    this.stockValues.map((value:any)=>{
     
      value.stock_id ==this.api.stockID &&
      selectedValues.push(value) 

    })
   

    return selectedValues
  }


  //export Stock data to backend to be downloaded as json file
  exportStockValues(){
    this.api.exportStockValues(this.selectedStockValues()).subscribe(data =>{
      console.log(data)
    })
  }

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

  //sorts date items descending

  dateFieldsDescending(dataContainer:any){
    let dataArray =dataContainer.sort((a:any,b:any) => Date.parse(b.date) - Date.parse(a.date))

    dataContainer =dataArray

  }

  //sorts date items ascending

  dateFieldsAscending(dataContainer:any){
    let dataArray =dataContainer.sort((a:any,b:any) => Date.parse(a.date) - Date.parse(b.date))

    dataContainer =dataArray
  }
}
