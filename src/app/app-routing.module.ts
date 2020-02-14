import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AppGalleryComponent } from './app-gallery/app-gallery.component';
import { TraxComponent } from './trax/trax.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GridComponent } from './grid/grid.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'trax',
    component: TraxComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'apps',
    component: AppGalleryComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'detail',
    component: DetailPageComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then(m => m.KanbanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
