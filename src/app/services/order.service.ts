import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api = environment.serverURL;
  order = {
    address: "adddress",
    city: "hakkari",
    province: "sadasd",
    zip_code: 102,
    name_on_card: "Deneme",
    discount: 0,
    total: 1950,
    products: [{quantity: 0, productID: 1}, {quantity: 0, productID: 2}],
  }

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.post(this.api + '/order/get_all', {});
  }

  create(data: any) {
    console.log("create")
    return this.http.post(this.api + '/order/create', data);
  }
}
