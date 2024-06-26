import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Imports - Components
import { HomeComponent } from './home/home.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

// Imports - Resolvers
import { EmailResolverService } from './email-resolver.service';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'not-found', component: NotFoundComponent},
      {path: ':id', component: EmailShowComponent, resolve: {email: EmailResolverService}},
      {path: '', component: PlaceholderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
