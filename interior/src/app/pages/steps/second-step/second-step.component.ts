import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataSharingService} from '../../../shared/data-sharing.service'
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  imageUrl:string;
  widthCase;
  heightCase;
  depthCase ;
  public value = 'Clear me';
  parentData:any;
  cabnetValuesForm;
  slope:boolean;
  constructor(private _shareData:DataSharingService) {
     
  }
  
  ngOnInit(): void {
    this.slope=true;
    this.cabnetValuesForm = new FormGroup({
      cabnetWidth: new FormControl('', [Validators.min(250),Validators.required]),
      cabnetHeight: new FormControl('', [Validators.min(200),Validators.max(260),Validators.required]),
      cabnetDepth : new FormControl('', [Validators.min(15),Validators.max(60),Validators.required]),
      cabnetWidth2: new FormControl('', Validators.required),
      cabnetHeight2: new FormControl('', [Validators.min(110),Validators.max(260),Validators.required]),
    });
    //sending values  replaced 
    // this.cabnetValuesForm.valueChanges.subscribe(()=>{
    // this._shareData.sendData(this.cabnetValuesForm.value);
    // });

    // recieving values 
    this._shareData._imageUrl$.subscribe((_imageUrl)=>{
      this.imageUrl = _imageUrl;
    })
  }
  
  sendData(){
  
  this._shareData.sendData(this.cabnetValuesForm.value);
  }
}