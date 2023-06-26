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
  organizedCategories: any = [];
  filteredArray: any;
  activeCategoryId: any;
  activeClass: any;
  openedCategory = 0;
  page= 1;

  constructor(public ui: UiService) {

    this.categories.filter((e: any) => {
      if (e.parentID === 0) {
        e = {...e, subMenu: []}
        this.organizedCategories.push(e);
      } else {
        this.organizedCategories[e.parentID - 1].subMenu.push(e);
        console.log(this.organizedCategories)
      }
    });
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
    this.filteredArray = this.allProducts.filter((item: any) => {
        if (item.product_name.toString().toLowerCase().indexOf(filter.target.value.toLowerCase()) === -1) {
          this.filteredArray = this.allProducts;
        }
      }
    );
  }

  filterByCategory(categoryID: number): void {
    this.filteredArray = [];
    this.allProducts.map((product: any) => {
        const id = product.categoryID <= 23 ? product.categoryID : product.parentID
        if (id === categoryID) {
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

  toggleCategoryCollapse(id: number) {
    id === this.openedCategory ? this.openedCategory = 0 : this.openedCategory = id;
  }
}
