import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateCategoryComponent} from "./page/create-category/create-category.component";

import {GetCategoriesComponent} from "./page/get-categories/get-categories.component";
import {GetBrandsComponent} from "./page/get-brands/get-brands.component";
import {CreateBrandComponent} from "./page/create-brand/create-brand.component";
import {CreateItemComponent} from "./page/create-item/create-item.component";
import {GetItemsComponent} from "./page/get-items/get-items.component";
import {CreateAuxComponent} from "./page/create-aux/create-aux.component";
import {LoginPageComponent} from "./page/login/login-page.component";
import {HasRoleGuard} from "./core/guards/hasRole.guard";
import {AuthenticatedGuard} from "./core/guards/authenticated.guard";
import {HomePageComponent} from "./page/home-page/home-page.component";



const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },

  {
    path: 'crear-categoria',
    component: CreateCategoryComponent,
    canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {
    path: "ver-categorias", component: GetCategoriesComponent, canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN', 'CLIENTE', 'AUX_BODEGA']}
  },
  {
    path: "ver-marcas",
    component: GetBrandsComponent,
    canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN', 'CLIENTE', 'AUX_BODEGA']}
  },
  {
    path: "crear-marca",
    component: CreateBrandComponent,
    canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {
    path: "crear-articulo",
    component: CreateItemComponent,
    canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {path: "ver-articulos", component: GetItemsComponent, canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN', 'CLIENTE', 'AUX_BODEGA']}},
  {
    path: "crear-auxiliar",
    component: CreateAuxComponent,
    canActivate: [HasRoleGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {
    path: "login",
    component: LoginPageComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
