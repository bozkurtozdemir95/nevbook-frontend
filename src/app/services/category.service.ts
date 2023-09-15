import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.api + '/category/get');
  }
}
