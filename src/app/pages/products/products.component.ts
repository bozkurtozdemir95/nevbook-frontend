import {Component} from '@angular/core';
import productData from '../../data/products.json';
import categoryData from '../../data/categories.json';
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  allProducts = productData;
  categories = categoryData;
  filteredArray: any;
  activeCategoryId: any;
  activeClass: any;
  page = 1;

  categoriesCollapsed = true;


  pricedProducts: any = [];
  randomPrices = [1199, 1699, 2499, 2999, 3199, 3499, 3999, 4599, 5499, 5999];

  constructor(public ui: UiService) {

    this.allProducts.map((e: any) => {
      e.price = this.randomPrices[Math.floor(Math.random() * 9) + 1];
      this.pricedProducts.push(e)
    })
  }

  ngOnInit(): void {
    this.activeClass = 'active';
    this.filteredArray = this.allProducts;
  }

  onChangePrice(value: any): void {
    if (value.target.value == 1) {
      this.filteredArray.sort((a: any, b: any) => a.price - b.price);
    } else if (value.target.value == 2) {
      this.filteredArray.sort((a: any, b: any) => b.price - a.price);
    }
  }

  onChangeDate(value: any): void {
    if (value.target.value == 1) {
      this.filteredArray.sort((a: any, b: any) => {
        // @ts-ignore
        return new Date(b.created_at) - new Date(a.created_at);
      });
    } else if (value.target.value == 2) {
      this.filteredArray.sort((a: any, b: any) => {
        // @ts-ignore
        return new Date(a.created_at) - new Date(b.created_at);
      });
    }
  }

  onSearchChange(filter: any) {
    // @ts-ignore
    this.filteredArray = this.allProducts.filter(item => {
        if (item.name.toString().toLowerCase().indexOf(filter.target.value.toLowerCase()) !== -1) {

        }
        this.filteredArray = this.allProducts;
      }
    );
  }

  filterByCategory(categoryID: number): void {
    this.filteredArray = [];
    this.allProducts.map((product: any) => {
        if (product.categoryID === categoryID) {
          this.filteredArray.push(product);
        }
      }
    );

    this.activeCategoryId = categoryID;
    this.activeClass = '';
    this.ui.scrollTop();
  }

  clearCategoryFilter(): void {
    this.filteredArray = this.allProducts;
    this.activeClass = 'active';
    this.activeCategoryId = '';
  }

  toggleCategories() {
    if (window.innerWidth <= 992) {
      this.categoriesCollapsed = !this.categoriesCollapsed;
    }
  }
}
