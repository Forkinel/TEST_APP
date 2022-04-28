import { Component, Input, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { DebugHelper } from 'protractor/built/debugger';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-kit-details',
    styleUrls: ['./kit-details.component.css'],
    templateUrl: './kit-details.component.html'
})

export class KitDetailsComponent {

    @Input() KitID: number;
    detailsModel: KitDetails;
    dataLoaded: Promise<boolean>;
    @Output() parentEvent = new EventEmitter();
    selectedKitTestData: KitTestDetailsClass;
    IsEdit: boolean = false;
    tests: TestModel[]; 
    selectedTests: number[] = [];

    constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService, ) {

    }

    ngOnInit(): void {
        this.GetAllTests();
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.KitID.previousValue != changes.KitID.currentValue) {
            this.KitID = changes.KitID.currentValue;
            //this.IsEdit = false;
            this.selectedKitTestData = new KitTestDetailsClass();                        
            this.GetKitDetails(this.KitID);         
            
        }

    }

    drop(event: CdkDragDrop<KitTestDetails[]>) {
        moveItemInArray(this.detailsModel.KitTests, event.previousIndex, event.currentIndex);
     
      }

    parentEvent_CloseDetails() {
        this.parentEvent.emit('');
    }

    AddKitTest() {
        this.IsEdit = false;
        this.selectedKitTestData.Kits_ID = this.KitID;         
        this.detailsModel.KitTests.push(this.selectedKitTestData);        
        this.selectedKitTestData =  new KitTestDetailsClass();        
    }

    EditKitTest(index) {
        this.IsEdit = true;
        this.selectedKitTestData = <KitTestDetailsClass>this.detailsModel.KitTests[index];
        this.detailsModel.KitTests.splice(index,1);

    }

    RemoveKitTest(index) {
        this.detailsModel.KitTests.splice(index,1);
        alert(index);
    }

    GetAllTests() {

        this.http.get<rtnObject>(this.userService.BaseURI + '/Tests/GetAllTests').subscribe(rtnData => {
            //debugger
            if (rtnData.success) {
                //debugger;
                this.tests = rtnData.data;
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }

        }); 
    }

    GetKitDetails(kitID) {

        var bodyObj = {
            "ID": kitID
        };

        this.http.post<rtnObject>(this.userService.BaseURI + '/Kits/GetKitDetails', bodyObj).subscribe(rtnData => {

            if (rtnData.success) {

                if(rtnData.data.EmailAddresses == null )   
                {
                    rtnData.data.EmailAddresses = "";
                }

                if (rtnData.data.KitTests == null)
                {
                    rtnData.data.KitTests = [];
                }

                this.detailsModel = rtnData.data;
                console.log('this.detailsModel', this.detailsModel);

                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
        });

    }

    Save(data) {
        debugger;

        this.http.post<rtnObject>(this.userService.BaseURI + '/Kits/SaveKitDetails', this.detailsModel).subscribe(rtnData => {

            if(!rtnData.success)
            {                       
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

export class KitTestDetailsClass implements KitTestDetails {
    ID = 0;
    TestName = '';
    Tests_ID = 0;
    Kits_ID = 0;
    Qty = 0;
    Sequence = 0;
    constructor() { }
}


export interface KitDetails {
    ID: number;
    KitName: string;
    EmailAddresses: string;
    IsWeekly: boolean;
    IsActive: boolean;
    KitTests: [KitTestDetails];
}

export interface KitTestDetails {
    ID: number;
    TestName: string;
    Tests_ID: number;
    Kits_ID: number;
    Qty: number;
    Sequence: number;
}


export interface TestModel {
    ID: string;
    TestName: string;  
    IsActive: boolean;
  }


// // put in a generic area so all areas can use this object 
export interface rtnObject {

    success: boolean;
    responseText: string;
    data: any;
}