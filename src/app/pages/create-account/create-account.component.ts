import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';
interface Account {

  FullName: string | null,
  Email: string | null,
  Phone: string | null,
  Admission: string | null,
  LeadSoure: string | null,
  AdmissionManager : string | null,

}
interface Students {

  FullName: string | null,
  Gender: string | null,
  GraduationYear: string | null,
  Birthday: string | null,
  PlaceOfBirth: string | null,
  Nationality: string | null,
  CitizenIdentificationNum: string | null,
  DateCitizenIdentification: string | null,
  PlaceCitizen: string | null,
  LinkFacebook: string | null,
  Email: string | null,
  PhoneNumberSponsor1: string | null,
  NameSponsor1: string | null,
  PhoneNumberSponsor2: string | null,
  NameSponsor2: string | null,
  EmailSponsor1: string | null,
  EmailSponsor2: string | null,

}
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})


export class CreateAccountComponent implements OnInit {
  isDisplayInfo = false;
  dataOptions = ["Online", "Direct", "Database", "Referal", "Internals", "Online Mass", "Cộng Hưởng", "Khác"];
  // accountForm = this.fb.group({
  //   phoneNumber: '',
  //   name: '',
  //   dataOrigin: '',
  //   email: '',
  //   password: ''
  // })
  


  ngOptionsSourceinfor = ["Online", "Direct", "Database", "Referral", "Internals", "Online Mass", "Cộng Hưởng", "Khác"];
  ngDropdownSourceinfo = "Online";
  public aElement?: boolean = true;
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private api: AdmissionService,
    private router: Router,
    private localStorageSv: LocalStoreService,
    private notifyService: NotifyService) {
   
    this.aElement = true;
    // router.events.subscribe((val) => {
      
    //   // if (val instanceof NavigationEnd) {
    //   //   console.log(val.url);
    //   // }

    //   this.activateDiv(this.router.url);
    // });
  }

  onclick() {
    this.aElement = !this.aElement;
    
   
  }

  CreateNewAccount(data: any) {
    this.notifyService.confirmAdd('Bạn có chắc chắn muốn tạo tài khoản này?').then((result) => {
      if (result) {


        const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
    console.log(decodedToken.ID);
        
    
    this.account = {
      FullName: data.FullName,
      Email: data.Email,
      Phone: data.Phone,
      Admission: decodedToken.Infor.Id,
      AdmissionManager: decodedToken.Infor.AdmissionManager,
      LeadSoure: data.Sourceinfor,
    }

    console.log(decodedToken);
    console.log(this.account);





      // if(this.loginForm.invalid){
      //     return false;
      // } 
      // truyen du lieu vao form
      // console.log(data.phone, data.password);
      // this.router.navigateByUrl('/students');

      // return true;
      // console.log(
      //  this.resetPasswordForm.value);
      // if (this.resetPasswordForm.value.oldPassword != oldPw) {

      //   alert("Mật khẩu cũ không đúng");
      //   return false;
      // }
      // else if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
      //   alert("Mật khẩu mới không trùng khớp");
      //   return false;
      // }
      // else {
      
      this.api.createNewAccount(this.account
      ).subscribe((res: any) => {
        
        // var d = JSON.parse(res); //doi tu json sang object
        
        this.notifyService.notifyCreateAccountSuccess(res.account);
        this.accountForm.reset();

        // const helper = new JwtHelperService();
      
        // const decoedToken = helper.decodeToken(d.account);
        
        
        // alert("Tạo tài khoản thành công. Đã gửi Email cho sinh viên");
        
        // // this.router.navigateByUrl('/students/profilestudent');
        // this.router.navigateByUrl('/admissions');
      },
  
        error => {
            console.log("Error", error);
            this.notifyService.errorMessage(error.error.message);
            // this.router.navigateByUrl('/admissions/registeraccount');
        }
  
      );



       

      } else {

        console.log('Delete cancelled.');
      }
    });

    //get password from localstorage

    
    
   
  }
  ngOnInit() {
    
   
  }

  accountForm = new FormGroup({
    Phone: new FormControl(''),
    FullName: new FormControl(''),
    Name: new FormControl(''),
    Sourceinfor: new FormControl(''),
    Email: new FormControl(''),
    Addmission: new FormControl(''),
    Password: new FormControl(''),
  }
  )

  account: Account = {
    FullName: null,
    Email: null,
    Phone: null,
    Admission: null,
    LeadSoure: null,
    AdmissionManager: null,
  };

  student: Students = {
    FullName: null,
    Gender: null,
    Birthday: null,
    PlaceOfBirth: null,
    Nationality: null,
    CitizenIdentificationNum: null,
    DateCitizenIdentification: null,
    PlaceCitizen: null,
    GraduationYear: null,
    LinkFacebook: null,
    Email: null,
    PhoneNumberSponsor1: null,
    NameSponsor1: null,
    PhoneNumberSponsor2: null,
    NameSponsor2: null,
    EmailSponsor1: null,
    EmailSponsor2: null,
  };
  
  // ngAfterViewInit(): void {
  //   this.aElement = this.child.aElementNewAccount
    
  // }
  

  activateDiv(url: string) {
    if (url == '/admissions/registeraccount') {
      this.aElement = true;
    }
    this.aElement = false;
  }

  // Reload parent component when needed
  reloadParent() {
    this.ngOnInit();
  }
}
