import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class ProfileComponent implements OnInit{


  constructor(public auth: AuthService, public router: Router, private userService: UserService) {
  }


  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }



}
