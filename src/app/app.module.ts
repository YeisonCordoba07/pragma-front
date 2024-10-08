import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryIconButtonComponent } from './atoms/buttons/primary-icon-button/primary-icon-button.component';
import { InputTextComponent } from './atoms/input-text/input-text.component';
import { SecondaryIconButtonComponent } from './atoms/buttons/secondary-icon-button/secondary-icon-button.component';
import { SaveIconComponent } from './atoms/save-icon/save-icon.component';


import { CreateCategoryComponent } from './create-category/create-category.component';
import { NavigationBarElementComponent } from './atoms/navigation-bar-element/navigation-bar-element.component';
import { NavigationBarComponent } from './molecules/navigation-bar/navigation-bar.component';
import { PrimaryButtonComponent } from './atoms/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from './atoms/buttons/secondary-button/secondary-button.component';
import { FooterComponent } from './footer/footer.component'; // Importar FormsModule


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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
