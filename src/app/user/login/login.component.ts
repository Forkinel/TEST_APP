import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isActiveUser: string;
  emailConfirmed: string;
  
  formModel =
  {
    UserName: '',
    Password: '',
  }

  confirmLink : string;

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }

  }

  ForgotPassword(){

    if(this.formModel.UserName != '')
    {

      debugger;

      //routerLink="../../user/forgotpwd"

       var bodyObj = {
           "ID": this.formModel.UserName
       };

      this.http.post<rtnObject>(this.userService.BaseURI + '/Account/ForgotPassword', bodyObj).subscribe(rtnData => {
        debugger;
        if(!rtnData.success){                       
            this.toastr.error(rtnData.responseText, "Error");                                                                                  
        }
        else
        {
          this.confirmLink = rtnData.data;
          this.toastr.success('Before you can change your password, please click the confirmation email you have now been sent');            
        }

      })

    }
    else
    {
      this.toastr.error("Please enter your Username");
    }

  }

  onSubmit(form: NgForm) {

    this.userService.login(form.value).subscribe(

      (userClaims: any) => {

        this.isActiveUser = userClaims.IsActive;
        this.emailConfirmed = userClaims.EmailConfirmed;

        if (this.emailConfirmed == "False") {
          this.toastr.error("Email has not been confirmed please check your email for an email confirmation request.", "Email Confirmation")      
        }
        else  
        if (this.isActiveUser == "False") {
          this.toastr.error("Account Deactivated", "Account Deactivated ")    
        }
        else {          
          this.router.navigateByUrl('/home');
        }

      },
      err => {

        if (err.status == 400) {
          this.toastr.error("Incorrect username or password", "Authentication Failed ")
        }
        else {
          console.log(err);
        }

      }

    )

  }

}


// put in a generic area so all areas can use this object 
export interface rtnObject{

  success: boolean;
  responseText : string;
  data : any;
}
