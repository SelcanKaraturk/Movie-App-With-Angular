import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Movie} from "./movie";
import {FavoriteList} from "./favoriteList";


@Injectable()

export class MoviesService {
  url = 'http://localhost:3000/movies';
  url_firebase = "https://angular-movie-app-ebb02-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) {
  }

  getMovies(categoryId: any): Observable<Movie[]> {
    let newUrl = this.url_firebase + "/movies.json";

    return this.http.get<Movie[]>(newUrl)
      .pipe(
        map(response => {
          console.log(response);
          const movies: Movie[] = [];
          for (const key in response) {
            if (categoryId) {
              if (categoryId == response[key].categoryId) {
                movies.push({...response[key], id: key})
              }
            } else {
              movies.push({...response[key], id: key});
            }

          }
          return movies;
        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getMovieById(movieId: any): Observable<Movie> {
    let movieUrl = this.url_firebase;
    if (movieId) {
      movieUrl += "movies/" + movieId + ".json";
    }
    return this.http.get<Movie>(movieUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token'
      })
    }
    return this.http.post<Movie>(this.url_firebase + "/movies.json", movie, httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //client || network
      console.log("error:" + error.error.message);
    } else {
      // backend hatalar??
      switch (error.status) {
        case 404:
          console.log("not found")
          break;
        case 403:
          console.log("access denied")
          break;
        case 500:
          console.log("interval server")
          break;
        default:
          console.log('Bilinmeyen bir hata olu??tu');
      }

    }
    return throwError('Bir hata olu??tu')
  }

  addList(item: FavoriteList) {
    return this.http.post<FavoriteList>(this.url_firebase + '/users/' + item.userId + '/list/' + item.movieId + '.json', {
      dateAdded: new Date().getTime()
    }).pipe(
      catchError(this.handleError)
    )
  }

  deleteList(item: FavoriteList) {
    return this.http.delete<FavoriteList>(this.url_firebase + 'users/' + item.userId + '/list/' + item.movieId + '.json').pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
  }

  getList(userId:string): Observable<string[]>{
    return this.http.get<string[]>(this.url_firebase+/users/+userId+'/list.json').pipe(
      map(data =>{
        const movies:string[]=[]
        for (const key in data){
          movies.push(key);
        }
        return movies
      }),
      catchError(this.handleError)
    )
  }
}
