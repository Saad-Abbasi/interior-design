import { Component, Input, OnInit } from '@angular/core';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {MatDialog} from '@angular/material/dialog';
import { ChooseClosetComponent } from '../dialogs/choose-closet/choose-closet.component';
import {ICloset} from '../../../shared/i-closet'
import { ChooseClosetSmallComponent } from '../dialogs/choose-closet-small/choose-closet-small.component';

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
    })
  }

  updateImageIndex =(indexOfImage) =>{
    if(this.closets[indexOfImage].cols == 2){
      this.openDialog();
    }
    else{
      this.openDialog2();
    }
    
    this.imageIndex = indexOfImage;
    console.log(indexOfImage);
    console.log(this.closets[indexOfImage].closetDesignImage="../../../../assets/mediaPrdFeat_6_test webshop_02 kast links.jpg")
  }
  addDesignImage = (boxSize,selectedDesign)=>{
    console.log(this.closets[this.imageIndex].cols)
    if(this.currentWidth <= this.maxWidth){
      // this.availableWidth = this.maxWidth - this.currentWidth;
      if(boxSize == 2 ){
        // this.boxWidth = boxSize;
        // this.currentWidth += 100;
        // this.availableWidth = this.maxWidth - this.currentWidth;
        // console.log("\""+ selectedDesign +"\"")
        this.closets[this.imageIndex].closetDesignImage ="\""+ selectedDesign +"\"";
        // const itemNew =  { cols: boxSize,boxWidthTest:'100px',widthInCm:'100cm',closetDesignImage:"\""+ selectedDesign +"\""}
        // this.closets.push(itemNew)
        boxSize = 0;
      }
      else if(boxSize == 1){
        // this.boxWidth = boxSize;
        // this.currentWidth += 50;
        // this.availableWidth = this.maxWidth - this.currentWidth;
        // const itemNew =  {cols: boxSize,boxWidthTest:'50px',widthInCm:'50cm',closetDesignImage:"\""+ selectedDesign +"\""}
        // this.closets.push(itemNew)
        this.closets[this.imageIndex].closetDesignImage ="\""+ selectedDesign +"\"";
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    
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
      
    });
  }
}



