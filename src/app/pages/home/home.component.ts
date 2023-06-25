import { Component } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showNavigationArrows = true;
  showNavigationIndicators = true;
 sliders = [
   {id: 1, type: 'PROMOTION', img: 'slider-1', discount: 20, code: 'NEVEN', link: '/shop', valid_until: '31.07.2023', category: 'Business & Management'},
   {id: 2, type: 'PROMOTION', img: 'slider-2', discount: 15, code: 'FINKY', link: '/shop', valid_until: '18.08.2023', category: 'Education'},
 ]

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
}
