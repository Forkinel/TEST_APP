import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminComponent } from './home/admin/admin.component';
import { CustomerComponent } from './home/customer/customer.component';
import { UsersComponent } from './home/admin/users/users.component';
import { UserDetailsComponent } from './home/admin/users/user-details/user-details.component';
import { CompaniesComponent } from './home/admin/companies/companies.component';
import { CompanyDetailsComponent } from './home/admin/companies/company-details/company-details.component';
import { TestDetailsComponent } from './home/admin/tests/test-details/test-details.component';
import { TestsComponent } from './home/admin/tests/tests.component';
import { StandardsComponent } from './home/admin/standards/standards.component';
import { StandardDetailsComponent } from './home/admin/standards/standard-details/standard-details.component';
import { SitesComponent } from './home/admin/sites/sites.component';
import { SiteDetailsComponent } from './home/admin/sites/site-details/site-details.component';
import { KitsComponent } from './home/admin/kits/kits.component';
import { KitDetailsComponent } from './home/admin/kits/kit-details/kit-details.component';
import { OrdersComponent } from './home/customer/orders/orders.component';
import { CreateOrderComponent } from './home/customer/orders/create-order/create-order.component';
import {ResetPwdComponent}from './user/account/reset-pwd/reset-pwd.component';
import { CalendarComponent } from './home/admin/calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children:
      [
        { path: 'registration', component: RegistrationComponent },
        { path: 'login', component: LoginComponent },              
        { path: 'reset-pwd', component: ResetPwdComponent }
      ]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children:
      [
        {
          path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] }, children:
            [
              { path: 'users', component: UsersComponent,  children:
              [
                { path: 'user-details', component: UserDetailsComponent }                
              ]},
              { path: 'companies', component: CompaniesComponent,  children:
              [
                { path: 'company-details', component: CompanyDetailsComponent }                
              ]},
              { path: 'sites', component: SitesComponent,  children:
              [
                { path: 'site-details', component: SiteDetailsComponent }                
              ]},
              { path: 'kits', component: KitsComponent,  children:
              [
                { path: 'kit-details', component: KitDetailsComponent }                
              ]},
              { path: 'tests', component: TestsComponent,  children:
              [
                { path: 'test-details', component: TestDetailsComponent }                
              ]},
              { path: 'standards', component: StandardsComponent,  children:
              [
                { path: 'standard-details', component: StandardDetailsComponent }                
              ]},
              { path: 'calendar', component: CalendarComponent} 
             
            ]
        },
        { 
          path: 'customer', component: CustomerComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Customer']},
          children:[
                    {
                        path: 'orders', component: OrdersComponent
                       
                    } 
                    ,
                    {
                      path: 'orders/create-order/:id', component: CreateOrderComponent                      
                    }               
                   ]
        }            
      ]
  },
  { path: 'forbidden', component: ForbiddenComponent }
  // ,
  // { path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
