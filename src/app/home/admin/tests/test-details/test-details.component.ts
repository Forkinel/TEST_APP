import { Component, Input, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { DebugHelper } from 'protractor/built/debugger';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-test-details',
    styleUrls: ['./test-details.component.css'],
    templateUrl: './test-details.component.html'
})

export class TestDetailsComponent {

    @Input() TestID: number;
    detailsModel: TestDetailsModel;
    dataLoaded: Promise<boolean>;
    standards : StandardModel[];
    bottleTypes: BottleTypeModel[];
    selectedBottleType : number;
    selectedStandards :number[] = [];
    @Output() parentEvent = new EventEmitter();

    constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService, ) {

    }

    ngOnInit(): void {        
        this.GetAllStandards();
        this.GetAllBottleTypes();
        
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.TestID.previousValue != changes.TestID.currentValue) {
            this.TestID = changes.TestID.currentValue;
            this.GetTestDetails(this.TestID);            
        }

    }

    parentEvent_CloseDetails() {
        this.parentEvent.emit('');
    }

    GetTestDetails(testID) {

        var bodyObj = {
            "ID": testID
        };

        this.http.post<rtnObject>(this.userService.BaseURI + '/Tests/GetTestDetails', bodyObj).subscribe(rtnData => {
  
            if (rtnData.success) {

                this.detailsModel = rtnData.data;
                      
                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
       });
    
    }
    
    GetAllStandards() {
    
        this.http.get<rtnObject>(this.userService.BaseURI + '/Standards/GetAllStandards').subscribe(rtnData => {
  
            if (rtnData.success) {
          
                this.standards = rtnData.data;
                
                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
       });
    
    }

        
    GetAllBottleTypes() {
    
        this.http.get<rtnObject>(this.userService.BaseURI + '/Tests/GetAllBottleTypes').subscribe(rtnData => {
  
            if (rtnData.success) {
          
                this.bottleTypes = rtnData.data;
                
                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
       });
    
    }

    Save(data) {               

        console.log(this.detailsModel);
        
        this.http.post<rtnObject>(this.userService.BaseURI + '/Tests/SaveTestDetails', this.detailsModel).subscribe(rtnData => {

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

export interface TestDetailsModel {
    ID: number;
    TestName: string;  
    BottleType: number | null;
    Qty:number;
    Turnaround:number;
    Standards : number[];
    IsActive: boolean;
    IsUKASAccredited : boolean
  }

  export interface StandardModel
  {

    ID: number;
    StandardName: string;    
    IsActive: boolean;

  }


  
  export interface BottleTypeModel
  {

    ID: number;
    Description: string;    
    IsActive: boolean;

  }
// // put in a generic area so all areas can use this object 
export interface rtnObject {

    success: boolean;
    responseText: string;
    data: any;
}