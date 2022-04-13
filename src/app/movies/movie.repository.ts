import {Movie} from "./movie";

export class MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [
      /*{id: 1, title: "film 1", description: "film 1 Lorem ipsum", imgUrl: "1.jpg", isPopular: true, datePublished: new Date(1990,10,10)},
      {id: 2, title: "film 2", description: "film 2 açıklama", imgUrl: "2.jpg", isPopular: false, datePublished: new Date(1990,10,10)},
      {id: 3, title: "film 3", description: "film 3 açıklama", imgUrl: "3.jpg", isPopular: true, datePublished: new Date(1990,10,10)},
      {id: 4, title: "film 4", description: "film 4 açıklama", imgUrl: "4.jpg", isPopular: true, datePublished: new Date(1990,10,10)},
      {id: 5, title: "film 5", description: "film 5 açıklama", imgUrl: "4.jpg", isPopular: true, datePublished: new Date(1990,10,10)}*/
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }
  getPopularFilms(): Movie[] { // geriye movie dizisi döndürecek anlamına gelir
    return this.movies.filter(i => i.isPopular)
  }

  /*getMovieById(id: number): Movie {
   /!* return this.movies.find(i => i.id === id);*!/
  }*/
}


