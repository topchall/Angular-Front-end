import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-business',
  templateUrl: './sign-up-business.component.html',
  styleUrls: ['./sign-up-business.component.css']
})
export class SignUpBusinessComponent implements OnInit {
  public hide: boolean = true;
  signUpFormB: FormGroup;
  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.signUpFormB = this.builder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      subscription: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [0, [Validators.required, Validators.maxLength(9)]],
      creditCard: ['', [Validators.required]],
      creditCardCVV: ['', [Validators.required]]
    });
  }
  get email() { return this.signUpFormB.controls['email'];}
  get password() { return this.signUpFormB.controls['password'];}
  get name() {return this.signUpFormB.controls['name'];}
  get address() {return this.signUpFormB.controls['address'];}
  get phone() {return this.signUpFormB.controls['phone'];}
  get creditCard() {return this.signUpFormB.controls['creditCard'];}
  get creditCardCVV() {return this.signUpFormB.controls['creditCardCVV'];}
  get subscription() {return this.signUpFormB.controls['subscription'];}

  signUp(){
    this.authService.signUpB(this.signUpFormB.value).subscribe((response: any)=>{
      this.authService.setCurrentUser(JSON.stringify(response.user));
      this.signUpFormB.reset();
      this.router.navigate(['sign-in']).then();
    })
  }
  cancelSignUp() {
    console.log('Cancelled');
    this.router.navigate(['home']).then();
  }
  ngOnInit(): void {
  }

}
