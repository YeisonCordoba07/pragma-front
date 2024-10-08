import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconButtonComponent } from './atoms/icon-button/icon-button.component';
import { InputTextComponent } from './atoms/input-text/input-text.component';
import { SecondaryIconButtonComponent } from './atoms/secondary-icon-button/secondary-icon-button.component';
import { SaveIconComponent } from './atoms/save-icon/save-icon.component';


import { CreateCategoryComponent } from './create-category/create-category.component';
import { NavigationBarElementComponent } from './atoms/navigation-bar-element/navigation-bar-element.component';
import { NavigationBarComponent } from './molecules/navigation-bar/navigation-bar.component'; // Importar FormsModule


@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    InputTextComponent,
    SecondaryIconButtonComponent,
    SaveIconComponent,
    CreateCategoryComponent,
    NavigationBarElementComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
