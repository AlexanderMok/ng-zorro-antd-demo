import { ListComponent } from './left-control/list/list.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { InitGuardService } from 'src/app/services/init-guard/init-guard.service';


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [InitGuardService],
    children: [
      {
        path: ':id',
        component: DetailComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
