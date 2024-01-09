import {Component, Input, OnInit} from '@angular/core';
import {ServerElements} from "../types/server-elements";

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  // @Input('srvElement') serverElements: {type: string, name: string, content: string}
  // @Input() element!: {type: string, name: string, content: string}
  // @Input('srvElement') serverElements!: any
  @Input('srvElement') element!: ServerElements

  constructor() {
  }

  ngOnInit(): void {

  }

}
