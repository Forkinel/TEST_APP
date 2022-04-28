import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent{

    navLinks: any[];
    activeLinkIndex = 0;
    constructor(private router: Router) {
        this.navLinks = [
            {
                label: 'Orders',
                link: 'orders',
                index: 0
            }           
        ];
    }

    ngOnInit(): void {
        this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
        });
    }
}
