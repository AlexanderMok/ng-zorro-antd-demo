import { SetupRoutingModule } from './setup-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';



@NgModule({
  imports: [
    CommonModule, SetupRoutingModule
  ],
  declarations: [SetupComponent],
  exports: [SetupComponent]
})
export class SetupModule { }
