import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  // @ts-ignore
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  orders = [
    {id: '8315', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '8316', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '8317', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '8325', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '8345', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '8315', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '7315', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
    {id: '9315', date: 'June 30, 2023', status: 'Processing', total: 15000, items: 4, customer: {}},
  ];


  showLogin = true;

  selectedOrder = null;

  constructor(public auth: AuthService, public router: Router) {
  }


  changeForm() {
    this.showLogin = !this.showLogin;
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }

  viewOrder(id: any) {
    this.selectedOrder = id;
  }

  backToOrders() {
    this.selectedOrder = null;
  }


  downloadAsPDF() {
    const doc = new jsPDF('p', 'pt', 'letter');
    let ordersToPrint = [];
    const PDFbody: any = [];
    this.orders.map(a => {
      ordersToPrint = []
      ordersToPrint.push(a.id);
      ordersToPrint.push(a.date);
      ordersToPrint.push(a.status);
      ordersToPrint.push(a.total);
      ordersToPrint.push(a.items);
      PDFbody.push(ordersToPrint);
    })
    autoTable(doc, {
      head: [['Order', 'Date', 'Status', 'Total']],
      body: PDFbody,
    });
    doc.save();
  }
}
