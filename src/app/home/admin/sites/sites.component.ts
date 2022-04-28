import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from "@angular/material";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../core';
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['SiteName', 'CompanyName', 'IsActive', 'actionButtons'];
  selectedSiteID: number = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<SiteModel>();

  constructor(private loaderService: LoaderService,  private userService: UserService, private http: HttpClient,private toastr: ToastrService) { }

  dataItemsCount: number = 0;

  ngOnInit() {

   this.GetAllSites();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public GetAllSites (){

    this.http.get<rtnObject>(this.userService.BaseURI + '/Sites/GetAllSites').subscribe(rtnData => {
      //debugger
      if(rtnData.success)
      {
        this.dataSource.data = rtnData.data as unknown as SiteModel[];                
      }
      else
      {
          this.toastr.error(rtnData.responseText, 'Error');
      }            
      
  });

  }

// called when a user in saved in the user-details component
  parentEvent_CloseDetails(msg){ 
    this.GetAllSites();
    this.CloseDetails();
  }

  public CloseDetails() {
    this.selectedSiteID = null;
    this.displayedColumns =  ['SiteName','CompanyName','IsActive', 'actionButtons'];
  }

  public AddNewSite() {
    this.selectedSiteID = 0;
    this.displayedColumns =  ['SiteName', 'actionButtons'];
  }

  public GetSiteDetails(id) {
    this.selectedSiteID = id;
    this.displayedColumns = ['SiteName', 'actionButtons'];
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }



}

// put in a generic area so all areas can use this object 
export interface rtnObject{

  success: boolean;
  responseText : string;
  data : any;
}

export interface SiteModel {
  ID: number;
  SiteName: string;  
  IsActive: boolean;
}