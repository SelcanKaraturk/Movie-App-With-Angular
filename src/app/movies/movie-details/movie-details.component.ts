import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../movies.service";
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../movie";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MoviesService]
})
export class MovieDetailsComponent implements OnInit {
  movie:Movie;
  error:any ="";

  constructor(private movieService:MoviesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>
    {
      this.movieService.getMovieById(param["movieId"]).subscribe(i =>{
          this.movie = i;
      }
      )
    },error => {this.error = error});
  }

}
