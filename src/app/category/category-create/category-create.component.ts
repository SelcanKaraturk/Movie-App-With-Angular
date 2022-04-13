import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {CategoryService} from "../category.service";

// @ts-ignore
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers:[CategoryService]
})
export class CategoryCreateComponent implements OnInit {


  constructor(private categoryServices:CategoryService,private router:Router) { }

  ngOnInit(): void {
  }

  createCategory(name:string){
  const category={
    id:'',
    name:name
  }
    this.categoryServices.createCategory(category).subscribe(data=>{
      this.router.navigate(['/'])
      }

    );
  }
}
