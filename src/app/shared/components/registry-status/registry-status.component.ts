import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registry-status',
  templateUrl: './registry-status.component.html',
  styleUrls: ['./registry-status.component.css']
})
export class RegistryStatusComponent implements OnInit {
  @Input() apagado?: boolean = undefined;
  constructor() { }

  ngOnInit() {
  }

}
