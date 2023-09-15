import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = environment.serverURL;

  constructor(private http: HttpClient) {
  }


  getAll() {
    return this.http.post(this.api + '/product/get_all', {});
  }

  getByCategory(id: number) {
    return this.http.post(this.api + '/product/get_all/', {categoryID: +id});
  }
}
