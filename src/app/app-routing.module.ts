import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./security/pages/sign-in/sign-in.component";
import {HomeComponent} from "./views/home/home.component";
import {SignUpComponent} from "./security/pages/sign-up/sign-up.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SignUpBusinessComponent} from "./security/pages/sign-up-business/sign-up-business.component";
import {ProfileBusinessComponent} from "./components/profile-business/profile-business.component";
import {TechniciansComponent} from "./technicians/pages/technicians/technicians.component";
import {HelpComponent} from "./public/help/help.component";
import {CasesComponent} from "./public/cases/pages/cases.component";
import {ServiceshistoryComponent} from "./public/serviceshistory/serviceshistory.component";

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: ' home', pathMatch: 'full'},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'sign-up-business', component: SignUpBusinessComponent},
  {path: 'profile-business', component: ProfileBusinessComponent},
  { path: 'technicians', component: TechniciansComponent },
  { path: 'help', component: HelpComponent },
  { path: 'cases', component: CasesComponent},
  { path: 'services-history', component: ServiceshistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
