import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryIconButtonComponent } from './atoms/buttons/primary-icon-button/primary-icon-button.component';
import { InputTextComponent } from './atoms/input-text/input-text.component';
import { SecondaryIconButtonComponent } from './atoms/buttons/secondary-icon-button/secondary-icon-button.component';
import { SaveIconComponent } from './atoms/save-icon/save-icon.component';


import { CreateCategoryComponent } from './page/create-category/create-category.component';
import { NavigationBarElementComponent } from './atoms/navigation-bar-element/navigation-bar-element.component';
import { NavigationBarComponent } from './molecules/navigation-bar/navigation-bar.component';
import { PrimaryButtonComponent } from './atoms/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from './atoms/buttons/secondary-button/secondary-button.component';
import { FooterComponent } from './molecules/footer/footer.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './molecules/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { GetCategoriesComponent } from './page/get-categories/get-categories.component';
import { IconLinkComponent } from './atoms/icon-link/icon-link.component';
import { IconButtonComponent } from './atoms/icon-button/icon-button.component'; // Importar FormsModule



@NgModule({
  declarations: [
    AppComponent,
    PrimaryIconButtonComponent,
    InputTextComponent,
    SecondaryIconButtonComponent,
    SaveIconComponent,
    CreateCategoryComponent,
    NavigationBarElementComponent,
    NavigationBarComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    FooterComponent,
    HeaderComponent,
    GetCategoriesComponent,
    IconLinkComponent,
    IconButtonComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
