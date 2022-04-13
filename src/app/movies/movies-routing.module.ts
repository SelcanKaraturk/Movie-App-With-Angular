import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import {MoviesHomeComponent} from "./movies-home/movies-home.component";
import {MoviesComponent} from "./movies.component";
import {MovieCreateComponent} from "./movie-create/movie-create.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {AuthGuard} from "../auth/guard/auth.guard";


const rootes: Routes =[
  { path: '', component: MoviesHomeComponent,children:[
      { path: '', component: MoviesComponent},
      { path:'category/:categoryId', component: MoviesComponent},
      { path:'create', component: MovieCreateComponent},
      { path:':movieId', component: MovieDetailsComponent},
    ], canActivate: [AuthGuard]},
]

@NgModule({
  imports:[
    RouterModule.forChild(rootes)
  ],
  exports: [
    RouterModule
  ]

})
export class MoviesRoutingModule{}
