import { USERNAME } from './../../../services/local-storage/local-storage.namespace';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.less']
})
export class LeftControlComponent implements OnInit {
  @Input() isCollapsed: boolean;

  username: string;

  constructor(private storage: LocalStorageService) { }

  ngOnInit() {
    this.username = this.storage.get(USERNAME);
  }
}
