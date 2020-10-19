import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
private _cabinetDataSource = new Subject<string>();
cabinetData$ = this._cabinetDataSource.asObservable();
  constructor() { }

  sendData(data:any){
       this._cabinetDataSource.next(data);
  } 
}
