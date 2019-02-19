import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Login } from "../shared/login";
import { UserService } from "../services/user.service";
import { User } from "../shared/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    login: Login;
    user: User;
    loginForm: FormGroup;
    @ViewChild('lform') bookingFormDirective;
    errMess: string;
    loginfailed: boolean = false;

    constructor(public dialogRef: MatDialogRef<LoginComponent>,
            private fb: FormBuilder, 
            private route: ActivatedRoute,
            private userService: UserService,
            @Inject('BaseURL') private BaseURL) {
        this.createForm();
    }
    
    ngOnInit(): void {
    }

    formErrors = {
            'username': '',
            'password': ''
          };
        
          validationMessages = { 
            'username': {
              'required':      'User Name is required.',
            },
            'password': {
              'required':      'Password is required.',
            }
          };
        
        createForm() : void{
            this.loginForm = this.fb.group({
                username: ['', [Validators.required] ],
                password: ['', [Validators.required] ],
               });
            this.login = this.loginForm.value;
            
            this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
            this.onValueChanged(); // (re)set validation messages now
          }

    onSubmit() {
      this.login = this.loginForm.value;
      this.userService.getUserByUsername(this.login.username).subscribe(user => {
          this.user = user;
          if(this.user && this.user.username === this.login.username && this.user.password === this.login.password){
              this.dialogRef.close();
          }else{
              this.loginfailed = true;
          }
      }, errmess => this.errMess = <any>errmess);
    }
    
    onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        const form = this.loginForm;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      }

}
