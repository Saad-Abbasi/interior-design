import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private _cabinetDataSource = new Subject<string>();
  cabinetData$ = this._cabinetDataSource.asObservable();

  private _imageDataSource = new Subject<string>();
  _imageUrl$ = this._imageDataSource.asObservable();
  
  private _closetLayoutDataSource = new Subject<string>();
  _closetLayout$ = this._closetLayoutDataSource.asObservable();

  private _colorImageDataSource = new Subject<string>();
  _colorImages$ = this._colorImageDataSource.asObservable();


  constructor() { }

  sendData(data:any){
       this._cabinetDataSource.next(data);
  } 

  sendImage(imageUrl: string){
    this._imageDataSource.next(imageUrl);
  }

  sendClosetLayout(layoutArray:any){
    this._closetLayoutDataSource.next(layoutArray);
  }

  sendColorImage(colorImageData:any){
    this._colorImageDataSource.next(colorImageData);
  }
}
