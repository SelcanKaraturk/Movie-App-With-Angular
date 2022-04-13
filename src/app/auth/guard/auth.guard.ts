import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";


@Injectable({providedIn:"root"})
export class AuthGuard implements CanActivate{
  constructor(private authServices: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authServices.user.pipe(
      map(user =>{
        return !!user;
      }),
      tap(isAuthUser =>{
        if (!isAuthUser){
           this.router.navigate(['/auth']);
        }
      })
    )
  }


}
