import { SetupRoutingModule } from './setup-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
    NgZorroAntdModule, /* import ng-zorro-antd module so that it can be used in sub module*/
    FormsModule /* import this module so that two-way binding of input can be used in sub module*/
  ],
  declarations: [SetupComponent],
  exports: [SetupComponent]
})
export class SetupModule { }
