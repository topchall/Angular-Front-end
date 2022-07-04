import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../security/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  public getFirstName(){
    this.authService.getValidatedData('firstName');
  }
  public getLastName(){
    this.authService.getValidatedData('lastName');
  }
  public getEmail(){
    this.authService.getValidatedData('email');
  }
  public getBrand(){
    this.authService.getValidatedData('brand');
  }
  public getArea(){
    this.authService.getValidatedData('area');
  }
  public getGender(){
    this.authService.getValidatedData('gender');
  }
  public getPhone(){
    this.authService.getValidatedData('phone');
  }
  public showCompleteName(){
    return `${this.getFirstName()}  ${this.getLastName()}`;
  }
}
