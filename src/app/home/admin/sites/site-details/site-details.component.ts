import { Component, Input, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { DebugHelper } from 'protractor/built/debugger';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-site-details',
    styleUrls: ['./site-details.component.css'],
    templateUrl: './site-details.component.html'
})

export class SiteDetailsComponent {

    @Input() SiteID: number;
    detailsModel: SiteDetailsModel[];
    dataLoaded: Promise<boolean>;
    companies: CompanyModel[];
    selectedCompanies :number[] = [];
    kits: KitModel[]; 
    selectedKits: number[] = [];
    @Output() parentEvent = new EventEmitter();

    constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService, ) {

    }

    ngOnInit(): void {
      this.GetAllKits();
      this.GetAllCompanies();
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.SiteID.previousValue != changes.SiteID.currentValue) {
            this.SiteID = changes.SiteID.currentValue;
            this.GetSiteDetails(this.SiteID);
        }

    }

    parentEvent_CloseDetails() {
        this.parentEvent.emit('');
    }


    GetAllCompanies()
    {

      this.http.get<rtnObject>(this.userService.BaseURI + '/Companies/GetAllCompanies').subscribe(rtnData => {
        //debugger
        if(rtnData.success)
        {
          this.companies = rtnData.data ;                
        }
        else
        {
            this.toastr.error(rtnData.responseText, 'Error');
        }            
        
    });
  }

    GetSiteDetails(siteID) {

        var bodyObj = {
            "ID": siteID
        };

        this.http.post<rtnObject>(this.userService.BaseURI + '/Sites/GetSiteDetails', bodyObj).subscribe(rtnData => {

            if (rtnData.success) {

                this.detailsModel = rtnData.data;

                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
        });

    }

    GetAllKits (){

        this.http.get<rtnObject>(this.userService.BaseURI + '/Kits/GetAllKits').subscribe(rtnData => {
          //debugger
          if(rtnData.success)
          {
              //debugger;
            this.kits = rtnData.data;                
          }
          else
          {
              this.toastr.error(rtnData.responseText, 'Error');
          }            
          
      });
      
      }


    Save(data) {
        //alert('SAVE');
        //console.log('this.detailsModel', this.detailsModel)

         this.http.post<rtnObject>(this.userService.BaseURI + '/Sites/SaveSiteDetails', this.detailsModel).subscribe(rtnData => {

             if(!rtnData.success){                       
                this.toastr.error(rtnData.responseText, "Save Failed");                                                                                  
            }
            else
            {
                this.toastr.success('Save Successful');
                this.parentEvent_CloseDetails();
            }

         });

    }

}


export interface SiteDetailsModel
{
    ID:number;
    Companies_ID:string;
    Address1:string;
    Address2:string | null;
    Address3:string | null;
    Town :string | null;
    County :string | null;
    Postcode :string | null;
    EmailAddresses :string | null;
    IsActive :boolean;
}


export interface CompanyModel {
  ID: number;
  Name: string;  
  IsActive: boolean;
}

export interface KitModel {
ID: string;
KitName: string;  
IsActive: boolean;
}

// // put in a generic area so all areas can use this object 
export interface rtnObject {

    success: boolean;
    responseText: string;
    data: any;
}