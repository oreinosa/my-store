import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { OrderRecord } from 'src/app/shared/models/order-record.model';
import { OrderService } from '../../order.service';

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

  selectProduct(name: string, amount: number, price: string) {
    this.orderService.addRecord({ name, amount, price });
  }

}
