import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { DoctorsComponent } from './kapdoc/doctors/doctors.component';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { MatButtonModule } from '@angular/material';
import { MainpageComponent } from './kapdoc/mainpage/mainpage.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { Role } from './_models';
import { SearchpageComponent } from './search/searchpage/searchpage.component';
import { MylogincomponentComponent } from './mylogincomponent/mylogincomponent.component';
import { FunpageComponent } from './funpage/funpage.component';
import { MysearchComponent } from './mysearch/mysearch.component';


const routes: Routes = [
  {path: 'mysearch', component: MysearchComponent,
},
  {path: 'funpage', component: FunpageComponent},
  {path: 'doctors', component: DoctorsComponent},
  {path: 'contacts', component: ContactListComponent},
  {path: 'main', component: MainpageComponent},
  {path: 'search', component: SearchpageComponent},
  //{path: '', component: WelcomeComponent, pathMatch: 'full'},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
},

{
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
},
{
    path: 'login',
    component: LoginComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: '*',
  component: HomeComponent
},

];
@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"}) , MatButtonModule],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
export const routingComponents = [DoctorsComponent,ContactListComponent,MainpageComponent,WelcomeComponent,SearchpageComponent,MysearchComponent]
