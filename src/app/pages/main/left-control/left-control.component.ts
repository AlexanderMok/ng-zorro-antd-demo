import { USERNAME } from './../../../services/local-storage/local-storage.namespace';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.less']
})
export class LeftControlComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @ViewChild(ListComponent, {static: false}) listComponent: ListComponent;

  username: string;

  constructor(private storage: LocalStorageService) { }

  ngOnInit() {
    this.username = this.storage.get(USERNAME);
  }

  openAddListModal(): void {
    this.listComponent.openAddListModal();
  }
}
