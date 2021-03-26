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
  constructor(private _sharedData: DataSharingService) { 
    this.barForm = new FormGroup({
      leftBar: new FormControl('5', [Validators.min(5),Validators.required]),
      rightBar: new FormControl('5', [Validators.min(5),Validators.required]),
      topBar : new FormControl('5', [Validators.min(5),Validators.required]),
      bottomBar: new FormControl('10', [Validators.min(10),Validators.required]),
   
  });
  }

  ngOnInit(): void {
    this._sharedData._sharedForm$
    .subscribe((result:any)=>{
      console.log('form data' , result);
      this.barForm.setValue({
        leftBar:result.leftBar,
        rightBar:result.rightBar,
        topBar:result.topBar,
        bottomBar:result.bottomBar
      })
    })
 
  }
  onValueChange(){
    this._sharedData.updateSharedForm(this.barForm.value);
  }
 
  

}
