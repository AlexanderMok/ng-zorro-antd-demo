import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitGuardService } from './services/init-guard/init-guard.service';


const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {
    path: 'setup',
    loadChildren: () => import('./pages/setup/setup.module').then(m => m.SetupModule),
    canActivate: [InitGuardService]
  }, /* lazy load*/
  { path: 'main', pathMatch: 'full', redirectTo: '/main' }, /* eager load. need to import maodule in app.module.ts */
  { path: '', pathMatch: 'full', redirectTo: '/setup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
