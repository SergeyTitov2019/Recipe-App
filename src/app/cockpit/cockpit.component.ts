import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ServerData} from "../types/server-data";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CockpitComponent implements OnInit {

  @Output() serviceCreated = new EventEmitter<ServerData>()
  @Output() blueprintCreated = new EventEmitter<ServerData>()

  @ViewChild('serverContentInput') serverContentInput!: ElementRef

  // newServerName!: string
  // newServerContent = ''

  flagName: boolean = true

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddServer(inputServer: HTMLInputElement) {
    this.serviceCreated.emit({
        serverName: inputServer.value,
        serverContent: this.serverContentInput.nativeElement.value,
      }
    )
    inputServer.value = ''
    this.serverContentInput.nativeElement.value = ''
    this.flagName = false

  }

  onAddBlueprint(inputServer: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: inputServer.value,
      serverContent: this.serverContentInput.nativeElement.value,

      }
    )
    inputServer.value = ''
    this.serverContentInput.nativeElement.value = ''
  }


}
