import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Imports - Guards
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'inbox',  
    canActivate: [authGuard],
    loadChildren: () => import('./inbox/inbox.module').then((m) => m.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
