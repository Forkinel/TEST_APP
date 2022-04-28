import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from 'ng-sidebar';
import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';

import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
  import { AdminComponent } from './home/admin/admin.component';
  import { CustomerComponent } from './home/customer/customer.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UsersComponent } from './home/admin/users/users.component';
import { UserDetailsComponent } from './home/admin/users/user-details/user-details.component';
import { CompaniesComponent } from './home/admin/companies/companies.component';
import { CompanyDetailsComponent } from './home/admin/companies/company-details/company-details.component';
import { TestsComponent } from './home/admin/tests/tests.component';
import { TestDetailsComponent } from './home/admin/tests/test-details/test-details.component';
import { StandardsComponent } from './home/admin/standards/standards.component';
import { StandardDetailsComponent } from './home/admin/standards/standard-details/standard-details.component';
import { SitesComponent } from './home/admin/sites/sites.component';
import { SiteDetailsComponent } from './home/admin/sites/site-details/site-details.component';
import { KitsComponent } from './home/admin/kits/kits.component';
import { KitDetailsComponent } from './home/admin/kits/kit-details/kit-details.component';
import { OrdersComponent } from './home/customer/orders/orders.component';
import { CreateOrderComponent } from './home/customer/orders/create-order/create-order.component';
import { CompanySelectComponent } from './shared/modals/company-select/company-select.component';
import { ResetPwdComponent } from './user/account/reset-pwd/reset-pwd.component';
import { CoreModule } from './core';
import { CalendarComponent } from './home/admin/calendar/calendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
      AdminComponent,
      CustomerComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    UsersComponent,
    UserDetailsComponent,
    CompaniesComponent,
    CompanyDetailsComponent,
    TestsComponent,
    TestDetailsComponent,
    StandardsComponent,
    StandardDetailsComponent,
    SitesComponent,
    SiteDetailsComponent,
    KitsComponent,
    KitDetailsComponent,
    OrdersComponent,
      CreateOrderComponent,
    CompanySelectComponent,
    ResetPwdComponent,
    CalendarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    SidebarModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgSelectModule,
    NgbModalModule,
    DragDropModule,
    CoreModule,NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
    
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  entryComponents: [CompanySelectComponent]
})
export class AppModule { }
