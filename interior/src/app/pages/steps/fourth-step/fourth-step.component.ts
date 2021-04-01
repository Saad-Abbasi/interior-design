import { Component, Input, OnInit } from '@angular/core';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {MatDialog} from '@angular/material/dialog';
import { ChooseClosetComponent } from '../dialogs/choose-closet/choose-closet.component';
import {ICloset} from '../../../shared/i-closet'
import { ChooseClosetSmallComponent } from '../dialogs/choose-closet-small/choose-closet-small.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fourth-step',
  templateUrl: './fourth-step.component.html',
  styleUrls: ['./fourth-step.component.scss']
})
export class FourthStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetWidth2:number;
  cabnetHeight:number;
  cabnetHeight2:number;
  cabnetDepth:number;
  slope:boolean;       //Added to determine dessign
  maxWidth=800;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  imageIndex : number;
  price:any;
  boxForm:FormGroup;
  priceOfEachCloset = [];
 
  closets: ICloset[];
  constructor(private _sharedData:DataSharingService,
              public dialog: MatDialog)
               { }

  ngOnInit(): void {
    this._sharedData._slope$.subscribe(result=>{
      if(result == 'true'){
        this.slope = true
      }
      else{
        this.slope = false
      }
    });
    
    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetDepth = result.cabnetDepth;
      this.cabnetWidth2 = result.cabnetWidth2;
      this.cabnetHeight2 = result.cabnetHeight2
      console.log(result.cabnetDepth)
    });

    this._sharedData._closetLayout$.subscribe((result:any)=>{
      this.closets = result;
      
    });
   
    
    //getting price 
    this._sharedData._price$.subscribe((result)=>{
      this.price = result;
    });
    // form for validateion/
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });
    
  }

  updateImageIndex =(indexOfImage) =>{
    this.validateBoxForm();
    if(this.closets[indexOfImage].cols == 2){
      this.openDialog();
    }
    else{
      this.openDialog2();
    }
    
    this.imageIndex = indexOfImage;
   
  }
  addDesignImage = (boxSize,selectedDesign)=>{
    for (let i = 0; i < this.priceOfEachCloset.length; i++) {
      if (this.priceOfEachCloset[i]) {
      
      this.price = this.price - this.priceOfEachCloset[i];
      }
      
    }
    console.log(this.closets[this.imageIndex].cols)
    if(this.currentWidth <= this.maxWidth){
      
      if(boxSize == 2 ){
        
        this.closets[this.imageIndex].closetDesignImage = selectedDesign;
        let img =  this.closets[this.imageIndex].closetDesignImage
        
        let imgPrice = 0;
        imgPrice = this.getPriceOfBigCloset(img);
        this.priceOfEachCloset[this.imageIndex] = 0;
        this.priceOfEachCloset[this.imageIndex] = imgPrice;

        boxSize = 0;
      }
      else if(boxSize == 1){
       
        this.closets[this.imageIndex].closetDesignImage = selectedDesign ;
        let img =  this.closets[this.imageIndex].closetDesignImage;

        let imgPrice = 0;
        imgPrice = this.getPriceOfSmallCloset(img)
        this.priceOfEachCloset[this.imageIndex] = 0;
        this.priceOfEachCloset[this.imageIndex] = imgPrice;
        console.log('got the price for small closet', typeof(imgPrice));
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    this.calculatePrice();

    this.validateBoxForm();
    
  }
  // Get Price of Big Closet Image
  getPriceOfBigCloset(img){
    if (img.includes('11.png')) {
      return 212;
    }
    else if (img.includes('10.png')) {
      return 205;
    }
    else if (img.includes('12.png')) {
      return 205;
    }
    else if (img.includes('8.png')) {
      return 375;
    }
    else if (img.includes('9.png')) {
      return 377;
    }
    else if (img.includes('7.png')) {
      return 189;
    }
    else if (img.includes('5.png')) {
      return 329;
    }
    else if (img.includes('6.png')) {
      return 322;
    }
    else if (img.includes('4.png')) {
      return 189;
    }
    else if (img.includes('2.png')) {
      return 274;
    }
    else if (img.includes('3.png')) {
      return 267;
    }
    else if (img.includes('1.png')) {
      return 295;
    }
    else{
      return 0;
    }
  }

   // Get Price of Small Closet Image
   getPriceOfSmallCloset(img){
    if (img.includes('11.png')) {
      return 183;
    }
    else if (img.includes('10.png')) {
      return 175;
    }
    else if (img.includes('12.png')) {
      return 175;
    }
    else if (img.includes('8.png')) {
      return 346;
    }
    else if (img.includes('9.png')) {
      return 355;
    }
    else if (img.includes('3.png')) {
      return 169;
    }
    else if (img.includes('6.png')) {
      return 329;
    }
    else if (img.includes('7.png')) {
      return 293;
    }
    else if (img.includes('2.png')) {
      return 169;
    }
    else if (img.includes('4.png')) {
      return 245;
    }
    else if (img.includes('5.png')) {
      return 231;
    }
    else if (img.includes('1.png')) {
      return 295;
    }
    else{
      return 0;
    }
    
  }
  //Calculating price on the base of images ..
  calculatePrice(){
    
    for (let i = 0; i < this.priceOfEachCloset.length; i++) {
      if (this.priceOfEachCloset[i]) {
      
      this.price = this.price + this.priceOfEachCloset[i];
      }
      
    }
    console.log(this.price)
    this._sharedData.updatePrice(this.price)
  }


  openDialog() {
    const dialogRef = this.dialog.open(ChooseClosetComponent,{
      width: '800px',
      // data: { name: this.name, animal: this.animal },
      position: {
        
        top: '20%',
        left: '5%'
    
      },
      panelClass: 'custom-modalbox'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.addDesignImage(2,result);
      this.validateBoxForm();
    });
  }
  //Small Box dialog
  openDialog2() {
    const dialogRef = this.dialog.open(ChooseClosetSmallComponent,{
      width: '800px',
      // data: { name: this.name, animal: this.animal },
      position: {
        top: '20%',
        left: '5%'
        
      },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.addDesignImage(1,result);
      this.validateBoxForm();
      
    });
  }
  validateBoxForm(){
    let tempResult = 0;
    let lenght = this.closets.length;
    this.closets.forEach(element => {
      if(element.closetDesignImage){
        tempResult++;
      }
    });

    

    if(lenght == tempResult){
      this.boxForm.setValue({
        boxFull:'abc'
      });
    }
    else{
      this.boxForm.setValue({
        boxFull:null
      })
    }
  }
}



