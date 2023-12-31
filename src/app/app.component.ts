import {Component, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerElements} from "./types/server-elements";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'ang-updated-max-schwarzmuller';
  name: string = '';
  position: string = 'Admin';
  myForm!: NgForm
  serverName: string= '';
  flag: boolean = false;
  loadedFeature = 'recipe'


  onNavigate(feature: string) {
    this.loadedFeature = feature
  }

}



/**
 *    Server / Cockpit
 *
 *
 *
 *
 serverElements:ServerElements[] = [
 {type: 'server', name: 'Test server', content: 'Just a content'},
 {type: 'blueprint', name: 'Test blueprint', content: 'Just a blueprint content'},
 ]
 *
 * onServerAdded(serverData: {serverName: string, serverContent: string}) {
  console.log(serverData)
  this.serverElements.push({
    type: 'server',
    name: serverData.serverName,
    content: serverData.serverContent
  })
}
 onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
  this.serverElements.push({
    type: 'blueprint',
    name: blueprintData.serverName,
    content: blueprintData.serverContent
  })
}

 onSubmit(data: any){
  console.log(data);
  this.name = data
  this.name = ''
}

 onServerCreated(data: string) {
  this.serverName = data
  this.flag = true

}
 *
 *
 *
 *
 * */
