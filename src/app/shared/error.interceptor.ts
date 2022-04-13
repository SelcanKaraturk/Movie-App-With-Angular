import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response:HttpErrorResponse)=>{
        let message = "Bir Hata Oluştu";
        if (!navigator.onLine){
          return throwError('İnternet Bağlantınız Yok');
        }
        if(response.error.error){
          if (response.status == 401){
            console.log('Bu sayfaya erişim izniniz yoktur');
            return throwError('Bu sayfaya erişim izniniz yoktur');
          }
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
      })
    )
  }

}
