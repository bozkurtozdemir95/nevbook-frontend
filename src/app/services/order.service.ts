import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  get(id: any) {
    return this.http.get(this.api + '/order/get/' + id);
  }

  getAll() {
    return this.http.post(this.api + '/order/get_all', {});
  }

  create(data: any) {
    return this.http.post(this.api + '/order/create', data);
  }

  complete(id: any) {
    return this.http.get(this.api + '/order/complete/' + id);
  }
}
