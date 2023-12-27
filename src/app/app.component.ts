import { Component } from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-updated-max-schwarzmuller';
  name: string = '';
  position: string = 'Admin';
  myForm!: NgForm
  serverName: string= '';
  flag: boolean = false;



  onSubmit(data: any){
    console.log(data);
    this.name = data
    this.name = ''
  }

  onServerCreated(data: string) {
    this.serverName = data
    this.flag = true

  }

  onResetServer(data: any) {
    this.serverName = ''
    this.flag = false

  }
}
