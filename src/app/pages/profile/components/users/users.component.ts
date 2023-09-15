import {Component, OnInit} from '@angular/core';
import * as XLSX from "xlsx";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {Toastr} from "../../../../services/toastr.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userTable = null;
  users: any = [];

  constructor(private userService: UserService, public router: Router,
              public auth: AuthService,
              private toastr: Toastr) {
  }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe((e: any) => {
      this.users = e;
    })
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
    this.userService.importUsers(this.userTable).subscribe(
      (result: any) => {
        this.toastr.success('Users imported!');
        this.getUsers();
      },
      (error: any) => {
        this.toastr.error('User import failed');
      },
    );
  }

  changeAdmin(id: number, e: any) {
    this.userService.changeRole(id).subscribe((e: any) => e);
    setTimeout(() => {
      this.getUsers();
    }, 200)
  }

  fileChoosed(e: any) {
    console.log(e.target.files[0].name);
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(
      (result: any) => {
        this.toastr.success('Users deleted successfully.');
        setTimeout(() => {
          this.getUsers();
        }, 200)
      },
      (error: any) => {
        this.toastr.error('User delete failed');
      },
    );
  }

}
