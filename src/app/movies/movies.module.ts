import {NgModule} from "@angular/core";
import {MoviesComponent} from "./movies.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {MoviesHomeComponent} from "./movies-home/movies-home.component";
import {MoviesPipe} from "../pipes/movies.pipe";
import {MovieCreateComponent} from "./movie-create/movie-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SummaryPipe} from "../pipes/summary.pipe";
import {RouterModule} from "@angular/router";
import {MoviesRoutingModule} from "./movies-routing.module";
import {CategoriesModule} from "../category/categories.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    MoviesHomeComponent,
    MoviesComponent,
    MovieDetailsComponent,
    MoviesPipe,
    SummaryPipe,
    MovieCreateComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MoviesRoutingModule,
    CategoriesModule,
    SharedModule
  ],
  exports: [
    MoviesHomeComponent,
    MoviesComponent,
    MovieDetailsComponent,
    MoviesPipe,
    SummaryPipe,
    MovieCreateComponent,
  ]
})
export class MoviesModule{

}
