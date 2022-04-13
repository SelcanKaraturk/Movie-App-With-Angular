import {NgModule} from "@angular/core";
import {CategoryComponent} from "./category.component";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CategoriesRoutingModule} from "./categories-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations:[
    CategoryComponent,
    CategoryCreateComponent,
  ],
  imports:[
    RouterModule, /*Bunu koymasakta olur çünkü category routinginde var o olmasaydı koymak zorundaydık*/
    CategoriesRoutingModule,
    /*RouterModule.forChild([{path:'create/category', component:CategoryCreateComponent}])*/
    FormsModule,
    SharedModule
  ],
  exports:[
    CategoryComponent,
    CategoryCreateComponent,
  ]
})
export class CategoriesModule{

}
