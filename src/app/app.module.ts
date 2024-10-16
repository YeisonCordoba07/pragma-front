import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputTextComponent } from './atoms/input-text/input-text.component';
import { SaveIconComponent } from './atoms/save-icon/save-icon.component';


import { CreateCategoryComponent } from './page/create-category/create-category.component';
import { NavigationBarElementComponent } from './atoms/navigation-bar-element/navigation-bar-element.component';
import { NavigationBarComponent } from './molecules/navigation-bar/navigation-bar.component';
import { MainButtonComponent } from './atoms/main-button/main-button.component';
import { FooterComponent } from './molecules/footer/footer.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './molecules/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { FormDataComponent } from './atoms/form-data/form-data.component';
import { IconLinkComponent } from './atoms/icon-link/icon-link.component';
import { IconButtonComponent } from './atoms/icon-button/icon-button.component';
import { TableSortDirectionComponent } from './atoms/table-sort-direction/table-sort-direction.component';
import { ToastComponent } from './atoms/toast/toast.component';
import { GetCategoriesComponent } from './page/get-categories/get-categories.component';
import {RouterLink} from "@angular/router"; // Importar FormsModule



@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent,
    SaveIconComponent,
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
    GetCategoriesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage,
        RouterLink,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
