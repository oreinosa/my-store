import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  @Output("selectCategory") selectCategoryEmitter = new EventEmitter<string>();
  activeCategory: Category = { name: "All" };
  categories$: Observable<Category[]>;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.categories$ = this.orderService.getCategories();
  }

  onSelectCategory(category: Category) {
    this.activeCategory = category;
    this.selectCategoryEmitter.emit(category.name);
  }

}
