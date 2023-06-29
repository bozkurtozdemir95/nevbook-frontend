import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class Toastr {

  constructor(private toastr: ToastrService) { }


  error(message: string){
    this.toastr.error(message, 'Error', {
      progressBar: true,
      timeOut: 20000
    });
  }
  success(message: string){
    this.toastr.success(message, 'Success', {
      progressBar: true,
      timeOut: 20000
    });
  }

}
