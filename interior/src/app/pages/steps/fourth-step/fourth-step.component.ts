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
  cabnetHeight:number;
  cabnetDepth:number;
  maxWidth=800;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  imageIndex : number;
  price:any;
  boxForm:FormGroup;
 
  closets: ICloset[];
  constructor(private _sharedData:DataSharingService,
              public dialog: MatDialog)
               { }

  ngOnInit(): void {
    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetDepth = result.cabnetDepth;
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
    console.log(this.closets[this.imageIndex].cols)
    if(this.currentWidth <= this.maxWidth){
      
      if(boxSize == 2 ){
        
        this.closets[this.imageIndex].closetDesignImage ="\""+ selectedDesign +"\"";
        
        boxSize = 0;
      }
      else if(boxSize == 1){
       
        this.closets[this.imageIndex].closetDesignImage ="\""+ selectedDesign +"\"";
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    this.validateBoxForm();
  }
  openDialog() {
    const dialogRef = this.dialog.open(ChooseClosetComponent,{
      width: '800px',
      // data: { name: this.name, animal: this.animal },
      position: {
        
        top: '20%',
        left: '80px'
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
        left: '80px'
      },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.addDesignImage(2,result);
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



