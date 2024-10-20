import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CreateCategoryComponent} from "./page/create-category/create-category.component";

import {GetCategoriesComponent} from "./page/get-categories/get-categories.component";
import {GetBrandsComponent} from "./page/get-brands/get-brands.component";
import {CreateBrandComponent} from "./page/create-brand/create-brand.component";


const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'crear-categoria', component: CreateCategoryComponent },
  { path: "ver-categorias", component: GetCategoriesComponent },
  { path: "ver-marcas", component: GetBrandsComponent },
  { path: "crear-marca", component: CreateBrandComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
