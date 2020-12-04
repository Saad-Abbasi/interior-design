import { Component, Input, OnInit } from '@angular/core';
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
  cabnetHeight:number;
  cabnetDepth:number;
  maxWidth:number;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  cupBoardSpace = '';
  fullClosetValue:number;
  shortClosetValue:number;
  shortIsDisable:boolean;
  closets: Closets[] = [];
  numberOfBigBoxes:number;

  constructor(private _sharedData:DataSharingService) { }

  ngOnInit(): void {
    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetDepth = result.cabnetDepth;
      this.cupBoardSpace = result.cabnetWidth;
      var getInNum = result.cabnetWidth;
      getInNum.toString().substring(0,2);
      this.maxWidth = getInNum;
      console.log(result.cabnetDepth)
      this.calculateWidth(this.maxWidth);
    })
  }
  removeTile =(closet)=>{
    if(closet.cols == 2){
      const index = this.closets.indexOf(closet)
      this.availableWidth =  this.currentWidth  -= this.fullClosetValue;
      this.closets.splice(index, 1);
      console.log(index)
    }
    else
    {
    const index = this.closets.indexOf(closet)
    this.availableWidth = this.currentWidth  -= this.shortClosetValue;
    this.closets.splice(index, 1);
    console.log(index)
    }
  }

  addTile = (boxSize)=>{
    
    if(this.currentWidth <= this.maxWidth){
      this.availableWidth = this.maxWidth - this.currentWidth;
      if(boxSize == 2 && this.availableWidth >= this.fullClosetValue){
        this.boxWidth = boxSize;
        this.currentWidth += this.fullClosetValue;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 , cols: boxSize,boxWidthTest:`${100/this.numberOfBigBoxes}`+'%',widthInCm:this.fullClosetValue.toFixed(1)+'cm'}
        this.closets.push(itemNew)
        boxSize = 0;
      }
      else if(boxSize == 1 && this.availableWidth >= this.shortClosetValue){
        let numberOfSmallBoxes = this.numberOfBigBoxes*2;
        this.boxWidth = boxSize;
        this.currentWidth += this.shortClosetValue;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 ,  cols: boxSize,boxWidthTest:`${100/numberOfSmallBoxes}`+'%',widthInCm:this.shortClosetValue.toFixed(1)+'cm'}
        this.closets.push(itemNew)
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    this._sharedData.sendClosetLayout(this.closets);
    
  }
   //Calculating width
 
   calculateWidth(w){
     if(w<115){
       //Do subtract 10 for left right 
       w = w-10;
      //  extract the value for short closet
      this.numberOfBigBoxes = 4;
      this.shortIsDisable = true;
      
       return this.fullClosetValue = w;
      //  this.shortClosetValue = w/2;
     }
     else if(w >= 115 && w < 200){
       w = w-10;
       let tempShort = w/3;
       
       let tempFull = tempShort *2;
       this.shortClosetValue = tempShort;
       this.fullClosetValue = tempFull;
       this.numberOfBigBoxes = 3; //for Width set
      // this.shortIsDisable = false;
      
     }
     else if(w >= 200 && w < 360)
     {
       w = w-10;
       let tempFull = w/3;
       let tempShort = tempFull/2;
       this.shortClosetValue = tempShort;
       this.fullClosetValue = tempFull;
       this.numberOfBigBoxes = 3; //For width
     }
     else if(w >=  360 && w < 460)
     {
       w = w-10;
       let tempFull = w/4;
       let tempShort = tempFull/2;
       this.shortClosetValue = tempShort;
       this.fullClosetValue = tempFull;
       this.numberOfBigBoxes = 4;
     }
     else if(w >=  460 && w < 560)
     {
       w = w-10;
       let tempFull = w/5;
       let tempShort = tempFull/2;
       this.shortClosetValue = tempShort;
       this.fullClosetValue = tempFull;
       this.numberOfBigBoxes = 5;
     }
     else{
       alert('Wrong input');

     }
   }
}
