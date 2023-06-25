import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import products from '../../data/products.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  activeButton: any;
  @Input() activeButtonID: any;
  @Input() content: any;
  @Output() valueChange = new EventEmitter<number>();
  @ViewChild('tabsSlider') public targetSlider: ElementRef | any;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  sliders = [
    {
      id: 1,
      type: 'PROMOTION',
      img: 'slider-1',
      discount: 20,
      code: 'NEVEN',
      link: '/shop',
      valid_until: '31.07.2023',
      category: 'Business & Management'
    },
    {
      id: 2,
      type: 'PROMOTION',
      img: 'slider-2',
      discount: 15,
      code: 'FINKY',
      link: '/shop',
      valid_until: '18.08.2023',
      category: 'Education'
    },
  ];

  productData = products;

  filteredProducts: any = [
    [], [], [], []
  ];
  productsLength = 8;
  pageLoaded = false;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(){
    console.log(this.pageLoaded)

  }
  async ngAfterViewInit() {
    //await this.setSlidePosition();
    await this.fetchData().then(r => this.pageLoaded=true);
    await console.log(this.filteredProducts);
    await console.log(this.pageLoaded)
  }

  async fetchData() {
    await this.productData.map((e: any) => {
      switch (e.parentID) {
        case 5:
          this.filteredProducts[0].push(e);
          break;
        case 15:
          this.filteredProducts[1].push(e);
          break;
        case 10:
          this.filteredProducts[2].push(e);
          break;
        case 20:
          this.filteredProducts[3].push(e);
          break;
      }
    });
    this.filteredProducts[0] = this.filteredProducts[0].slice(0,8);
    this.filteredProducts[1] = this.filteredProducts[1].slice(0,8);
    this.filteredProducts[2] = this.filteredProducts[2].slice(0,8);
    this.filteredProducts[3] = this.filteredProducts[3].slice(0,8);

  }

  selectButton(e: any) {
    const width = e.target.offsetWidth;
    const left = e.target.offsetLeft;
    this.targetSlider.nativeElement.style.width = width + 'px';
    this.targetSlider.nativeElement.style.left = left + 'px';
  }

  setSlidePosition() {
    this.activeButton = document.querySelector('.featured-books-nav .nav-link.active');
    const width = this.activeButton.offsetWidth;
    const left = this.activeButton.offsetLeft;
    this.targetSlider.nativeElement.style.width = width + 'px';
    this.targetSlider.nativeElement.style.left = left + 'px';
  }
}
