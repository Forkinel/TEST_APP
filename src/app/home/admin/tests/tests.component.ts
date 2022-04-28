import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from "@angular/material";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../core';
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['TestName','IsActive','IsUKASAccredited','actionButtons'];
  selectedTestID: number = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<TestModel>();

  constructor(private loaderService: LoaderService,  private userService: UserService, private http: HttpClient,private toastr: ToastrService) { }

  dataItemsCount: number = 0;

  ngOnInit() {

   this.GetAllTests();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public GetAllTests (){

    this.http.get<rtnObject>(this.userService.BaseURI + '/Tests/GetAllTests').subscribe(rtnData => {
      //debugger
      if(rtnData.success)
      {
        this.dataSource.data = rtnData.data as unknown as TestModel[];                
      }
      else
      {
          this.toastr.error(rtnData.responseText, 'Error');
      }            
      
  });

  }

// called when a user in saved in the user-details component
  parentEvent_CloseDetails(msg){ 
    this.GetAllTests();
    this.CloseDetails();
  }

  public CloseDetails() {
    this.selectedTestID = null;
    this.displayedColumns =  ['TestName','IsActive','IsUKASAccredited', 'actionButtons'];
  }

  public AddNewTest() {
    this.selectedTestID = 0;
    this.displayedColumns =  ['TestName', 'actionButtons'];
  }

  public GetTestDetails(id) {
    this.selectedTestID = id;
    this.displayedColumns = ['TestName', 'actionButtons'];
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

export interface TestModel {
  ID: number;
  TestName: string;  
  IsActive: boolean;
  IsUKASAccredited: boolean;
  
}