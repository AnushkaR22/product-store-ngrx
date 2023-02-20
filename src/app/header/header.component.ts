import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() productQuantity;
  constructor(private route: Router) { }

  //navigate to cart
  navigateToCart() {
    this.route.navigate(['/cart']);
  }
}
