import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { OrdersService } from 'src/app/orders/orders.service';
import { tap } from 'rxjs/operators';

export abstract class ViewOrder {
  order: Order;
  products$: Observable<Product[]>
  displayedColumns = ["name", "price", "amount", "total"];
  constructor(
    public ordersService: OrdersService
  ) { }

  async ngOnInit() {
    this.order = await this.getOrder();
    this.products$ = this.getProducts();
  }

  getProducts() {
    return this.ordersService.getOrderProducts(this.order.id).pipe(tap(console.log));
  }

  abstract getOrder(): Promise<Order>;

}
