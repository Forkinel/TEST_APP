import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { format } from 'url';
import { FormGroup, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  Password: string;
  ConfirmPassword: string;
  userId: string;
  token: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private userService: UserService, private router: Router, private toastr: ToastrService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
      debugger;

    });


  }

  ngOnInit() {

    this.http.get<rtnObject>(this.userService.BaseURI + '/Account/ConfirmPasswordResetEmail?userId=' + this.userId + '&token=' + this.token).subscribe(rtnData => {

      if (!rtnData.success) {
        this.router.navigateByUrl('/user/login');
        this.toastr.error(rtnData.responseText, "Error");

      }
      //else {
       // this.toastr.success('Before you can change your password, please click the confirmation email you have now been sent');
      //}

    })


  }


  onClickSubmit(data) 
  {

debugger;

    // if (this.ConfirmPassword != this.Password) 
    // {
    //   this.toastr.success('Passwords do not match');
    // }
    // else 
    // {
    //   alert('Save new password')
    // }

  }


}


export interface rtnObject {

  success: boolean;
  responseText: string;
  data: any;
}

