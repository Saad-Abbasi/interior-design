import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DataSharingService} from './../../shared/data-sharing.service'

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
})
export class SharedFormComponent implements OnInit {
barForm; // For bars left,right,top,bottom
price = 0;
priceArray = [0,0,0,0];
rightLabel ="Paslat rechts";
leftLabel ="Paslat links";
rightReadOnly = false;
leftReadOnly = false;
designImage :string;
cabnetWidth:number;
cabnetWidth2:number;
priceOfColorSide = 0;
outerColor:string;
  constructor(private _sharedData: DataSharingService) { 
    
    this.barForm = new FormGroup({
      leftBar: new FormControl('5', [Validators.min(2),Validators.required]),
      rightBar: new FormControl('5', [Validators.min(2),Validators.required]),
      topBar : new FormControl('5', [Validators.min(5),Validators.required]),
      bottomBar: new FormControl('10', [Validators.min(10),Validators.required]),
  });
  
    
  }
  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    // this.getOuterColorImg();

    this.getCabnetData();
    
    this.imageBasedRender();

    this.getFormValues();
    // this._sharedData._price$.subscribe((result:any)=>{
    //   this.price = result
    // })
    
    

  }
  imageBasedRender(){
    this._sharedData._imageUrl$.subscribe(result =>{
      this.designImage = result;
      if (result == '7.jpg'|| result=='3.jpg') {
        this.leftLabel = 'Opzet links';
        this.barForm.patchValue({leftBar:2});
        this._sharedData.updateSharedForm(this.barForm.value);
        this.leftReadOnly = true;
        this.onValueChange();
      }
  
      else if (result == '6.jpg'|| result=='1.jpg') {
        this.rightLabel = 'Opzet rechts';
        this.barForm.patchValue({rightBar:2});
        this._sharedData.updateSharedForm(this.barForm.value);
        this.rightReadOnly = true;
        this.onValueChange();
      }
      else if(result == '4.jpg'){
        this.leftLabel = 'Opzet links';
        this.rightLabel = 'Opzet rechts';
        this.barForm.patchValue({rightBar:2});
        this.barForm.patchValue({leftBar:2});
        this._sharedData.updateSharedForm(this.barForm.value);
        this.rightReadOnly = true;
        this.leftReadOnly = true;
        this.onValueChange();
        
      }
      else{
        this.onValueChange();
      }
      
    });
  }

  getOuterColorImg(){
    this.price - this.priceOfColorSide;
    this._sharedData._colorImages$.subscribe((data:any)=>{
      
      this.outerColor = data.outerColorImg;
      if(this.outerColor && this.outerColor.includes("universal_colors")){
        this.priceOfColorSide = 39.00;
        this.price += this.priceOfColorSide;
      }
      else if (this.outerColor){
        this.priceOfColorSide = 46.50;
        this.price += this.priceOfColorSide;
      }
      else {
        this.priceOfColorSide = 0;
        this.price += this.priceOfColorSide;
      }
      this.onValueChange()
    });

  }
 getCabnetData(){
  this._sharedData.cabinetData$
  .subscribe((result:any)=>{
    this.cabnetWidth = result.cabnetWidth;
    this.cabnetWidth2 = result.cabnetWidth2;
    this.onValueChange()
  });
 }

  getFormValues(){
    this._sharedData._sharedForm$
    .subscribe((result:any)=>{
      this.barForm.setValue({
        leftBar:result.leftBar,
        rightBar:result.rightBar,
        topBar:result.topBar,
        bottomBar:result.bottomBar
      })
      
    });
  }

  onValueChange(){
    
    for (let i = 0; i < this.priceArray.length; i++) {
      this.price -= this.priceArray[i];
    }

    this.calculatePriceLeft(this.barForm.get('leftBar').value);
    this.calculatePriceRight(this.barForm.get('rightBar').value);
    this.calculatePriceTop(this.cabnetWidth);
    this.calculatePriceBottom(this.cabnetWidth);

    // updating values 

    //eliminating the value of top bottom
    if(this.designImage == '4.jpg'){
      this.priceArray[0] = 0;
      this.priceArray[1] = 0;
    }
    if (this.designImage == '7.jpg'|| this.designImage =='3.jpg') {
      this.priceArray[0] = 0;
    }
    if (this.designImage == '6.jpg'|| this.designImage =='1.jpg') {
      this.priceArray[1] = 0;
    }

    for (let i = 0; i < this.priceArray.length; i++) {
      this.price += this.priceArray[i];
    }
    this._sharedData.updatePrice(this.price);
    this._sharedData.updateSharedForm(this.barForm.value);
  }
  

  calculatePriceLeft(val){
    if (val< 12) {
      this.priceArray[0] = 16.50;
    }
    else {
      this.priceArray[0] =   33;
    }
  }
  calculatePriceRight(val){
    if (val< 12) {
      this.priceArray[1] =  16.50;
    }
    else {
      this.priceArray[1] =  33;
    }
  }
  calculatePriceTop(val){
    this.getCabnetData();
    
    if(this.cabnetWidth2){
      if(this.cabnetWidth2<=280){
        this.priceArray[2] =  16.50;
      }
      else{
        this.priceArray[2] = 25.20;
      }
    }else{
      if(val<=280){
        this.priceArray[2] =  16.50;
      }
      else{
        this.priceArray[2] = 25.20;
      }
    }
    
  }
  calculatePriceBottom(val){
    if(val<=280){
      this.priceArray[3] =  85;
    }
    else{
      this.priceArray[3] = 130;
    }
  }
  
 

}
