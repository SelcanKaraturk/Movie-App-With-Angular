import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";

import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class UserInterceptor implements HttpInterceptor{

 constructor(private authServices: AuthService) {
 }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authServices.user.pipe(
      take(1),
      exhaustMap(user =>{
        if (!user){
          return next.handle(req);
        }
        const updateReq= req.clone({
          params: new HttpParams().set('auth',user.token)
        });
        return next.handle(updateReq);
      })
    )
  }
}
