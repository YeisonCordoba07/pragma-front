import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconButtonComponent } from './atoms/icon-button/icon-button.component';
import { InputTextComponent } from './atoms/input-text/input-text.component';
import { SecondaryIconButtonComponent } from './atoms/secondary-icon-button/secondary-icon-button.component';


@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    InputTextComponent,
    SecondaryIconButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
