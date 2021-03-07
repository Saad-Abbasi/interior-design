import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
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
  bgImage:string;
  doorImag;
  price;
  boxForm:FormGroup;
  backupCloset=[];
  isDoor = 'false';
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
      console.log(this.closets)
    });
    
    if(!this.closets){
this.closets=[{index: 1, cols: 2, boxWidthTest: "40%", widthInCm: "100.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/big_box/2.jpg"},
              {index: 1, cols: 1, boxWidthTest: "20%", widthInCm: "50.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/small/4.jpg"},
              {index: 1, cols: 1, boxWidthTest: "20%", widthInCm: "50.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/small/3.jpg"},
              {index: 1, cols: 1, boxWidthTest: "20%", widthInCm: "50.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/small/4.jpg"}
              
            ]
    }
   //getting price 
   this._DataSharing._price$.subscribe((result)=>{
    this.price = result;
  });
    
    //Data colorImage
    this._DataSharing._colorImages$.subscribe((data:any)=>{
      this.design = data;
      this.innerColor = data.innerColorImg;
      this.innerColorName = data.innerColorName;
      this.outerColor = data.outerColorImg;
      this.outerColorName = data.outerColorName;
      this.handle = data.handleImg;
      this.handleName = data.handleImgName;
      // Setting the inner box color 
      this.bgImage = this.innerColor;
    });
    

    

    //BoxForm for validation
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });
    //copy selected design images
    
  }


  //Handle images Data
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
  doorImages =[
    'assets/doors/single.png',
    'assets/doors/doorFull.png'
  ]
  addHandle(i:number,nameOfHandle:string){
    this.handle = this.handleImages[i];
    this.handleName = nameOfHandle;
    this.design.handleImg = this.handle;
    this.design.handleImgName = this.handleName;
    this._DataSharing.sendColorImage(this.design)
    this.validateBoxForm();
  }

  //WHether dooor shod added or not 
  onValChange(value) {
    this.isDoor =value;
}


  addDoor(i:number, boxSize:number){
    if(this.isDoor == 'true'){
      let imageAddress;
    this.backupCloset.length =  Object.keys(this.closets).length;

    //Hold image addres for later use
    if(typeof this.backupCloset[i] === 'undefined'){
     imageAddress  = this.closets[i].closetDesignImage;
    }
    
    //Color 
    this.bgImage = this.innerColor;
    // add/remove
   
    console.log('image of this box is', imageAddress);

    console.log('image addres', this.closets[i].closetDesignImage)

    if (boxSize == 1) {
      if(typeof this.backupCloset[i] === 'undefined' && imageAddress.includes('CpBox')){
        this.backupCloset.splice(i, 0,imageAddress);
        this.bgImage = this.innerColor;
        this.closets[i].closetDesignImage = this.doorImages[0];
        console.log(' image backup',i, this.backupCloset[i])
      }
      else if(this.closets[i].closetDesignImage === null){
        this.bgImage = this.innerColor;
        this.closets[i].closetDesignImage = this.doorImages[0];
      }
      else if(!this.closets[i].closetDesignImage.includes('CpBox')){
        
        console.log('Else case called', this.backupCloset[i])
        
        this.closets[i].closetDesignImage = this.backupCloset[i];
      }
      else{
        this.bgImage = this.innerColor;
        this.closets[i].closetDesignImage = this.doorImages[0];
      }
      
    }
    else{
      
      if(typeof this.backupCloset[i] === 'undefined' && imageAddress.includes('CpBox')){
        this.backupCloset.splice(i, 0,imageAddress);
        this.bgImage = this.innerColor;
        this.closets[i].closetDesignImage = this.doorImages[1];
        console.log(' image backup',i, this.backupCloset[i])
      }
      else if(this.closets[i].closetDesignImage === null){
        this.bgImage = this.innerColor;
        this.closets[i].closetDesignImage = this.doorImages[1];
      }
      else if(!this.closets[i].closetDesignImage.includes('CpBox')){
        
        this.closets[i].closetDesignImage = this.backupCloset[i];
      }
      else{
        this.bgImage = this.innerColor;
        this.closets[i].closetDesignImage = this.doorImages[1];
      }
    }
    }

    else{
      return;
    }

  }

  validateBoxForm(){
    if(this.handle){
      this.boxForm.setValue({
        boxFull:'abc'
      });
    }
    else{
      
      this.boxForm.setValue({
        boxFull:null
      });
      
    }
  }
}
