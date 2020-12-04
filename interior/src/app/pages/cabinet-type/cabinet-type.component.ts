import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import {SecondStepComponent} from '../steps/second-step/second-step.component'
@Component({
  selector: 'app-cabinet-type',
  templateUrl: './cabinet-type.component.html',
  styleUrls: ['./cabinet-type.component.scss']
})
export class CabinetTypeComponent implements OnInit {
  isLinear = false;
  isDesignSelected = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _dataService:DataSharingService) {}

              
@ViewChild('stepper') private myStepper: MatStepper;
@ViewChild('step1', {static: false}) step1: ElementRef; 

@ViewChild(SecondStepComponent) stepTwoComponent: SecondStepComponent;
   
  ngOnInit() {
    this._dataService._imageUrl$.subscribe((result)=>{
      this.isDesignSelected = true ;
      
    },(err)=>{
      console.log(err)
    });
    
  
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
      
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
    
}
get frmStepTwo() {
  return this.stepTwoComponent ? this.stepTwoComponent.cabnetValuesForm: null;
}

}
