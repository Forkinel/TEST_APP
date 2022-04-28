import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

userDetails: any;
public _opened: boolean = false;

panelLinks: any[];

  constructor(private router : Router, private service : UserService) {

    
    this.panelLinks = [

      {
        label: 'Customer',
        link: 'customer/',
        index: 1
      },
      {
            label: 'Admin',
            link: 'admin',
            index: 2

       }                    
      // ,{
      //     label: 'Lab',
      //     link: '/lab/results',
      //     index: 3
      // },
      // {
      //     label: 'Kits',
      //     link: '/kits/daily',
      //     index: 4
      // },
      // {
      //   label: 'TEMP CREATE ORDER',
      //   link: 'customer/orders/create-order/1',
      //   index: 5
     // },


  ];
   }

  ngOnInit() {

    this.service.getUserProfile().subscribe(

      res => {
        console.log('userdtails ',res);
        this.userDetails = res ;
       //debugger;
      },
      err => {
        console.log(err);
      },

    )
  }

  onLogout(){
    localStorage.removeItem('token')
    this.router.navigate(['/user/login']);
  }

  public _toggleSidebar(ele) {
      ele.currentTarget.classList.toggle("change");
      this._opened = !this._opened;
  }


}
