import { Component, Input, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { DebugHelper } from 'protractor/built/debugger';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-company-details',
    styleUrls: ['./company-details.component.css'],
    templateUrl: './company-details.component.html'
})

export class CompanyDetailsComponent {

    @Input() CompanyID: number;
    detailsModel: CompanyDetailsModel;
    dataLoaded: Promise<boolean>;
    @Output() parentEvent = new EventEmitter();
    showAddressList: boolean = false;
    isNewAddress : boolean = false;
     tests: TestModel[]; 
     selectedTests: number[] = [];
    // kits: KitModel[]; 
    // selectedKits: number[] = [];
    selectedAddressData: AddressDetailsClass;
    
    constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService, ) {

    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.CompanyID.previousValue != changes.CompanyID.currentValue) {
            this.CompanyID = changes.CompanyID.currentValue;
            this.GetAllTests();
           // this.GetAllKits();
            this.GetCompanyDetails(this.CompanyID);
            
        }

    }

    parentEvent_CloseDetails() {
        this.parentEvent.emit('');
    }

    GetCompanyDetails(companyID) {

        var bodyObj = {
            "ID": companyID
        };
debugger;
        this.http.post<rtnObject>(this.userService.BaseURI + '/Companies/GetCompanyDetails', bodyObj).subscribe(rtnData => {
  
            if (rtnData.success) {

                 if (rtnData.data.Addresses == null)
                 {
                     rtnData.data.Addresses = [];
                 }

                 if (rtnData.data.Tests == null)
                 {
                     rtnData.data.Tests = [];
                 }

                // if (rtnData.data.Kits == null)
                // {
                //     rtnData.data.Kits = [];
                // }

                this.detailsModel = rtnData.data as unknown as CompanyDetailsModel;
                this.selectedTests =  rtnData.data.Tests;      
                // this.selectedKits =   rtnData.data.Kits;      
                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
        });
    
    }

    public GetAllTests (){

        this.http.get<rtnObject>(this.userService.BaseURI + '/Tests/GetAllTests').subscribe(rtnData => {
          //debugger
          if(rtnData.success)
          {
              //debugger;
            this.tests = rtnData.data;                
          }
          else
          {
              this.toastr.error(rtnData.responseText, 'Error');
          }            
          
      });
      
      }

    //   public GetAllKits (){

    //     this.http.get<rtnObject>(this.userService.BaseURI + '/Kits/GetAllKits').subscribe(rtnData => {
    //       //debugger
    //       if(rtnData.success)
    //       {
    //           //debugger;
    //         this.kits = rtnData.data;                
    //       }
    //       else
    //       {
    //           this.toastr.error(rtnData.responseText, 'Error');
    //       }            
          
    //   });
      
    //   }


    // adds newly created address into the company model data with an ID of 0
    public AddToAddressesModel(){
       
        this.detailsModel.Addresses.push(this.selectedAddressData);
        this.selectedAddressData =  new AddressDetailsClass();
        this.showAddressList = false;
       
    }

    // edits the selected address model ready to be saved
    public EditAddress(index){
        this.showAddressList = true;
        this.selectedAddressData = <AddressDetailsClass>this.detailsModel.Addresses[index];
        this.isNewAddress = false;
    }

    // unused at the moment
    // public DeleteAddress(index){

    // }

    // shows the add new address section
    public ShowAddNewAddress(){        
        this.showAddressList = true;
        this.selectedAddressData =  new AddressDetailsClass();
        this.isNewAddress = true;
    }

    // closes the add new address section and resets selectedAddressData
    public CloseAddAddress(){

        this.showAddressList = false;
        this.selectedAddressData =  new AddressDetailsClass();
    }    

    Save(data) {       
        alert('SAVE');
        debugger;
        // this.detailsModel.Tests = this.selectedTests;
        // this.detailsModel.Kits = this.selectedKits;
         this.http.post<rtnObject>(this.userService.BaseURI + '/Companies/SaveCompanyDetails', this.detailsModel).subscribe(rtnData => {

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

export interface CompanyDetailsModel {

    ID: number;
    Name: string;
    IsActive: boolean;
    EmailAddresses: string;
    Addresses: [AddressDetails];
    // Tests: number[];
    // Kits: number[];

}
// used for initialising of the interface
export class AddressDetailsClass implements AddressDetails {
    ID: number = 0;
    Address_1: string = '';
    Address_2: string = '';
    Address_3: string = '';
    Town: string = '';
    County: string = '';
    PostCode: string = '';
    PhoneNo: string = '';
    Default: boolean = false;
    IsActive: boolean = false;
    constructor(){}
  }

export interface AddressDetails {

    ID: number;
    Address_1: string;
    Address_2: string;
    Address_3: string;
    Town: string;
    County: string;
    PostCode: string;
    PhoneNo: string;
    Default: boolean;
    IsActive: boolean;
}


export interface TestModel {
    ID: string;
    TestName: string;  
    IsActive: boolean;
  }

//   export interface KitModel {
//     ID: string;
//     KitName: string;  
//     IsActive: boolean;
//   }



// // put in a generic area so all areas can use this object 
export interface rtnObject {

    success: boolean;
    responseText: string;
    data: any;
}