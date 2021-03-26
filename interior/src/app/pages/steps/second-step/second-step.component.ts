import { AfterContentInit,  Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataSharingService} from '../../../shared/data-sharing.service'
import { ThirdStepComponent } from '../third-step/third-step.component';
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit,AfterContentInit {
  imageUrl:string;
  widthCase;
  heightCase;
  widthCase2;
  heightCase2;
  depthCase ;
  public value = 'Clear me';
  parentData:any;
  cabnetValuesForm;
  formWitSlope;
  formWithoutSlope
  slope:any;
  a:boolean
  
  constructor(private _shareData:DataSharingService) {
    
  }
  ngAfterContentInit() {
   
  }
  ngOnInit(): void {
   
  
  this.formWithoutSlope = new FormGroup({
      cabnetWidth: new FormControl('', [Validators.min(250),Validators.required]),
      cabnetHeight: new FormControl('', [Validators.min(200),Validators.max(260),Validators.required]),
      cabnetDepth : new FormControl('', [Validators.min(30),Validators.max(65),Validators.required]),
    });
      this.formWitSlope = new FormGroup({
        cabnetWidth: new FormControl('', [Validators.min(250),Validators.required]),
        cabnetHeight: new FormControl('', [Validators.min(200),Validators.max(260),Validators.required]),
        cabnetDepth : new FormControl('', [Validators.min(30),Validators.max(65),Validators.required]),
        cabnetWidth2: new FormControl('5', Validators.required),
        cabnetHeight2: new FormControl('', [Validators.min(110),Validators.max(260),Validators.required]),
     
    });
   
    
    

    //sending values  replaced 
    // this.cabnetValuesForm.valueChanges.subscribe(()=>{
    // this._shareData.sendData(this.cabnetValuesForm.value);
    // });

    // recieving values 
    this._shareData._imageUrl$.subscribe((_imageUrl)=>{
      this.imageUrl = 'assets/with_dimension/'+_imageUrl;
    })

    this._shareData._slope$.subscribe(slopeStatus =>{
      this.slope = slopeStatus
      console.log(this.slope)
      if(slopeStatus){
        this.setForm()
      }
    })

  }
 
  sendData(){
  this._shareData.sendData(this.cabnetValuesForm.value);
  }
  setForm(){
    if(this.slope == 'true'){
      this.a = true
      this.cabnetValuesForm = this.formWitSlope
      
    }
    else if (this.slope == 'false'){
      
      this.a =false;
      this.cabnetValuesForm = this.formWithoutSlope
    }
    else{
      alert('errror')
    }
  }
  getFormType(){
    if(this.a){
      return true
    }
    else {
      return false
    }
  }

  heigh2tChange(val:any){
    this.heightCase2 = val
  }
  width2tChange(val:any){
    this.widthCase2 = val
  }
}