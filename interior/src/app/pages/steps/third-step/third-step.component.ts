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
  maxWidth=800;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;

  closets: Closets[] = [];

  constructor(private _sharedData:DataSharingService) { }

  ngOnInit(): void {
    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetDepth = result.cabnetDepth;
      
      console.log(result.cabnetDepth)
    })
  }
  removeTile =(closet)=>{
    if(closet.cols == 2){
      const index = this.closets.indexOf(closet)
     this.availableWidth =  this.currentWidth  -=100;
      this.closets.splice(index, 1);
      console.log(index)
    }
    else
    {
    const index = this.closets.indexOf(closet)
    this.availableWidth = this.currentWidth  -=50;
    this.closets.splice(index, 1);
    console.log(index)
    }
  }
  addTile = (boxSize)=>{
    if(this.currentWidth <= this.maxWidth){
      this.availableWidth = this.maxWidth - this.currentWidth;
      if(boxSize == 2 && this.availableWidth >= 100){
        this.boxWidth = boxSize;
        this.currentWidth += 100;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 , cols: boxSize,boxWidthTest:'100px',widthInCm:'100cm'}
        this.closets.push(itemNew)
        boxSize = 0;
      }
      else if(boxSize == 1 && this.availableWidth >= 50){
        this.boxWidth = boxSize;
        this.currentWidth += 50;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 ,  cols: boxSize,boxWidthTest:'50px',widthInCm:'50cm'}
        this.closets.push(itemNew)
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    
  }
}
