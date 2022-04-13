import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthResponse} from "../models/AuthResponse";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  apiKey = "AIzaSyDAcnA4h6bw_Ro-XtQpFYTBf6NSgkR8y0k";
  user = new BehaviorSubject<User>(null);

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response=>{
        this.handleAuthendication(response.email,response.localId,response.idToken,+response.expiresIn);
      })
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response=>{
        this.handleAuthendication(response.email,response.localId,response.idToken,+response.expiresIn);
      })
    )
  }

  logouth(){
    this.user.next(null);
  }
  autoLogin(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      return;
    }
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
    if (loadedUser.token){
      this.user.next(loadedUser);
    }
  }
  handleAuthendication(email:string,id:string,token:string,time:number){
    const expiresIn = new Date(new Date().getTime() + (time * 1000));
    const user = new User(
      email,
      id,
      token,
      expiresIn
    );
    this.user.next(user); // aynı user bilgisine her yerde ulaşabilmek için subject olarak tanımlıyoruz
    localStorage.setItem('user', JSON.stringify(user));
  }
  /*private handleError(response: HttpErrorResponse) {
    let message = 'Hata Oluştu';
    if (!navigator.onLine){
      return throwError('İnternet Bağlantınız Yok');
    }
    if (response.error.error){
      switch (response.error.error.message) {
        case "EMAIL_NOT_FOUND":
          message = 'Email Bulunamadı'
          break;
        case "INVALID_PASSWORD":
          message = "Parolanızı kontrol ediniz"
          break;
        case "EMAIL_EXISTS":
          message = "Bu email daha önce oluşturulmuştur"
          break;
      }
    }
    return throwError(message);
  }*/
}
