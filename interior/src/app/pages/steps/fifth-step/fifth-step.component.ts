import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {ICloset}  from'../../../shared/i-closet'
import { ColorDesignComponent } from '../dialogs/color-design/color-design.component';
import {IColorDesign} from '../../../shared/i-color-design'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fifth-step',
  templateUrl: './fifth-step.component.html',
  styleUrls: ['./fifth-step.component.scss']
})
export class FifthStepComponent implements OnInit {
cabnetWidth:number;
cabnetHeight:number;
cabnetDepth:number;
closets:ICloset[];
public design:IColorDesign ={};//image handle interior
widthAreaBox ='800px';
innerColor:string;
innerColorName:string;
outerColor:string;
outerColorName:string;
handle:string;
boxForm:FormGroup;
price;

designImages =[
  "../../../../assets/color/mediaPrdFeat_8_Full-layout_U172-CST-Ivory.jpg",
  "../../../../assets/color/mediaPrdFeat_12_Full-layout_U127-CST-Dune-beige.jpg",
  "../../../../assets/color/mediaPrdFeat_13_Full-layout_U284-CST-Mokka.jpg",
  "../../../../assets/color/mediaPrdFeat_14_Full-layout_U287-CST-Mojave.jpg",
  "../../../../assets/color/mediaPrdFeat_40_mediaPrdFeat_12_U127.jpg",
  "../../../../assets/color/mediaPrdFeat_9_Full-layout_H335-BST-Torino-Oak.jpg",
  "../../../../assets/color/mediaPrdFeat_10_Full-layout_H689-W03-Amazonia.jpg",
  "../../../../assets/color/mediaPrdFeat_11_Full-layout_H842-BST-Eiger-Walnut.jpg",
  "../../../../assets/color/mediaPrdFeat_15_Full-layout_113-W06-Elegant-black.jpg"
];


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

    //form for validateion 
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });

    //getting price 
    this._DataSharing._price$.subscribe((result)=>{
      this.price = result;
    });
    
  }

  //Update Color/image

  updateColor(i:number,nameOfColor:string){
    this.innerColor = this.designImages[i];
    this.innerColorName = nameOfColor;
    this.outerColor = this.designImages[i];
    this.outerColorName  = nameOfColor;
    
    //Asign and Sharing values to subscribers
  
    this.design.innerColorImg = this.designImages[i];
    this.design.innerColorName = nameOfColor;
    this.design.outerColorImg = this.designImages[i];
    this.design.outerColorName = nameOfColor;
    this._DataSharing.sendColorImage(this.design);

    this.validateBoxForm();
  }

//Dialoge to show image design color
openDialog(index:number) {
  const dialogRef = this.dialog.open(ColorDesignComponent,{
    height:'534px',
    width: '400px',
    data:{
      image: `${this.designImages[index]}`
    },
    panelClass: 'color-image-modalbox'
  }); 
}

validateBoxForm(){
  if(this.innerColor){
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
