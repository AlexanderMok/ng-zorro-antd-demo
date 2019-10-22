import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { LeftControlComponent } from './left-control/left-control.component';


@NgModule({
  declarations: [
    MainComponent,
    LeftControlComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class MainModule { }
