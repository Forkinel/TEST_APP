import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { inherits } from 'util';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { LoaderService } from '../../../../core';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  companyID: any;
  orderObject: OrderObject;
  sites: SiteModel[];
  selectedSites: number[] = [];
  selectedSiteOrderModels:SiteModel[] = [];

  tests: TestModel[];
  selectedTests: [] = [];
  selectedTestOrderModels:TestOrderModel[] = [];

  kits: KitModel[];
  selectedKits: [] = [];
  selectedKitOrderModels:KitOrderModel[] = [];
  constructor(private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private location: Location, private _formBuilder: FormBuilder, private userService: UserService, private http: HttpClient, private toastr: ToastrService) { }

  isLinear = false;
  firstFormGroup: FormGroup; //site
  secondFormGroup: FormGroup; // tests
  thirdFormGroup: FormGroup; // kits
  orderObj: OrderObjectClass;
  stepperIndex = 0;

  ngOnInit() {

    this.orderObj = new OrderObjectClass();
 
    this.companyID = +this.activatedRoute.snapshot.paramMap.get('id');

    this.GetCompanySites(this.companyID);
    this.GetCompanyTests(this.companyID);
    //this.GetSiteKits(this.companyID);

  }

  public GetCompanySites(id) {

    var bodyObj = {
      "ID": id
    };

    debugger;

    this.http.post<rtnObject>(this.userService.BaseURI + '/Companies/GetCompanyDetails', bodyObj).subscribe(rtnData => {
      //debugger
      if (rtnData.success) {
        debugger;
        this.sites = rtnData.data.Sites;
      }
      else {
        this.toastr.error(rtnData.responseText, 'Error');
      }

    });

  }

  public GetCompanyTests(id) {

    var bodyObj = {
      "ID": id
    };

    debugger;

    this.http.post<rtnObject>(this.userService.BaseURI + '/Tests/GetCompanyTests', bodyObj).subscribe(rtnData => {
      //debugger
      if (rtnData.success) {
        debugger;
        this.tests = rtnData.data;
      }
      else {
        this.toastr.error(rtnData.responseText, 'Error');
      }

    });

  }

  public GetSiteKits(id) {

    var bodyObj = {
      "ID": id
    };

    //debugger;

    this.http.post<rtnObject>(this.userService.BaseURI + '/sites/GetSiteKits', bodyObj).subscribe(rtnData => {
      //debugger
      if (rtnData.success) {
        debugger;
        this.kits = rtnData.data;
      }
      else {
        this.toastr.error(rtnData.responseText, 'Error');
      }

    });

  }

  AddSite(eventObj){
    
    let newSiteObj = new SiteModelClass();
    newSiteObj.ID = eventObj.ID;
    newSiteObj.SiteName = eventObj.SiteName;  

    this.selectedSiteOrderModels.push(newSiteObj);
    this.orderObj.Sites = this.selectedSiteOrderModels;

  }

  RemoveSite(eventObj){
 
    this.orderObj.Sites = this.orderObj.Sites.filter(function (e) {
      return e.ID !== eventObj.value.ID;
    });

  }

  ClearSites(eventObj){
    this.selectedSiteOrderModels = [];
    this.orderObj.Sites = [];
    
    this.kits = [];
    this.selectedKits = [];
    this.selectedKitOrderModels = [];
    this.orderObj.Kits = [];
  }

  AddTest(eventObj){
    
    let newTestObj = new TestOrderModelClass();
    newTestObj.ID = eventObj.ID;
    newTestObj.TestName = eventObj.TestName;
    newTestObj.Qty = 1;

    this.selectedTestOrderModels.push(newTestObj);
    this.orderObj.Tests = this.selectedTestOrderModels;

  }

  RemoveTest(eventObj){
 
    this.orderObj.Tests = this.orderObj.Tests.filter(function (e) {
      return e.ID !== eventObj.value.ID;
    });

  }

  ClearTests(eventObj){
    this.selectedTestOrderModels = [];
    this.orderObj.Tests = [];
  }

  AddKit(eventObj){
    
    let newKitObj = new KitOrderModelClass();
    newKitObj.ID = eventObj.ID;
    newKitObj.KitName = eventObj.KitName;
    newKitObj.Qty = 1;

     this.selectedKitOrderModels.push(newKitObj);
     this.orderObj.Kits = this.selectedKitOrderModels;

  }

  RemoveKit(eventObj){
 
     this.orderObj.Kits = this.orderObj.Kits.filter(function (e) {
       return e.ID !== eventObj.value.ID;
     });

  }

  ClearKits(eventObj){
    this.selectedKitOrderModels = [];
    this.orderObj.Kits = [];

  }

  CreateOrder(){

    alert('create order');

    debugger;

     this.http.post<rtnObject>(this.userService.BaseURI + '/Orders/SaveOrderDetails', this.orderObj).subscribe(rtnData => {

         if(!rtnData.success){                       
            this.toastr.error(rtnData.responseText, "Order Failed");                                                                                  
        }
        else
        {
            this.toastr.success('Order Created');
           
        }

     });

  }
  
  Reset(){
  
    this.orderObj = new OrderObjectClass();
    this.selectedSites = [];
    this.selectedTests = [];
    this.selectedKits = [];
  }
 
  goBack()
  {
    this.location.back();
  }

}

export class SiteModelClass implements SiteModel {
  ID = 0;
  SiteName = "";
 
}

export interface SiteModel {
  ID: number;
  SiteName: string;
}


export interface KitModel {
  ID: string;
  KitName: string;
  IsActive: boolean;
}


export class KitOrderModelClass implements KitOrderModel {
  ID = 0;
  KitName = "";
  Qty = 1;
}


export interface KitOrderModel {
  ID: number;
  KitName: string;
  Qty: number;
}



export interface TestModel {
  ID: string;
  TestName: string;
  IsActive: boolean;
}

export class TestOrderModelClass implements TestOrderModel {
  ID = 0;
  TestName = "";
  Qty = 1;
}


export interface TestOrderModel {
  ID: number;
  TestName: string;
  Qty: number;
}

export class OrderObjectClass implements OrderObject{ 
  Sites = [];
  Tests = [];
  Kits = [];

  constructor(){};
}

export interface OrderObject
{
  Sites:number[];
  Tests:TestOrderModel[];
  Kits:KitOrderModel[];
}


// // put in a generic area so all areas can use this object 
export interface rtnObject {

  success: boolean;
  responseText: string;
  data: any;
}
