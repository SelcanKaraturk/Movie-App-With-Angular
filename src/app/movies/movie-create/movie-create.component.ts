import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../movies.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, NgForm,Validators} from "@angular/forms";
import {ImageValidator} from "../../validator/image.validator";
import {CategoryService} from "../../category/category.service";
import {Category} from "../../category/category";
import {AlertifyService} from "../../shared/alertify.service";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MoviesService]
})
export class MovieCreateComponent implements OnInit {
  categories: Category[];
  model: any = [];

  constructor(private categoriesService: CategoryService, private movieService: MoviesService, private router: Router,
              private alert: AlertifyService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(data =>
      this.categories = data
    );
  }

  movieForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl('',[Validators.required, Validators.minLength(5)]),
    imgUrl: new FormControl('',[Validators.required,ImageValidator.isValidExtension]),
    categoryId: new FormControl('',[Validators.required])
  });

  inputForm(item:string){
    return this.movieForm.get(item);
 }
  clearForm(){
    this.movieForm.patchValue({
      title: '',
      description: '',
      imgUrl: '',
      categoryId: ''
    })
  }
  createMovie() {

    /*if (title.value === '' || description.value === '' || image.value === '' || category.value === '-1') {
      this.alert.error('Lütfen boş alan bırakmayınız')
      return;
    }
    const extension = ['jpeg', 'jpg', 'png'];
    if (extension.indexOf(image.value.split('.').pop()) === -1) {
      this.alert.error('İmage urliniz jpeg, jpg ve png formatında olmalıdır.')
      return;
    }*/

     const movie = {
       id: '',
       title: this.movieForm.value.title,
       description: this.movieForm.value.description,
       imgUrl: this.movieForm.value.imgUrl,
       isPopular: false,
       datePublished: new Date().getTime(),
       categoryId: this.movieForm.value.categoryId
     }
     this.movieService.createMovie(movie).subscribe(data =>{
         this.router.navigate(['/movies'])
     })

  }

  log(value: any) {
    console.log(value)
  }
}
