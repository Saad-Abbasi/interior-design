import { Component, Input, OnInit } from '@angular/core';
import {DataSharingService} from '../../../shared/data-sharing.service'
export interface Closets {
  index?:number;
  boxWidthTest:string;
  cols:number;
  widthInCm?:string;
  closetDesignImage?:string;
}
@Component({
  selector: 'app-fourth-step',
  templateUrl: './fourth-step.component.html',
  styleUrls: ['./fourth-step.component.scss']
})
export class FourthStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetHeight:number;
  cabnetDepth:number;
  maxWidth=800;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  imageIndex : number;
 
  closets: Closets[] = [
    { cols: 2,boxWidthTest:'100px',widthInCm:'100cm'},
    { cols: 2,boxWidthTest:'100px',widthInCm:'100cm'},
    { cols: 2,boxWidthTest:'100px',widthInCm:'100cm'}
  ];
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
  removeDesign =(closet)=>{
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
  updateImageIndex =(indexOfImage) =>{
    this.imageIndex = indexOfImage;
    console.log(indexOfImage);
    console.log(this.closets[indexOfImage].closetDesignImage="../../../../assets/mediaPrdFeat_6_test webshop_02 kast links.jpg")
  }
  addDesignImage = (boxSize,selectedDesign)=>{
    if(this.currentWidth <= this.maxWidth){
      this.availableWidth = this.maxWidth - this.currentWidth;
      if(boxSize == 2 && this.availableWidth >= 100){
        this.boxWidth = boxSize;
        this.currentWidth += 100;
        this.availableWidth = this.maxWidth - this.currentWidth;
        console.log("\""+ selectedDesign +"\"")
        this.closets[this.imageIndex].closetDesignImage ="\""+ selectedDesign +"\"";
        // const itemNew =  { cols: boxSize,boxWidthTest:'100px',widthInCm:'100cm',closetDesignImage:"\""+ selectedDesign +"\""}
        // this.closets.push(itemNew)
        boxSize = 1-1;
      }
      else if(boxSize == 1 && this.availableWidth >= 50){
        this.boxWidth = boxSize;
        this.currentWidth += 50;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {cols: boxSize,boxWidthTest:'50px',widthInCm:'50cm',closetDesignImage:"\""+ selectedDesign +"\""}
        this.closets.push(itemNew)
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    
  }
}


