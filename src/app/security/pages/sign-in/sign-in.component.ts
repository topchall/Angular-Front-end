import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public hide:boolean = true;
  signInForm: FormGroup;
  constructor(public builder: FormBuilder,
              public authService: AuthService,
              public router: Router,
              public nav: NavbarComponent) {
    this.signInForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get email() { return this.signInForm.controls['email'];}
  get password() { return this.signInForm.controls['password'];}

  signIn(){
    this.authService.signIn(this.signInForm.value).subscribe((response: any)=>{
      this.authService.setToken(JSON.stringify(response.accessToken));
      this.authService.setCurrentUser(JSON.stringify(response.user));
      this.signInForm.reset();
      console.log(`accessToken: ${this.authService.getToken()}`);
      // back to home
      this.router.navigate(['home']).then();
    })
  }
  cancelSignIn() {
    console.log('Cancelled');
    this.router.navigate(['home']).then();
    this.nav.hide=false;
  }

  ngOnInit(): void {
  }

}
