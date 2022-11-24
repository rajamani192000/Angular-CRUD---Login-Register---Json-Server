import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:UserDashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'singup',component:RegistrationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
