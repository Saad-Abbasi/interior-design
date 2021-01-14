import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {DataSharingService} from '../../../shared/data-sharing.service'
export interface Closets {
  index:number;
  boxWidthTest:string;
  cols:number;
  widthInCm?:string;
}
export interface Tile {
  index: number;
  color: string;
  cols:  number;
  rows:  number;
  text:  string;
}
@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetWidth2:number;
  cabnetHeight:number;
  cabnetHeight2:number;
  cabnetDepth:number;
  maxWidth:number;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  price = 0.00;
  cupBoardSpace = '';
  fullClosetValue:number;
  shortClosetValue:number;
  shortIsDisable:boolean;
  closets: Closets[] = [];
  numberOfBigBoxes:number;
  boxForm:FormGroup;
  slope:boolean;

  constructor(private _sharedData:DataSharingService) { }

  ngOnInit(): void {
    this.slope = false;
    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetWidth2 = result.cabnetWidth2;
      this.cabnetHeight2 = result.cabnetHeight2
      this.cabnetDepth = result.cabnetDepth;
      this.cupBoardSpace = result.cabnetWidth;
      var getInNum = result.cabnetWidth;
      getInNum.toString().substring(0,2);
      this.maxWidth = getInNum;
      console.log(result.cabnetDepth)
      this.calculateWidth(this.maxWidth);
    });
    //form for validateion 
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });

  }
  removeTile =(closet)=>{
    
    if(closet.cols == 2){
      const index = this.closets.indexOf(closet);

      let boxCmSize = this.fullClosetValue;
      this.price -= 2.45 * boxCmSize;
      this.price = parseFloat(this.price.toFixed(2));

      this.availableWidth =  this.currentWidth  -= this.fullClosetValue;
      this.closets.splice(index, 1);
      
      this.validateBoxForm();
    }
    else
    {
    const index = this.closets.indexOf(closet)

    let boxCmSize = this.shortClosetValue;
    this.price -= 2.45 * boxCmSize;
    this.price = parseFloat(this.price.toFixed(2));

    this.availableWidth = this.currentWidth  -= this.shortClosetValue;
    this.closets.splice(index, 1);

    this.validateBoxForm();

    }
  }

  addTile = (boxSize)=>{
    
    if(this.currentWidth <= this.maxWidth){
      this.availableWidth = this.maxWidth - this.currentWidth;
      if(boxSize == 2 && this.availableWidth >= this.fullClosetValue){
        
        let boxCmSize = this.fullClosetValue;
        this.price += 2.45 * boxCmSize;
        this.price = parseFloat(this.price.toFixed(2));

        this.boxWidth = boxSize;
        this.currentWidth += this.fullClosetValue;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 , cols: boxSize,boxWidthTest:`${100/this.numberOfBigBoxes}`+'%',widthInCm:this.fullClosetValue.toFixed(1)+'cm'}
        this.closets.push(itemNew)
        boxSize = 0;
        this.validateBoxForm();
      }
      else if(boxSize == 1 && this.availableWidth >= this.shortClosetValue){

        let boxCmSize = this.shortClosetValue;
        this.price += 2.45 * boxCmSize;
        this.price = parseFloat(this.price.toFixed(2));

        let numberOfSmallBoxes = this.numberOfBigBoxes*2;
        this.boxWidth = boxSize;
        this.currentWidth += this.shortClosetValue;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 ,  cols: boxSize,boxWidthTest:`${100/numberOfSmallBoxes}`+'%',widthInCm:this.shortClosetValue.toFixed(1)+'cm'}
        this.closets.push(itemNew)
        boxSize = 0;

        this.validateBoxForm();
      }
      else{
        alert('Width size exceeds')
      }
    }
    this._sharedData.sendClosetLayout(this.closets);
    
  }

  validateBoxForm(){
    if(this.availableWidth < 30){
      this.boxForm.setValue({
        boxFull:'abc'
      });
      this._sharedData.updatePrice(this.price);
    }
    else{
      this.boxForm.setValue({
        boxFull:null
      })
    }
  }


   //Calculating width
   calculateWidth(w){
    if(w >= 250){
     
     //for extraction of first digit
     var number = w;
     // convert number to a string, then extract the first digit
     var dig1 = String(number).charAt(0);
     // convert the first digit back to an integer
     var firstDigit = Number(dig1); 
      if(w/firstDigit < 117){
        this.numberOfBigBoxes = firstDigit;
        // this.shortIsDisable = true;
        this.fullClosetValue = w/firstDigit - 0.01;   //to "-0.01 to match the size "
        this.shortClosetValue = this.fullClosetValue/2;
      }
      else{
        firstDigit = firstDigit+.5;
        firstDigit = Number(firstDigit) //back to number
        this.numberOfBigBoxes = firstDigit;
        // this.shortIsDisable = true;
        this.fullClosetValue = w/firstDigit- 0.01;   //to "-0.01 to match the size "
        this.shortClosetValue = this.fullClosetValue/2;
      }

    }
    
    else{
      alert('Wrong input');

    }
  }




  //  calculateWidth(w){
  //    if(w<115){
  //      //Do subtract 10 for left right 
  //      w = w-10;
  //     //  extract the value for short closet
  //     this.numberOfBigBoxes = 4;
  //     this.shortIsDisable = true;
      
  //      return this.fullClosetValue = w;
  //     //  this.shortClosetValue = w/2;
  //    }
  //    else if(w >= 115 && w < 200){
  //      w = w-10;
  //      let tempShort = w/3;
       
  //      let tempFull = tempShort *2;
  //      this.shortClosetValue = tempShort;
  //      this.fullClosetValue = tempFull;
  //      this.numberOfBigBoxes = 3; //for Width set
  //     // this.shortIsDisable = false;
      
  //    }
  //    else if(w >= 200 && w < 360)
  //    {
  //      w = w-10;
  //      let tempFull = w/3;
  //      let tempShort = tempFull/2;
  //      this.shortClosetValue = tempShort;
  //      this.fullClosetValue = tempFull;
  //      this.numberOfBigBoxes = 3; //For width
  //    }
  //    else if(w >=  360 && w < 460)
  //    {
  //      w = w-10;
  //      let tempFull = w/4;
  //      let tempShort = tempFull/2;
  //      this.shortClosetValue = tempShort;
  //      this.fullClosetValue = tempFull;
  //      this.numberOfBigBoxes = 4;
  //    }
  //    else if(w >=  460 && w < 560)
  //    {
  //      w = w-10;
  //      let tempFull = w/5;
  //      let tempShort = tempFull/2;
  //      this.shortClosetValue = tempShort;
  //      this.fullClosetValue = tempFull;
  //      this.numberOfBigBoxes = 5;
  //    }
  //    else{
  //      alert('Wrong input');

  //    }
  //  }
}
