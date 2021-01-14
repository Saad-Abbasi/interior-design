import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import { ICloset } from 'src/app/shared/i-closet';
import { IColorDesign } from 'src/app/shared/i-color-design';

@Component({
  selector: 'app-sixth-step',
  templateUrl: './sixth-step.component.html',
  styleUrls: ['./sixth-step.component.scss']
})
export class SixthStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetHeight:number;
  cabnetDepth:number;
  closets:ICloset[];
  design:IColorDesign[];//image handle interior
  widthAreaBox ='800px';
  innerColor:string;
  innerColorName:string;
  outerColor:string;
  outerColorName:string;
  handle:string;
  handleName:string;
  singleDoorImage:string;
  bgImage:string;
  doorImag;
  price;
  constructor(private _DataSharing: DataSharingService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this._DataSharing.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetDepth = result.cabnetDepth;
      console.log(result.cabnetDepth)
    });

    this._DataSharing._closetLayout$.subscribe((result:any)=>{
      this.closets = result;
    });
    
   //getting price 
   this._DataSharing._price$.subscribe((result)=>{
    this.price = result;
  });
    // this.closets = [{index:0, widthInCm:'200 cm',boxWidthTest:'200px',cols:2,closetDesignImage:"../../../../assets/color/mediaPrdFeat_15_Full-layout_113-W06-Elegant-black.jpg"}]
    
    //Data colorImage
    this._DataSharing._colorImages$.subscribe((data:any)=>{
      this.innerColor = data.innerColorImg;
      this.innerColorName = data.innerColorName;
      this.outerColor = data.outerColorImg;
      this.outerColorName = data.outerColorName;
      this.handle = data.handleImg;
      this.handleName = data.handleImgName;
    });
    //sets bg

    
  }
  //Handle images Data
  handleImages=[
    'assets/handle/34.jpg',
    'assets/handle/35.jpg',
    'assets/handle/36.jpg',
    'assets/handle/37.jpg',
    'assets/handle/38.jpg',
    'assets/handle/39.jpg',
    'assets/handle/40.jpg',
    'assets/handle/41.jpg'
  ]
  doorImages =[
    'assets/doors/single.png',
    'assets/doors/doorFull.png'
  ]
  addHandle(i:number,nameOfHandle:string){
    this.handle = this.handleImages[i];
    this.handleName = nameOfHandle;
  }

  addDoor(i:number, boxSize:number){
    this.bgImage = this.innerColor;
    if (boxSize == 1) {
      this.closets[i].closetDesignImage = this.doorImages[0];
    }
    else{
      this.closets[i].closetDesignImage = this.doorImages[1];
    }

  }
}
