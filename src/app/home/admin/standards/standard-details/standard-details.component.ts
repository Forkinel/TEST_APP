import { Component, Input, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { DebugHelper } from 'protractor/built/debugger';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-standard-details',
    styleUrls: ['./standard-details.component.css'],
    templateUrl: './standard-details.component.html'
})

export class StandardDetailsComponent {

    @Input() StandardID: number;
    detailsModel: StandardDetailsModel;
    dataLoaded: Promise<boolean>;
    @Output() parentEvent = new EventEmitter();
    uom: StandardUnitOfMeasurementModel;
    uSymbol: StandardSymbolModel;
    lSymbol: StandardSymbolModel;


    constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService, ) {

    }

    ngOnInit(): void {
        this.GetAllSymbols();
        this.GetAllUnitsOfMeasurement();

    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.StandardID.previousValue != changes.StandardID.currentValue) {
            this.StandardID = changes.StandardID.currentValue;
            this.GetStandardDetails(this.StandardID);
        }

    }

    parentEvent_CloseDetails() {
        this.parentEvent.emit('');
    }


    GetAllSymbols() {

        this.http.get<rtnObject>(this.userService.BaseURI + '/Standards/GetAllSymbols').subscribe(rtnData => {
            if (rtnData.success) {

                this.uSymbol = rtnData.data;
                this.lSymbol = rtnData.data;
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
        });


    }
    GetAllUnitsOfMeasurement() {

        this.http.get<rtnObject>(this.userService.BaseURI + '/Standards/GetAllUnitsOfMeasurement').subscribe(rtnData => {
            if (rtnData.success) {
                this.uom = rtnData.data;
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
        });
    }

    GetStandardDetails(standardID) {

        var bodyObj = {
            "ID": standardID
        };

        this.http.post<rtnObject>(this.userService.BaseURI + '/Standards/GetStandardDetails', bodyObj).subscribe(rtnData => {

            if (rtnData.success) {

               // debugger;

                if(rtnData.data.UnitsOfMeasurement_ID == 0)
                {
                    rtnData.data.UnitsOfMeasurement_ID = '';
                }

                if(rtnData.data.LowerLimit_Symbols_ID == 0)
                {
                    rtnData.data.LowerLimit_Symbols_ID = ''
                }

                if(rtnData.data.UpperLimit_Symbols_ID == 0)
                {
                    rtnData.data.UpperLimit_Symbols_ID = '';
                }

                this.detailsModel = rtnData.data;

                this.dataLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
            }
            else {
                this.toastr.error(rtnData.responseText, 'Error');
            }
        });

    }

    Save(data) {
        alert('SAVE');
        console.log('this.detailsModel', this.detailsModel)

         this.http.post<rtnObject>(this.userService.BaseURI + '/Standards/SaveStandardDetails', this.detailsModel).subscribe(rtnData => {

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

export interface StandardDetailsModel {
    ID: number;
    StandardName: string;
    UnitsOfMeasurement_ID: number | null;
    TextLimit: string;
    UpperLimitValue: number;
    UpperLimit_Symbols_ID: number | null;
    LowerLimitValue: number;
    LowerLimit_Symbols_ID: number | null;
    IsActive: boolean;
}

export interface StandardSymbolModel {
    ID: number;
    Symbol: string;
    SymbolMeaning: string;

}

export interface StandardUnitOfMeasurementModel {
    ID: number;
    UOM: string;
}

// // put in a generic area so all areas can use this object 
export interface rtnObject {

    success: boolean;
    responseText: string;
    data: any;
}