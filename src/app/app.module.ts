import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { MessageService, CommonService, serviceContainer } from 'src/app/service';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    DropdownModule,
    TabViewModule,
    PaginatorModule
  ],
  providers: [...serviceContainer,
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
