import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  showLogin = true;


  userTable = null;

  constructor(public auth: AuthService, public router: Router, private userService: UserService) {
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }


  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      const key = Object.keys(jsonData)[0];
      this.userTable = jsonData[key];
      // @ts-ignore
      //document.getElementById('output').innerHTML = dataString.slice(0, 300);
    }
    reader.readAsBinaryString(file);
  }

  importUsers() {
    this.userService.importUsers(this.userTable)
  }
}
