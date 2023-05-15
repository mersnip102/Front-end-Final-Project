import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './layouts/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('../app/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
    
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
 
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
