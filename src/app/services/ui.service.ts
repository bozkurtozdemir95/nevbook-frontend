import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  scrollTop() {
    setTimeout(function () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 500);
  }
}
