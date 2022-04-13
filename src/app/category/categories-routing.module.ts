import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoryCreateComponent} from "./category-create/category-create.component";

const routes:Routes = [
  { path:'create/category', component: CategoryCreateComponent},
]

@NgModule({

  imports:[
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoriesRoutingModule{}
