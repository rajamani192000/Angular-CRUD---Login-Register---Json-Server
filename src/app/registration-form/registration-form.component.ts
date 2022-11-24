import { AuthService } from './../services/auth.service';

import { Validator } from './../utils/validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    telnumber: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isedit: any;
  submitted = false;
  actionbtn: string = 'Register';
  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<RegistrationFormComponent>
  ) {}

  ngOnInit(): void {
    this.isedit = sessionStorage.getItem('isedit');

    this.registerForm = this.formBuilder.group(
      {
        firstname: [
          '',
          [
            Validators.required,
            ,
            Validators.maxLength(15),
            Validators.pattern('^[a-zA-Z]+$'),
          ],
        ],
        lastname: [
          '',
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('^[a-zA-Z]+$'),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('^[a-zA-Z]+$'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        telnumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validator.match('password', 'confirmPassword')],
      }
    );
    if (this.editData) {
      this.actionbtn = 'Update';
      this.registerForm.controls['firstname'].setValue(this.editData.firstname);
      this.registerForm.controls['lastname'].setValue(this.editData.lastname);
      this.registerForm.controls['username'].setValue(this.editData.username);
      this.registerForm.controls['email'].setValue(this.editData.email);
      this.registerForm.controls['telnumber'].setValue(this.editData.telnumber);
      this.registerForm.controls['password'].setValue(this.editData.password);
      this.registerForm.controls['confirmPassword'].setValue(
        this.editData.confirmPassword
      );
      this.registerForm.controls['acceptTerms'].setValue(
        this.editData.acceptTerms
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  addProduct() {
    this.submitted = true;
    if (!this.editData) {
      if (this.registerForm.invalid) {
        return;
      }
      if (this.registerForm.valid) {
        this.api.postProduct(this.registerForm.value).subscribe({
          next: (res) => {
            alert('Product Added Successfully');
            this.registerForm.reset();
            this.dialogRef.close('Register');
          },
          error: () => {
            alert('Error While Adding Product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.registerForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product Update Successfully');
        this.registerForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert('Error While updating the product');
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
