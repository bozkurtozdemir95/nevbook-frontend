import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import {OrderService} from "../../../../services/order.service";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";
import {Toastr} from "../../../../services/toastr.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  server = environment.serverURL;
  // @ts-ignore
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  selectedOrder: any;
  orders: any = [];

  constructor(public orderService: OrderService, public router: Router,
              private toastr: Toastr,) {
  }

  ngOnInit() {
    this.orderService.getAll().subscribe((e: any) => {
      this.orders = e;
    })
  }


  viewOrder(id: any) {
    this.orderService.get(id).subscribe((e: any) => {
      this.selectedOrder = e;
    })
  }

  backToOrders() {
    this.selectedOrder = null;
  }

  downloadAsPDF() {
    const doc = new jsPDF('p', 'pt', 'letter');
    let ordersToPrint = [];
    const PDFbody: any = [];
    this.orders.map((e: any) => {
      ordersToPrint = [e.id, new Date(e.created_at).toLocaleString(), e.shipped ? "Completed" : "Processing", e.total];
      PDFbody.push(ordersToPrint);
    })
    autoTable(doc, {
      head: [['Order', 'Date', 'Status', 'Total']],
      body: PDFbody,
    });
    doc.save();
  }

  completeOrder(id: any) {
    this.orderService.complete(id).subscribe(
      (result: any) => {
        this.toastr.success('Order completed!');
        this.router.navigate(['profile'])
      },
      (error: any) => {
        this.toastr.error('There was an error!');
      },
    );
  }
}
