import { Component, Input, OnInit } from '@angular/core';
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
  public widthCase = 800;
  public heightCase = 240;
  public depthCase = 54;
  maxWidth=800;
  widthAreaBox ='800px';
  availableWidth;

  // boxWidthTest = '100px';
  // boxSmallWidthTest = '50px';
  currentWidth = 0;
  boxWidth = 0;
  closets: Closets[] = [
    // {index: 1 , text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    // {index: 2 ,text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    // {index: 3 ,text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    // {index: 4 ,text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    // {index: 5 ,text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  constructor() { }

  ngOnInit(): void {
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
