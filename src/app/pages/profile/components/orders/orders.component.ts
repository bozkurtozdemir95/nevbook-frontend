import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  // @ts-ignore
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  selectedOrder = null;
  orders: any = [];

  constructor(public orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAll().subscribe((e: any) => {
      this.orders = e;
    })
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
    this.orders.map((e: any) => {
      ordersToPrint = [e.id, e.date, e.status, e.total, e.items];
      PDFbody.push(ordersToPrint);
    })
    autoTable(doc, {
      head: [['Order', 'Date', 'Status', 'Total']],
      body: PDFbody,
    });
    doc.save();
  }
}
