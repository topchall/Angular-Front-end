import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../security/services/auth.service";

@Component({
  selector: 'app-profile-business',
  templateUrl: './profile-business.component.html',
  styleUrls: ['./profile-business.component.css']
})
export class ProfileBusinessComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  public getName(){
    this.authService.getValidatedData('name');
  }
  public getSubscription(){
    this.authService.getValidatedData('subscription');
  }
  public getEmail(){
    this.authService.getValidatedData('email');
  }
}
