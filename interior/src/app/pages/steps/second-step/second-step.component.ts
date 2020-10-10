import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,NgModel} from '@angular/forms';
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  public widthCase = "0";
  public heightCase = "0";
  public depthCase = "0";
  public value = 'Clear me';
  parentData:any;
 

  options: FormGroup;
  
  
  fontSizeControlWidth= new FormControl(90, Validators.min(90));
  fontSizeControlHeight = new FormControl(200, [Validators.min(200),Validators.max(260)]);
  fontSizeControlDepth = new FormControl(15, [Validators.min(15),Validators.max(60)]);

  constructor() {
    
  }

  ngOnInit(): void {
  }
  
}