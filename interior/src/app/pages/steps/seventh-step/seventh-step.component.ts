import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import { ICloset } from 'src/app/shared/i-closet';
import { IColorDesign } from 'src/app/shared/i-color-design';

@Component({
  selector: 'app-seventh-step',
  templateUrl: './seventh-step.component.html',
  styleUrls: ['./seventh-step.component.scss']
})
export class SeventhStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetWidth2:number;
  cabnetHeight:number;
  cabnetHeight2:number;
  cabnetDepth:number;
  slope:boolean; //to determine design slope or not
  closets:ICloset[];
  design:IColorDesign;//image handle interior
  widthAreaBox ='800px';
  innerColor:string;
  innerColorName:string;
  outerColor:string;
  outerColorName:string;
  handle:string;
  handleName:string;
  singleDoorImage:string;
  bgImage=[];
  doorImag;
  price;
  

  constructor(private _DataSharing: DataSharingService) { }

  ngOnInit(): void {
    this._DataSharing._slope$.subscribe(result=>{
      if(result == 'true'){
        this.slope = true
      }
      else{
        this.slope = false
      }
    });
    this._DataSharing.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetWidth2 = result.cabnetWidth2;
      this.cabnetHeight2 = result.cabnetHeight2
      this.cabnetDepth = result.cabnetDepth;
      console.log(result.cabnetDepth)
    });

    this._DataSharing._closetLayout$.subscribe((result:any)=>{
      this.closets = result;
    });

      //Data colorImage
      this._DataSharing._colorImages$.subscribe((data:any)=>{
        console.log('recived Data in step 7', data)
        this.innerColor = data.innerColorImg;
        this.innerColorName = data.innerColorName;
        this.outerColor = data.outerColorImg;
        this.outerColorName = data.outerColorName;
        this.handle = data.handleImg;
        this.handleName = data.handleImgName;
      });

    //getting design image 

    // this._DataSharing._imageUrl$.subscribe((_imageUrl)=>{
    //   this.imageUrl = 'assets/with_dimension/'+_imageUrl;
      
    // })
    
   //getting price 
   this._DataSharing._price$.subscribe((result)=>{
    this.price = result;
  });
  // getting bg image array for doors 
  this._DataSharing._shareOuterImage$.subscribe((result:any)=>{
    this.bgImage = result
  })
  
  }

  handleImages=[
    'assets/handle/1.jpg',
    'assets/handle/2.jpg',
    'assets/handle/3.jpg',
    'assets/handle/4.jpg',
    'assets/handle/5.jpg',
    'assets/handle/6.jpg',
    'assets/handle/7.jpg',
    'assets/handle/8.jpg',
    'assets/handle/9.jpg',
    'assets/handle/10.jpg',
    'assets/handle/11.jpg',
    'assets/handle/12.jpg',
    'assets/handle/13.jpg',
  ]
addHandle(i:number,nameOfHandle:string){
    this.handle = this.handleImages[i];
    this.handleName = nameOfHandle;
    this.design.handleImg = this.handle;
    this.design.handleImgName = this.handleName;
    this._DataSharing.sendColorImage(this.design)
    // this.validateBoxForm();
  }
}
