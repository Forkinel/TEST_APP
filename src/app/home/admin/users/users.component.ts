import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from "@angular/material";
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from '../../../core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['userName', 'fullName', 'email', 'role', 'isActive', 'actionButtons'];
  selectedUserID: string = '';

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<UserSmallModel>();

  constructor(private loaderService: LoaderService, private userService: UserService, private http: HttpClient) { }

  dataItemsCount: number = 0;

  ngOnInit() {

   this.GetAllUsers();

  }

public GetAllUsers (){
  this.http.get<UserSmallModel>(this.userService.BaseURI + '/Users/GetAllUsers').subscribe(data => {

    this.dataSource.data = data as unknown as UserSmallModel[];
    this.dataItemsCount = this.dataSource.data.length;

   // debugger;

  });

}

// called when a user in saved in the user-details component
  parentEvent_CloseDetails(msg){
 
    this.GetAllUsers();
    this.CloseDetails();

  }

  public CloseDetails() {
    this.selectedUserID = '';
    this.displayedColumns = ['userName', 'fullName', 'email', 'role', 'isActive', 'actionButtons'];

  }

  public addNewUser() {
    this.selectedUserID = '0';
    this.displayedColumns = ['userName', 'fullName', 'actionButtons'];

  }

  public GetUserDetails(id) {
    this.selectedUserID = id;
    this.displayedColumns = ['userName', 'fullName', 'actionButtons'];
  }

  public doFilter = (value: string) => {

    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


}

export interface UserSmallModel {
  ID: string;
  userName: string;
  email: string
  fullName: string
  roles: string[]
  isActive: boolean
}