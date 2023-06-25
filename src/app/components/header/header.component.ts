import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: any = [
    {id: 0, title: "home", link: '/'},
    {id: 1, title: "shop", link: '/shop'},
    {id: 2, title: "about", link: '/about'},
    {id: 3, title: "contact", link: '/contact'},
  ];

  languages = [
    {id: 1, key: 'en', value: 'English'},
    {id: 2, key: 'mk', value: 'македонски'},
  ];

  constructor(public langService: TranslateService) {
  }

  ngOnInit() {
  }

  changeLang(key: string) {
    this.langService.use(key);
  }
}
