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
  scalVal =[];
  doorImag;
  price;
  priceOfHandle;
  borderSlope;
  slopeDirection;
  constructor(private _DataSharing: DataSharingService) { }

  ngOnInit(): void {
    this._DataSharing._slope$.subscribe(result=>{
      if(result == 'true'){
        this.slope = true;
        // getting slope direction
        this._DataSharing._slopeDirection$.subscribe(result=>{
          this.slopeDirection = result;
          // Getting border for slope
          this._DataSharing._borderSLope$.subscribe(result=>{
            this.borderSlope = result;
          })
        })
        
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
      this.bgImage.length = Object.keys(this.closets).length;
      console.log(result, '<= Layout')
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
      // setting Outer Color
     
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
    console.log('Bg Array',this.bgImage)
  });
  //getting doorFlip value
  this._DataSharing._doorFlip$.subscribe((result:any)=>{
    this.scalVal = result;
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
  if(this.priceOfHandle ){
    this.price  = this.price - this.priceOfHandle;
  }
  
  if(i == 5 || i == 6){
    this.priceOfHandle = 4.5;
  }
  else{
    this.priceOfHandle = 9.5
  }
    this.handle = this.handleImages[i];
    this.handleName = nameOfHandle;
 
     this.design = {innerColorImg:this.innerColor,
                innerColorName: this.innerColorName,
                outerColorImg:this.outerColor,
                outerColorName:this.outerColorName, 
                handleImg:this.handle, 
                handleImgName:this.handleName
    }
 
    this.price = parseFloat(this.priceOfHandle) + parseFloat(this.price);
    this.price = this.price.toFixed(2);
    console.log('type of price ', typeof(this.price),isNaN(this.price),this.price,this.priceOfHandle);
    // this._DataSharing.sendColorImage(this.design)
    this._DataSharing.updatePrice(this.price);
    // this.validateBoxForm();
  }
}
