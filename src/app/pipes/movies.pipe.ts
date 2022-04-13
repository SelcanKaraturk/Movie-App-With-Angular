import {Pipe, PipeTransform} from '@angular/core';
import {Movie} from "../movies/movie";



@Pipe({
  name: 'moviesPipe'
})
export class MoviesPipe implements PipeTransform {

  transform(movies: Movie[], fullText: string) {
    fullText = fullText.toLowerCase();
    console.log(fullText);
    console.log(movies.filter(i => i.title.toLowerCase().indexOf(fullText) !== -1));

    return fullText ? movies.filter((m: Movie) => m.title.toLowerCase().indexOf(fullText) !== -1) : movies;
  }
}
