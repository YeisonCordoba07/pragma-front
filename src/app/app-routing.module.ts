import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CreateCategoryComponent} from "./page/create-category/create-category.component";
import {GetCategoriesComponent} from "./page/get-categories/get-categories.component";
import {SecondPageComponent} from "./second-page/second-page.component";

const routes: Routes = [
  { path: 'home', component: AppComponent }, // Ruta para el componente principal
  { path: 'create-category', component: CreateCategoryComponent }, // Ruta para la segunda página
  { path: "get-categories", component: GetCategoriesComponent },
  { path: "segunda-pagina", component: SecondPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
