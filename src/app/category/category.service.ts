import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Category} from "./category";

@Injectable()
export class CategoryService {

  url = " http://localhost:3000/categories";
  url_firebase="https://angular-movie-app-ebb02-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url_firebase+"category.json").pipe(
      map(response => {
          const categories:Category[]=[];
          for (const key in response){
            categories.push({...response[key],id:key})
          }
          console.log(categories);
          return categories;
      })
    );
  }

  createCategory(category:Category): Observable<Category>{
    return this.http.post<Category>(this.url_firebase+"category.json",category);
}
}
