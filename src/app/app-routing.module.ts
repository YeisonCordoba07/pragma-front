import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CreateCategoryComponent} from "./page/create-category/create-category.component";
import {GetCategoriesComponent} from "./page/get-categories/get-categories.component";

const routes: Routes = [
  { path: 'home', component: AppComponent }, // Ruta para el componente principal
  { path: 'second-page', component: CreateCategoryComponent }, // Ruta para la segunda página
  { path: "get-categories", component: GetCategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
