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
  activeCategoryName: string = "all";
  activeClass: any;
  page = 1;

  categoriesCollapsed = true;


  constructor(public ui: UiService) {
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
    this.filteredArray = this.allProducts.filter(item => {
      return item.name.toLowerCase().includes(filter.target.value.toLowerCase());
    });
  }

  filterByCategory(categoryID: number, categoryName: string): void {
    this.filteredArray = [];
    this.allProducts.map((product: any) => {
        if (product.categoryID === categoryID) {
          this.filteredArray.push(product);
        }
      }
    );
    if (window.innerWidth <= 992) {
      this.categoriesCollapsed = true;
    }
    this.activeCategoryName = categoryName;
    this.activeCategoryId = categoryID;
    this.activeClass = '';
    this.ui.scrollTop();
  }

  clearCategoryFilter(): void {
    this.filteredArray = this.allProducts;
    this.activeClass = 'active';
    this.activeCategoryId = '';
    this.activeCategoryName = 'all';
  }

  toggleCategories() {
    if (window.innerWidth <= 992) {
      this.categoriesCollapsed = !this.categoriesCollapsed;
    }
  }
}
