import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../services/category.service";
import {ProductService} from "../../../../services/product.service";
import {environment} from "../../../../../environments/environment";
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  fileName= 'products.xlsx';
  server = environment.serverURL;
  categories: any = [];
  allProducts: any = [];
  filteredArray: any = [];
  selectedCategory = "";

  constructor(public categoryService: CategoryService, public productService: ProductService) {
  }


  ngOnInit() {
    this.categoryService.getAll().subscribe((e: any) => {
      this.categories = e;
    });

    this.productService.getAll().subscribe((e: any) => {
      this.allProducts = e;
    });
  }

  onCategoryChange(e: any) {
    this.productService.getByCategory(e.target.value).subscribe((e: any) => {
      this.filteredArray = e;
    });
  }

  exportXlsx() {
    let element = document.querySelector('#products-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
