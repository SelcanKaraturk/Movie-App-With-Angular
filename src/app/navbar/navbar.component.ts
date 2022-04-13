import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  today=new Date();
  isAuthenticated:boolean = false;
  constructor(private authServices:AuthService, private router:  Router) { }

  ngOnInit(): void {
   this.authServices.user.subscribe(user =>{
    this.isAuthenticated = !!user;
   })
  }

  onLogout(){
    this.authServices.logouth();
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
  }

}
