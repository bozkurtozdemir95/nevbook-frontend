import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {MenuItem} from "../interfaces/menu-item";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  menu: any = [];
  api = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.api + '/api/category');
  }

  getCategory(id: number) {
    return this.http.get(this.api + '/api/category/' + id);

  }
}
