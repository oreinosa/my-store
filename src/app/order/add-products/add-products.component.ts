import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getProducts("All");
  }

  getProducts(category: string){
    this.products$ = this.orderService.getProducts(category);
  }

}
