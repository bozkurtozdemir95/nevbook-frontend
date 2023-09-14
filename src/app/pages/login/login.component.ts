import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  activeButton: any;
  activeTab = 'login';
  @ViewChild('tabsSlider') public targetSlider: ElementRef | any;

  constructor() {
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.setSlidePosition();
  }

  selectButton(e: any) {
    const width = e.target.offsetWidth;
    const left = e.target.offsetLeft;
    this.targetSlider.nativeElement.style.width = width + 'px';
    this.targetSlider.nativeElement.style.left = left + 'px';
  }

  setSlidePosition() {
    this.activeButton = document.querySelector('.auth-wrapper .auth-box .nav-pills .nav-link.active');
    const width = this.activeButton.offsetWidth;
    const left = this.activeButton.offsetLeft;
    this.targetSlider.nativeElement.style.width = width + 'px';
    this.targetSlider.nativeElement.style.left = left + 'px';
  }
}
