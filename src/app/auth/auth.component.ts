import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthResponse} from "../models/AuthResponse";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  error:string;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    /*console.log(form.value.email)*/
    this.error="";
    if (form.invalid)
      return;

    let authResponse: Observable<AuthResponse>;
    if (this.isLogin) {
      authResponse = this.authService.signIn(form.value.email, form.value.password);
    } else {
      authResponse = this.authService.signUp(form.value.email, form.value.password);
    }
    authResponse.subscribe(response =>{
      this.router.navigate(['/movies']);
    },err=>{
      this.error = err;
    })
    form.reset();
  }

  changeLogin() {
    this.isLogin = !this.isLogin;
  }
  closeModel($event:any){
    console.log($event);
    this.error = null;
  }

}
