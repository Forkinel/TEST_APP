import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userClaims: any;

  constructor(private fb:FormBuilder, private http: HttpClient) {}

  readonly BaseURI = 'http://localhost:50623/api';

    formModel = this.fb.group({
      UserName : ['', Validators.required],
      Email : ['', Validators.email],
      FullName : [''],
      Passwords : this.fb.group({    
        Password : ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword : ['', Validators.required]
      },{validator : this.comparePasswords})
    });
 
    comparePasswords(fb:FormGroup){

      let confirmPasswordCtrl = fb.get('ConfirmPassword');
      // password mismatch
      if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors)
      {

          if( fb.get('Password').value != confirmPasswordCtrl.value){
            confirmPasswordCtrl.setErrors({passwordMismatch: true});
          }
          else
          {
            confirmPasswordCtrl.setErrors(null);
          }

      }

    }

    register(){
      var body = {
        UserName : this.formModel.value.UserName,
        Email : this.formModel.value.Email,
        FullName : this.formModel.value.FullName,
        Password : this.formModel.value.Passwords.Password,
      };

      return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);

    }

    login(formData)
    {
      return this.http.post<any>(this.BaseURI + '/ApplicationUser/Login', formData)
                .pipe(map(resp => {
                  this.userClaims = JSON.parse(window.atob(resp.token.split('.')[1]))
                  localStorage.setItem('token', resp.token);
                  return this.userClaims;
                }));
    }

    // just return the users ID
    getCurrentUserID() 
    {
     
      var UserIDObj = {
        ID :''
      }

     debugger;  
      if(localStorage.getItem('token') != null)
      {
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));              

        UserIDObj.ID =  payLoad.UserID;
        return UserIDObj
      }
      else
      {
        return UserIDObj;
      }     
      
    }


    async getCurrentUserDetails(): Promise<any>
     {
      debugger;
      if(localStorage.getItem('token') != null)
      {

        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));              

        var UserModel = {
          ID :payLoad.UserID
        }

       const response = await this.http.post<UserDetailsModel>(this.BaseURI + '/Users/GetUserDetailsObj', UserModel).toPromise();
     
       return response;

     }
     else
     {
      return null;
     }

    }


    async getUserCompanies(){
     
      var UserDetailsObj = await this.getCurrentUserDetails();
      debugger;
      return UserDetailsObj;
      
    }

    getUserProfile()
    {
      return this.http.get(this.BaseURI + '/UserProfile');
    }

    roleMatch(allowedRoles): boolean{
      var isMatch = false;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;
      allowedRoles.forEach(element => {
        if(userRole == element)
        {
          isMatch = true;
          return false;
        }
      });
      return isMatch;
    }

}
export interface rtnObject {

  success: boolean;
  responseText: string;
  data: any;
}


export interface UserDetailsModel
{
    ID  : string;      
    UserName : string;
    FullName : string;
    Email    : string;
    Password : string;
    Roles : string[];
    Companies :[number];
    IsActive :boolean;
}
