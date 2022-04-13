import {Component, OnInit} from '@angular/core';
import {Category} from "./category";
import {CategoryService} from "./category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  /*categoryRepo: CategoryRepository;*/
  selectedCategory: Category = null;
  rout ="";

  //categories=['macera','romantik','bilim kurgu','fantastik']

  constructor(private categoryServices: CategoryService) {
    /*this.categoryRepo = new CategoryRepository();
    this.categories = this.categoryRepo.getCategory();*/
  }

  ngOnInit(): void {
     this.categoryServices.getCategories().subscribe(data => {
       this.categories = data;
    },error => {console.log(error)});
  }
  defaultValue = true;
  selectCategory(item?: Category) {
    if (item) {
      this.selectedCategory = item;
      this.defaultValue = false;
    } else {
      this.defaultValue = true;
      this.selectedCategory = null;
    }

  }

}
