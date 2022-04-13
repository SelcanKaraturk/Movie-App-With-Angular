import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "./movies.service";
import {Movie} from "./movie";
import {AuthService} from "../auth/auth.service";
import {AlertifyService} from "../shared/alertify.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService] //global olmasını istemiyorsan app modulde değil component ts de çağırırsın
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  /*popularMovies: Movie[];
  moviesRepository: MovieRepository;*/
  FilteredInput: Movie[] = [];
  title = "Film Listesi";
  fullText: string = "";
  error: any = "";
  loading: boolean = false;
  today = new Date();
  userId: string;
  movieList:string[];

  constructor(private alertify: AlertifyService, private movieService: MoviesService, private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    /*this.moviesRepository = new MovieRepository();
    this.movies = this.moviesRepository.getMovies();
    this.popularMovies = this.moviesRepository.getPopularFilms();*/

  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user){
      this.loading = true;
      this.userId = user.id;
      this.activatedRoute.params.subscribe(params => {
        this.movieService.getMovies(params["categoryId"]).subscribe(data => {
          this.movies = data;
          this.FilteredInput = this.movies;
          this.movieService.getList(this.userId).subscribe(data=>{
            this.movieList=data;
          })
          this.loading = false;
        }, error => {
          this.error = error
          this.loading = false;
        });
      });
      }
    });
  }

  getButtonstate(movie:Movie): boolean{
    return this.movieList.findIndex(m => m === movie.id ) !== -1
  }

  inputChange() {
    this.FilteredInput = this.fullText ? this.FilteredInput.filter(m => m.title.indexOf(this.fullText) !== -1
      || m.description.indexOf(this.fullText) !== -1)
      : this.movies;
  }

  addToList($event: any, movie: Movie) {
    if ($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = 'Listeden Çıkar';
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      this.movieService.addList({userId: this.userId, movieId: movie.id}).subscribe(() =>
        this.alertify.success(movie.title.substring(0, 1).toUpperCase() + movie.title.substring(1) + ' listeye Eklendi')
      )

    } else {
      $event.target.innerText = 'Listeye Ekle';
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');
      this.movieService.deleteList({userId: this.userId, movieId: movie.id}).subscribe(() => {
        this.alertify.error(movie.title.substring(0, 1).toUpperCase() + movie.title.substring(1) + ' listeden çıkarıldı');
      })
    }
  }

  /*movies = ["film 1", "film 2", "film 3", "film 4"];*/
}
