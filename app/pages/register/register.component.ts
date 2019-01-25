import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { RegisterErrorComponent } from 'src/app/layouts/modals/register-error/register-error.component';
import { RegisterSuccessComponent } from 'src/app/layouts/modals/register-success/register-success.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PolicyComponent } from 'src/app/layouts/bottomSheet/policy/policy.component';
import { Upload } from 'src/app/shared/models/upload';
import {UploadsService} from '../../shared/services/uploads.service';
import {User} from 'src/app/shared/models/user'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cityOptions: string[] = ['Rabat', 'Casablanca', 'Tanger'];
  filteredCityOptions: Observable<string[]>;

  passwordHide = 'password';
  startDate = new Date(1980, 0, 1);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
    city: ['', Validators.required],
    phoneNumber: ['',  Validators.compose([ Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
    email: ['', Validators.compose([ Validators.required, Validators.email]) ],
    emailCheck: [''],
    password: ['', Validators.compose([ Validators.required, Validators.minLength(8), Validators.maxLength(20)]) ],
    policy: ['', Validators.pattern('true')]
  });
   private file 
  imagePath: string;
  imgURL = 'assets/images/avatar.png';
  public message: string;
  selectedFiles: FileList;
  currentUpload: Upload;

  loadingValue = 0;
   bufferValue = 75;

  filesCount = 0;
public f :Upload
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialog: MatDialog,
    private policySheet: MatBottomSheet,
    private uploadService: UploadsService,private upSvc: UploadsService
  ) { }

  ngOnInit() {
    this.filteredCityOptions = this.registerForm.controls.city.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.cityOptions))
    );
    this.registerForm.controls.policy.setValue(false);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = String(reader.result);
     // console.log("url"+this.imgURL)
    };
    this.file=files[0]
    //this.uploadprofilimage(files[0])
        
  }
  
uploadprofilimage(file, user:User) {// to get urlDownload 
  this.currentUpload = new Upload(file);
  //console.log("File name \n "+this.currentUpload.file.name)
  this.imgURL =this.upSvc.pushFile(this.currentUpload,user)
  console.log(" this.imgURL "+ this.imgURL)
    }
  
  submit() {

    let user = new User(
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      new Date(this.registerForm.controls.birthday.value),
      this.registerForm.controls.gender.value,
      this.registerForm.controls.city.value,
      this.registerForm.controls.phoneNumber.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.emailCheck.value
    );
    this.uploadprofilimage(this.file, user)

    LoadingService.on();
    LoadingService.update('Chargement de votre image...', 0);

    let prc = 0;
    const delayID: any = setInterval(() => {
      if (prc === 100) {
        clearInterval(delayID);
      }
      LoadingService.update('Chargement de votre image...', prc);
      prc++;
    }, 100);

    LoadingService.update('Création de votre compte...', 100);

    this.auth.signup(this.registerForm.value)
    .then(res => {
      this.openSuccessDialog();
    }, err => {
      this.openErrorDialog();
    })
    .finally(() => {
      LoadingService.off();
    });
  }

  openErrorDialog(): void {
    this.dialog.open(RegisterErrorComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(RegisterSuccessComponent, {
      width: '85%',
      panelClass: ['animated', 'bounceIn', 'faster']
    });
  }

  private _filter(value: string, options: string[]  ): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onEmailToggle() {
    if (this.registerForm.controls.emailCheck.value === true) {
      this.registerForm.controls.email.clearValidators();
    } else {
      this.registerForm.controls.email.setValidators([ Validators.required, Validators.email]);
    }
    this.registerForm.controls.email.updateValueAndValidity();
  }

  showHidePassword() {
    if (this.passwordHide === 'password') {
      this.passwordHide = 'text';
    } else {
      this.passwordHide = 'password';
    }
  }

  showPolicy() {
    this.policySheet.open(PolicyComponent);
  }
}
