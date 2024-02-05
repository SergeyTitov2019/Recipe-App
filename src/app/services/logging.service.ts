import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

// @Injectable({
//   providedIn: "root"
// })
export class LoggingService {

  lastLog!: string

  printLog(message: string){
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message
  }


}
