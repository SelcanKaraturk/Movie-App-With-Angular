import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MoviesModule} from "./movies/movies.module";
import {SharedModule} from "./shared/shared.module";
import {CommenModule} from "./commen.module";
import {AuthModule} from "./auth/auth.module";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, // new create
    ReactiveFormsModule,
    SharedModule, //alert ve login
    CommenModule// interceptorlar var
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
