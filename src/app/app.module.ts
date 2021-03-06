import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PluginsModule } from 'interfaces';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { ModuleLoaderService } from './module-loader.service';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    PluginsModule.forRoot()
  ],
  providers: [ModuleLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
