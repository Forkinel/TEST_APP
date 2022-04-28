import { Component, Input, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { DebugHelper } from 'protractor/built/debugger';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-details',
    styleUrls: ['./user-details.component.css'],
    templateUrl: './user-details.component.html'
})

export class UserDetailsComponent {

    @Input() UserID: string;
    detailsModel: UserDetailsModel;
   // userActive: boolean = true;
    dataLoaded: Promise<boolean>;
    roles: RoleModel[];
    companies: CompaniesModel[];
    selectedRoles: string[] = [];
    selectedCompanies: number[] = [];
    passwordRequired: boolean = false;
    passwordDisabled: boolean = false;
    @Output() parentEvent = new EventEmitter();

    constructor(private http: HttpClient, private userService: UserService, private toastr: ToastrService) {

    }

    ngOnInit(): void {    

     
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.UserID.previousValue != changes.UserID.currentValue) {
            this.UserID = changes.UserID.currentValue;

            this.passwordRequired = this.UserID == "0" ? true:false;
            this.passwordDisabled = this.UserID != "0" ? true:false;

            this.GetAllRoles();
            this.GetAllCompanies();
            this.GetUserDetails(this.UserID);

        }

    }

    ResetPassword()
    {
        debugger;

        alert('call function to reset and email reset link')
        // var bodyObj = {
        //     "ID": "432f2a39-0a6a-4869-9a10-2aff22299134"
        // };

        // this.http.post<rtnObject>(this.userService.BaseURI + '/Account/ResetPassword', bodyObj).subscribe(rtnData => {

        //     if(!rtnData.success){                       
        //         this.toastr.error(rtnData.responseText, "Save Failed");                                                                                  
        //     }
        //     else
        //     {
        //         this.toastr.success('Save Successful');
        //         this.parentEvent_CloseDetails();
        //     }

        // })
    }

    parentEvent_CloseDetails(){
        this.parentEvent.emit('');
    }    

    GetAllCompanies() {

        this.http.get<rtnObject>(this.userService.BaseURI + '/Companies/GetAllCompanies').subscribe(rtnData => {
            
            if(rtnData.success)
            {
                this.companies = rtnData.data;                
            }
            else
            {
                this.toastr.error(rtnData.responseText, 'Error');
            }            
            
        });

    }   

    GetAllRoles() {

        this.http.get<rtnObject>(this.userService.BaseURI + '/Roles/GetAllRoles').subscribe(rtnData => {
            //debugger
            if(rtnData.success)
            {                
                this.roles = rtnData.data;                
            }
            else
            {
                this.toastr.error(rtnData.responseText, 'Error');
            }            
            
        });

    }   

    Save(data) {
       
        this.detailsModel.Roles = this.selectedRoles;
        this.detailsModel.Companies = this.selectedCompanies;
 
        //debugger
        this.http.post<rtnObject>(this.userService.BaseURI + '/Users/SaveUserDetails', this.detailsModel).subscribe(rtnData => {

            if(!rtnData.success){                       
                this.toastr.error(rtnData.responseText, "Save Failed");                                                                                  
            }
            else
            {
                this.toastr.success('Save Successful');
                this.parentEvent_CloseDetails();
            }

        })

    }

    GetUserDetails(userID) {

        var bodyObj = {
            "ID": userID
        };

        this.http.post<rtnObject>(this.userService.BaseURI + '/Users/GetUserDetails', bodyObj).subscribe(rtnData => {

            if(rtnData.success){      
                //debugger;                 

                if (rtnData.data.Companies == null)
                {
                    rtnData.data.Companies = [];
                }

                if (rtnData.data.Roles == null)
                {
                    rtnData.data.Roles = [];
                }

                this.detailsModel = rtnData.data;

                this.selectedRoles = rtnData.data.Roles;
                this.selectedCompanies =  rtnData.data.Companies
         
               // this.userActive = this.detailsModel.isActive;
                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data                                                                 
            }
            else
            {

                this.toastr.error(rtnData.responseText, "Save Failed");        
            }

        });

    }

}

export interface RoleModel {
    ID: number;
    roleName: string;
}


export interface CompaniesModel {
    ID: number;
    Name: string;
    IsActive: boolean;
}

export interface UserDetailsModel {

    Id: string;
    UserName: string;
    Email: string;
    Password: string;
    FullName: string;
    Roles: string[];
    Companies: number[];
    IsActive: boolean;
    IsStaff: boolean;
    AllowedToViewPricing: boolean;
    ShowAllProjects: boolean;
    

}

// put in a generic area so all areas can use this object 
export interface rtnObject{

    success: boolean;
    responseText : string;
    data : any;
}
