import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/data-sharing.service';

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
  innerColor:string;
  innerColorName:string;
  outerColor:string;
  outerColorName:string;
  handle:string;
  handleName:string;
  singleDoorImage:string;
  imageUrl:string;
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

    // this._DataSharing._closetLayout$.subscribe((result:any)=>{
    //   this.closets = result;
    // });

    //getting design image 

    this._DataSharing._imageUrl$.subscribe((_imageUrl)=>{
      this.imageUrl = 'assets/with_dimension/'+_imageUrl;
      
    })
    
   //getting price 
   this._DataSharing._price$.subscribe((result)=>{
    this.price = result;
  });
    
    //Data colorImage
    this._DataSharing._colorImages$.subscribe((data:any)=>{
      this.innerColor = data.innerColorImg;
      this.innerColorName = data.innerColorName;
      this.outerColor = data.outerColorImg;
      this.outerColorName = data.outerColorName;
      this.handle = data.handleImg;
      this.handleName = data.handleImgName;
    });
  }

}
