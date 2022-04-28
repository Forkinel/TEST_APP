import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }


  ngOnInit() {
    this.service.formModel.reset();
  }

 
  OnSubmit(){
    this.service.register().subscribe(
      (res: any)=>{

      if(res.succeeded){
       // debugger;
        this.service.formModel.reset();
        this.toastr.success('New User created', 'Registration Successful');
      }
      else{
        res.errors.forEach(element => {
          switch (element.code)
          {
              case 'DuplicateUserName':
                this.toastr.error('name already taken', 'Registration Failed');                                
              break;

              default:
                this.toastr.error(element.description, 'Registration Failed');
              break;

          }
        });
      }

      },
      err=>{
        console.log(err);
      }
      )

  }


}
