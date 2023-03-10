import { Component, SecurityContext } from '@angular/core';
import { StockServiceService } from 'src/app/stock-service.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-selected-stock',
  templateUrl: './selected-stock.component.html',
  styleUrls: ['./selected-stock.component.scss']
})
export class SelectedStockComponent {

  stockValues:any =[]

  jsonUri:any
 

  constructor(public api:StockServiceService, private sanitizer: DomSanitizer){}

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

      let __response = JSON.stringify(data)
      let blob  = new Blob([__response],{type:'text/json'})
      let url = window.URL.createObjectURL(blob)
      
      this.downloadFile(url,this.generateFileName(data))
     

      

      
    })
  }


  downloadFile(dataHref:any, filename:any){
    var link = document.createElement("a")
    link.href = dataHref
    link.download = filename
    link.click()
  }

  generateFileName(object:any){
   let name:any
    let id = object[0].stock_id
    

    this.api.stockArray.map((value:any)=>{
      value.id ==id ?
      name = value.stock +".json":name
    })
    return name

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
