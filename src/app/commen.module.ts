import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UserInterceptor} from "./auth/user.interceptor";
import {ErrorInterceptor} from "./shared/error.interceptor";

@NgModule({
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:UserInterceptor, multi:true},
  ]
})

export class CommenModule{}
