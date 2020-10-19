import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataSharingService} from '../../../shared/data-sharing.service'
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  widthCase;
  heightCase;
  depthCase ;
  public value = 'Clear me';
  parentData:any;
  cabnetValuesForm;
  constructor(private _shareData:DataSharingService) {
     
  }
  
  ngOnInit(): void {
    this.cabnetValuesForm = new FormGroup({
      cabnetWidth: new FormControl('', Validators.min(90)),
      cabnetHeight: new FormControl('', [Validators.min(200),Validators.max(260)]),
      cabnetDepth : new FormControl('', [Validators.min(15),Validators.max(60)]),
    })
    //sending values 
    this.cabnetValuesForm.valueChanges.subscribe(()=>{
    this._shareData.sendData(this.cabnetValuesForm.value);
    })
  }
  
  // sendData(){
  //   console.log(this.cabnetValuesForm.value)
  //   this._shareData.sendData(this.cabnetValuesForm.value);
  // }
}