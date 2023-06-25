import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: any = [
    {id: 0, title: "Home", link: '/'},
    {id: 1, title: "Shop", link: '/shop'},
    {id: 2, title: "About", link: '/about'},
    {id: 3, title: "Contact", link: '/contact'},
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
