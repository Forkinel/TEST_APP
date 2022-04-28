import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
/** admin component*/
export class AdminComponent {
    /** admin ctor */

    navLinks: any[];
    activeLinkIndex = 0;
    constructor(private router: Router) {
        this.navLinks = [
            {
                label: 'Users',
                link: 'users',
                index: 0
            },
            {
                label: 'Companies',
                link: 'companies',
                index: 1
            },
            {
                label: 'Sites',
                link: 'sites',
                index: 2
            },
            {
                label: 'Kits',
                link: 'kits',
                index: 3
            },            
            {
                label: 'Tests',
                link: 'tests',
                index: 4
            },
            {
                label: 'Standards',
                link: 'standards',
                index: 5
            },
            {
                label: 'Calendar',
                link: 'calendar',
                index: 6
            }

        ];
    }

    ngOnInit(): void {
        this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
        });
    }
}
