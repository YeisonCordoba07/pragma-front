import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputTextComponent } from './components/atoms/input-text/input-text.component';



import { CreateCategoryComponent } from './page/create-category/create-category.component';
import { NavigationBarElementComponent } from './components/atoms/navigation-bar-element/navigation-bar-element.component';
import { NavigationBarComponent } from './components/molecules/navigation-bar/navigation-bar.component';
import { MainButtonComponent } from './components/atoms/main-button/main-button.component';
import { FooterComponent } from './components/molecules/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './components/molecules/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { FormDataComponent } from './components/atoms/form-data/form-data.component';
import { IconLinkComponent } from './components/atoms/icon-link/icon-link.component';
import { IconButtonComponent } from './components/atoms/icon-button/icon-button.component';
import { TableSortDirectionComponent } from './components/atoms/table-sort-direction/table-sort-direction.component';
import { ToastComponent } from './components/atoms/toast/toast.component';
import { GetCategoriesComponent } from './page/get-categories/get-categories.component';
import {RouterModule} from "@angular/router";
import { GetBrandsComponent } from './page/get-brands/get-brands.component';
import { DataTableComponent } from './components/molecules/data-table/data-table.component';
import {CreateBrandComponent} from "./page/create-brand/create-brand.component";
import { CreateFormComponent } from './components/molecules/create-form/create-form.component';
import { CreateItemComponent } from './page/create-item/create-item.component';
import { TableItemComponent } from './components/molecules/table-item/table-item.component';
import { MultiSelectTagComponent } from './components/molecules/multi-select-tag/multi-select-tag.component';
import { GetItemsComponent } from './page/get-items/get-items.component';
import { ItemDataTableComponent } from './components/molecules/item-data-table/item-data-table.component';
import { PaginationComponent } from './components/molecules/pagination/pagination.component'; // Importar FormsModule



@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent,
    CreateCategoryComponent,
    NavigationBarElementComponent,
    NavigationBarComponent,
    MainButtonComponent,

    FooterComponent,
    HeaderComponent,
    FormDataComponent,
    IconLinkComponent,
    IconButtonComponent,
    TableSortDirectionComponent,
    ToastComponent,
    GetCategoriesComponent,
    GetBrandsComponent,
    DataTableComponent,
    CreateBrandComponent,
    CreateFormComponent,
    CreateItemComponent,
    TableItemComponent,
    MultiSelectTagComponent,
    GetItemsComponent,
    ItemDataTableComponent,
    PaginationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage,
        RouterModule,
        ReactiveFormsModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
