import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { OrderService } from '../../order.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input() product: Product;
  amount = 1;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  selectProduct(name: string, amount: number, price: number) {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    this.orderService.addRecord({ name, amount, price, createdAt });
  }

}
