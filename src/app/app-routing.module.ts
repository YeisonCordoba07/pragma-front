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
import {AuthGuard} from "./core/auth.guard";
import {AuthenticatedGuard} from "./core/authenticated.guard";



const routes: Routes = [

  {
    path: 'crear-categoria',
    component: CreateCategoryComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {
    path: "ver-categorias", component: GetCategoriesComponent, canActivate: [AuthGuard],
    data: {allowedRoles: ['ADMIN', 'CLIENTE']}
  },
  {
    path: "ver-marcas",
    component: GetBrandsComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: ['ADMIN', 'CLIENTE']}
  },
  {
    path: "crear-marca",
    component: CreateBrandComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {
    path: "crear-articulo",
    component: CreateItemComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: ['ADMIN']}
  },
  {path: "ver-articulos", component: GetItemsComponent, canActivate: [AuthGuard],
    data: {allowedRoles: ['ADMIN', 'CLIENTE']}},
  {
    path: "crear-auxiliar",
    component: CreateAuxComponent,
    canActivate: [AuthGuard],
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
